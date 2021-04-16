import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import {MdClose as IconClose} from 'react-icons/md';
import {FaGithub as IconGithub} from 'react-icons/fa';
import {MdContentCopy as IconCopy} from 'react-icons/md';

import I18n from '../i18n';
import Utils from '../Utils';
import MonacoEditor from '../Components/ScriptEditorVanilaMonaco';
import Markdown from '../Markdown';
import SplitterLayout from 'react-splitter-layout';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    copyButton: {
        marginLeft: 30,
        display: 'inline-block'
    },
    copyButtonChanged: {
        background: '#ff8177',
    },
    githubButton: {
        marginLeft: 30,
        display: 'inline-block'
    },
    closeButton: {
        float: 'right',
        marginRight: 5,
    },
    editor: {
        width: '100%',
        height: 'calc(100% - 37px)',
    },
    doc: {
        width: '100%',
        height: '100%',
    },
    buttonTab: {
        display: 'block',
        borderBottom: '1px solid #DDDDDD',
    }
});

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuSize: window.localStorage ? parseFloat(window.localStorage.getItem('Docs.editorSize')) || 50 : 50,
            resizing: false,
            changed: false,
            tooltip: '',
            code: this.props.code || '',
            showInstructions: false,
            noInstructions: window.localStorage ? window.localStorage.getItem('Docs.noInstructions') === 'true' : false,
        };

        this.menuSize = this.state.menuSize;

        if (!this.state.code && this.props.path) {
            this.load();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.path !== this.props.path) {
            this.load(nextProps.path);
        }
    }

    load(path) {
        path = (path || this.props.path).replace(/\/edit\/master\/|\/edit\/engine\//, '/master/').replace('github.com', 'raw.githubusercontent.com');
        if (path) {
            fetch(path)
                .then(res => res.text())
                .then(text => {
                    const {header, body} = Utils.extractHeader(text || '');
                    const d = new Date();
                    if (header.editLink && header.editLink.indexOf('iobroker.docs') !== -1) {
                        header.lastChanged = `${d.getFullYear()}.${Utils.padding(d.getMonth() + 1)}.${Utils.padding(d.getDate())}`;
                    }
                    this.setState({code: Utils.addHeader(body, header)});
                });
        }
    }

    openGithub(e) {
        // https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/README.md
        // https://raw.githubusercontent.com/ioBroker/ioBroker.docs/engine/docs/de/README.md
        Utils.onCopy(e, this.state.text);
        window.open(this.props.path, 'github');
        this.setState({tooltip: I18n.t('Copied')});
    }

    renderInstructions() {
        if (!this.state.showInstructions) {
            return;
        }

        return <Dialog
            key="instructions"
            open={true}
            onClose={() => this.setState({showInstructions: false})}
        >
            <DialogTitle id="alert-dialog-title">{I18n.t('How to use it...')}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {I18n.t('The text is copied to clipboard and you can paste it yourself into edit field and make a pull request')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <FormControlLabel
                    control={<Checkbox checked={this.state.noInstructions} onChange={() => {
                        window.localStorage && window.localStorage.setItem('Docs.noInstructions', 'true');
                        this.setState({noInstructions: true});
                    }}/>}
                    label={I18n.t("Don't show anymore")}
                />
                <Button onClick={() => {
                    this.setState({showInstructions: false});
                    this.openGithub();
                }} color="primary" autoFocus>{I18n.t('Ok')}</Button>
            </DialogActions>
        </Dialog>;
    }

    renderEditor() {
        return <div className={this.props.classes.editor}>
            <div className={this.props.classes.buttonTab}>
                <Button
                    className={this.props.classes.copyButton + ' ' + (this.state.changed ? this.props.classes.copyButtonChanged : '')}
                    onClick={e => {
                        Utils.onCopy(e, this.state.text);
                        this.setState({tooltip: I18n.t('Copied')})
                    }}>
                    <IconCopy/>{I18n.t('Copy to clipboard')}
                </Button>
                <Button
                    className={this.props.classes.githubButton}
                    onClick={e =>
                        this.state.noInstructions ? this.openGithub(e) : this.setState({showInstructions: true}, () => console.log(this.state.showInstructions))}>
                    <IconGithub/>{I18n.t('Go to github')}
                </Button>
                <Button
                    color="primary"
                    className={this.props.classes.closeButton}
                    onClick={e => this.props.onClose()}>
                    <IconClose/>{I18n.t('Close')}
                </Button>
            </div>

            {this.state.code ? <MonacoEditor
                onChange={text => this.setState({text, changed: text !== this.state.code})}
                theme={this.props.theme}
                readOnly={false}
                code={this.state.code || ''}
            /> : <CircularProgress className={this.props.classes.progress} />}

            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={!!this.state.tooltip}
                autoHideDuration={6000}
                onClose={() => this.setState({tooltip: ''})}
                message={<span id="message-id">{this.state.tooltip}</span>}
                action={[
                    <IconButton
                        key="close"
                        color="inherit"
                        className={this.props.classes.close}
                        onClick={() => this.setState({tooltip: ''})}
                    >
                        <IconClose />
                    </IconButton>,
                ]}
            />
        </div>;
    }

    renderDoc() {
        if (!this.state.code) {
            return <CircularProgress className={this.props.classes.progress} />;
        }
        return <div className={this.props.classes.doc}>
            <Markdown
                mobile={this.props.mobile}
                language={this.props.language}
                text={this.state.text || ' '}
                theme={this.props.theme}
                path={this.props.path}
            />
        </div>;
    }

    render() {
        return [
            <SplitterLayout
                key="splitterLayout"
                vertical={false}
                primaryMinSize={10}
                primaryIndex={1}
                percentage={true}
                secondaryInitialSize={this.state.menuSize}
                onDragStart={() => this.setState({resizing: true})}
                onSecondaryPaneSizeChange={size => this.menuSize = parseFloat(size)}
                customClassName={this.props.classes.splitterDivs}
                onDragEnd={() => {
                    window.localStorage && window.localStorage.setItem('Docs.editorSize', this.menuSize.toString());
                    this.setState({resizing: false, menuSize: this.menuSize});
                }}
            >
                {this.renderEditor()}
                {this.renderDoc()}
            </SplitterLayout>,
            this.renderInstructions()
        ];
    }
}

Editor.propTypes = {
    language: PropTypes.string,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    path: PropTypes.string,
    onClose: PropTypes.func,
    editLink: PropTypes.string,
};

export default withStyles(styles)(Editor);