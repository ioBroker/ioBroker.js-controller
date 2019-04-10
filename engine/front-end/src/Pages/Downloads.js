import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import Select from '@material-ui/core/Select';
import Loader from '../Components/Loader';
import I18n from '../i18n';
import Footer from '../Footer';
import Utils from '../Utils';
import {MdContentCopy as IconCopy} from 'react-icons/md';
import {MdClose as IconClose} from 'react-icons/md';

const MARGIN = 10;
const styles = theme => ({
    content: theme.content,
    formControl: {
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 5,
        minWidth: 100,
    },
    root: {
        width: 'calc(100% - 20px)',
        margin: 'auto',
        minHeight: '100%',
    },
    rootMobile: {
        textAlign: 'center',
    },
    card: {
        margin: MARGIN,
        minWidth: 220,
        maxWidth: 350,
        //minHeight: 300,
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cardMedia: {
        height: 64,
        width: 128,
        marginTop: 40,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 0,
        borderRadius: 3
    },
    cardTitle: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 16,
        zIndex: 1,
        whiteSpace: 'nowrap'
    },
    cardContent: {
        zIndex: 1,
        paddingTop: 64,
        textAlign: 'left',
    },
    cardLine: {
        display: 'flex',
        marginBottom: 3
    },
    cardLineName: {
        fontWeight: 'bold',
        flex: 1,
    },
    cardLineValue: {},
    instructionDiv: {
        width: 'calc(100% - 80px)',
        marginLeft: 20,
        marginRight: 20,
        maxWidth: 750,
        marginBottom: 10,
        marginTop: 5,
        minWidth: 100,
        padding: 20,
        overflow: 'hidden',
        '&:before': {
            content: '"⚠"',
            color: '#ff5a5a',
            fontSize: 24,
            paddingRight: 10,
            //borderRadius: '50%',
            //background: '#008aff',
        }
    },
    instructionCode: {
        position: 'relative',
        background: '#999999',
        padding: 5,
        borderRadius: 3,
        color: '#FFFFFF'
    },
    instructionCopy: {
        position: 'absolute',
        top: -4,
        right: -9,
        color: '#FFFFFF',
        opacity: 0.8,
        cursor: 'pointer',
        zIndex: 1,
    },
});

const IGONRED_ATTRS = ['file', 'date', 'linux', 'picture', 'device', 'info', 'details'];
class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            loadTimeout: false,
            filter: 'all',
            tooltip: '',
        };
        this.load();
        // Give 300ms to load the page. After that show the loading indicator.
        setTimeout(() => !this.state.content && this.setState({loadTimeout: true}), 300);

        this.contentRef = React.createRef();
    }

    load() {
        const d = new Date();

        fetch(`downloads.json?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}`)
            .then(res => res.json())
            .then(content => this.setState({content}));
    }

    /* {
        file: 'ioBroker_Image_OdroidC2_20190209_stretch.zip',
        linux: 'Armbian Stretch',
        date: '20190128',
        device: 'Odroid C2',
        details: 'ioBroker minimal Image<br><ul><li>nodejs 8.15.0</li><li>npm 6.4.1</li></ul>',
        picture: 'c2_img.png',
        user: 'pi',
        password: 'raspberry',
        info: 'http://www.iobroker.net/docu/?page_id=8955&lang=de'
    }*/
    renderLine(name, value) {
        return (<div key={name} className={this.props.classes.cardLine}>
            <span className={this.props.classes.cardLineName}>{I18n.t(name)}:</span>
            <span className={this.props.classes.cardLineValue}>{value}</span>
        </div>);
    }

    formatDate(date) {
        return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
    }

    formatDetails(details) {
        const lines = details.split(/<br\/?>|<\/li>/);
        lines.forEach((line, i) =>
            lines[i] = line
                .replace(/<\/?\w+>/g, '')
                .replace(/^ioBroker/, '')
        );
        return (<div>{lines.map(line => [line, (<br key="br"/>)])}</div>);
    }

    renderImage(image) {
        if (this.state.filter && this.state.filter !== 'all' && this.state.filter !== image.device) return null;

        return (<Card key={image.file} className={this.props.classes.card} style={{width: this.cardWidth}}>
            <CardActionArea>
                <div className={this.props.classes.cardMedia}
                     style={{backgroundImage: 'url(img/' + image.picture + ')'}}
                />
                <div  className={this.props.classes.cardTitle}>
                    <h2>{image.device}</h2>
                </div>
                <CardContent className={this.props.classes.cardContent}>
                    <h2>&nbsp;</h2>
                    <div className={this.props.classes.cardInfo}>
                        <div>
                            {this.renderLine('Date', this.formatDate(image.date))}
                            {image.linux === 'Windows' ? this.renderLine('OS', image.linux) : this.renderLine('Linux', image.linux)}

                            {Object.keys(image)
                                .filter(attr => IGONRED_ATTRS.indexOf(attr) === -1)
                                .map(attr => {
                                    if (image[attr].match(/^https?:/)) {
                                        return this.renderLine(attr, (<a href={image[attr]} target="_blank" rel="noopener noreferrer">I18n.t('link')</a>));
                                    } else {
                                        return this.renderLine(attr, image[attr]);
                                    }
                                })}

                            {image.details && this.renderLine('Details', this.formatDetails(image.details))}
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => Utils.openLink('http://iobroker.live/images/' + image.file)}>{I18n.t('Download')}</Button>
                {image.info && (<Button size="small" color="primary" onClick={() => Utils.openLink(image.info)}>{I18n.t('Info')}</Button>)}
            </CardActions>
        </Card>);
    }

    renderSnackbar() {
        return (<Snackbar
            key="snackbar"
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
        />)
    }

    renderInfoAboutInstall() {
        return (
            <Paper key="instruction" className={this.props.classes.instructionDiv}>
                {I18n.t('instruction1')}<br/>
                {I18n.t('instruction2')}<br/><br/>
                <b>1. </b>{I18n.t('instruction3')}
                <pre className={this.props.classes.instructionCode}>
                    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -<br/>
                    sudo apt-get install -y nodejs<br/>
                    <IconButton
                        className={this.props.classes.instructionCopy}
                        title={I18n.t( 'copy to clipboard')}
                        onClick={e => {
                            Utils.onCopy(e, 'curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -\nsudo apt-get install -y nodejs');
                            this.setState({tooltip: I18n.t('Copied')});
                        }}><IconCopy fontSize="small"/></IconButton>
                </pre>
                <b>2. </b>{I18n.t('instruction4')}
                <pre className={this.props.classes.instructionCode}>
                    curl -sL https://iobroker.net/install.sh | bash -<br/>
                    <IconButton
                        className={this.props.classes.instructionCopy}
                        title={I18n.t( 'copy to clipboard')}
                        onClick={e => {
                            Utils.onCopy(e, 'curl -sL https://iobroker.net/install.sh | bash -');
                            this.setState({tooltip: I18n.t('Copied')});
                        }}><IconCopy fontSize="small"/></IconButton>
                </pre>
            </Paper>
        )
    }

    renderSelector() {
        if (!this.state.content) return;
        const types = [];
        this.state.content.forEach(item => types.indexOf(item.device) === -1 && types.push(item.device));

        return (<FormControl key="selector" className={this.props.classes.formControl}>
            <Select
                value={this.state.filter}
                onChange={e => this.setState({filter: e.target.value})}
                input={<Input name="type" id="type-helper" />}
            >
                <MenuItem value="all"><em>{I18n.t('All')}</em></MenuItem>
                {types.map(type => (<MenuItem key={type} value={type}>{type}</MenuItem>))}
            </Select>
            <FormHelperText>{I18n.t('Platform')}</FormHelperText>
        </FormControl>)
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return (<Loader theme={this.props.theme}/>);
        }

        return [
            this.renderInfoAboutInstall(),
            this.renderSelector(),
            (<div key="table" className={this.props.classes.root + ' ' + (this.props.mobile ? this.props.classes.rootMobile : '')}>
                {this.state.content && this.state.content.map(image => this.renderImage(image))}
            </div>),
            (<Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/>),
            this.renderSnackbar(),
        ];
    }
}

Downloads.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Downloads);
