import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typed from 'react-typed';
import IconButton from '@material-ui/core/IconButton';

import {MdContentCopy as IconCopy} from 'react-icons/md';
import Utils from '../Utils';

const styles = theme => ({
    linuxShell: {
        width: 380,
        height: 150,
        borderRadius: 5,
        fontFamily: 'Terminal Dosis, Monospace',
        marginLeft: 20,
        position: 'absolute',
        bottom: 30,
        left: 20,
        background: '#000000D0',
        color: '#FFFFFF',
        overflow: 'hidden'
    },
    linuxShellHeader: {
        fontSize: 16,
        zIndex: 1,
        width: 'calc(100% - 15px)',
        background: '#959595',
        fontWeight: 'bold',
        padding: '2px 5px 2px 10px',
        color: '#000000'
    },
    linuxShellHeaderTitle: {
        marginLeft: 10,
        lineHeight: '20px',
        verticalAlign: 'top'
    },
    linuxShellHeaderButton: {
        borderRadius: 50,
        width: 12,
        height: 12,
        display: 'inline-block',
        marginRight: 5,
        cursor: 'pointer',
        zIndex: 1,
    },
    linuxShellHeaderButtonClose: {
        background: '#b20404',
        boxShadow: '0 0 3px #FF0000',
    },
    linuxShellHeaderButtonHide: {
        background: '#bb5e00',
        boxShadow: '0 0 3px #FF8000',
    },
    linuxShellHeaderButtonFull: {
        background: '#00bd00',
        boxShadow: '0 0 3px #00FF00',
    },
    linuxShellWindowCopy: {
        position: 'absolute',
        top: 20,
        right: -9,
        color: '#FFFFFF',
        opacity: 0.1,
        cursor: 'pointer',
        zIndex: 1,
    },
    linuxShellHeaderWindowCopyDone:{
        opacity: 1,
        transition: 'opacity 1s'
    },
    linuxShellWindow: {
        fontSize: 14,
        padding: 10,
        color: '#169900',
        textShadow: '0 0 3px #00b606',
        '&:after': {
            content: '""',
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)'
        }
    },
});

class LinusShell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animationDone: false,
            linuxSize: window.localStorage ? window.localStorage.getItem('Docs.linuxSize') || 'normal' : 'normal',
            text: [this.props.typedText]
        };
    }

    onLinuxSize(newState) {
        window.localStorage && window.localStorage.setItem('Docs.linuxSize', newState);
        this.setState({linuxSize: newState});
    }

    render() {
        let styles = {
            linuxShell: {},
            linuxShellHeader: {},
            linuxShellHeaderTitle: {},
            linuxShellWindow: {},
        };

        if (this.state.linuxSize === 'full') {
            styles = {
                linuxShell: {width: 'calc(100% - 60px)', height: 'calc(100% - 40px)'},
                linuxShellHeader: {},
                linuxShellHeaderTitle: {},
                linuxShellWindow: {},
            };
        } else if (this.state.linuxSize === 'small') {
            styles = {
                linuxShell: {width: 68, height: 24},
                linuxShellHeader: {},
                linuxShellHeaderTitle: {display: 'none'},
                linuxShellWindow: {display: 'none'},
            };
        }


        return (<div className={this.props.classes.linuxShell} style={styles.linuxShell}>
            <div className={this.props.classes.linuxShellHeader} style={styles.linuxShellHeader}>
                <div className={this.props.classes.linuxShellHeaderButton + ' ' + this.props.classes.linuxShellHeaderButtonClose}
                     onClick={() => this.onLinuxSize('small')}
                />
                <div className={this.props.classes.linuxShellHeaderButton + ' ' + this.props.classes.linuxShellHeaderButtonHide}
                     onClick={() => this.onLinuxSize('normal')}
                />
                <div className={this.props.classes.linuxShellHeaderButton + ' ' + this.props.classes.linuxShellHeaderButtonFull}
                     onClick={() => this.onLinuxSize('full')}
                />
                <span className={this.props.classes.linuxShellHeaderTitle} style={styles.linuxShellHeaderTitle}>{this.props.header || 'shell'}</span>
            </div>
            <div className={this.props.classes.linuxShellWindow} style={styles.linuxShellWindow}>
                pi@raspberry:~#&nbsp;
                <Typed
                    strings={this.state.text}
                    typeSpeed={40}
                    onComplete={() => setTimeout(() => this.setState({animationDone: true, text: [this.props.typedText]}), 500)}
                />
                <IconButton
                    className={this.props.classes.linuxShellWindowCopy + ' ' + (this.state.animationDone ? this.props.classes.linuxShellHeaderWindowCopyDone : '')}
                    title={this.props.copyTitle || 'copy to clipboard'}
                    onClick={e => {
                        Utils.onCopy(e, this.props.typedText);
                        this.setState({text: ['', this.props.copiedText || 'copied to clipboard']});
                    }}><IconCopy/></IconButton>
            </div>
        </div>);
    }
}

LinusShell.propTypes = {
    header: PropTypes.string,
    copyTitle: PropTypes.string,
    typedText: PropTypes.string,
    copiedText: PropTypes.string,
};

export default withStyles(styles)(LinusShell);