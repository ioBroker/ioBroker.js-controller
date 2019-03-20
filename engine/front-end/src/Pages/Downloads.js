import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import Router from "../Router";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import Loader from "./Blog";
import I18n from '../i18n';

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
        minHeight: '100%'
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
        paddingTop: 64
    },
    cardLine: {
        display: 'flex',
        marginBottom: 3
    },
    cardLineName: {
        fontWeight: 'bold',
        flex: 1,
    },
    cardLineValue: {

    }
});

const IGONRED_ATTRS = ['file', 'date', 'linux', 'picture', 'device', 'info', 'details'];
class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            loadTimeout: false,
            filter: 'all'
        };
        this.load();
        // Give 300ms to load the page. After that show the loading indicator.
        setTimeout(() => !this.state.content && this.setState({loadTimeout: true}), 300);

        this.contentRef = React.createRef();
    }

    load() {
        const d = new Date();

        fetch(`http://iobroker.live/images/list.js?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}`)
            .then(res => res.text())
            .then(content => {
                const lines = content.split('\n');
                lines[0] = '[';
                lines[lines.length - 1] = ']';
                lines.forEach((line, i) => {
                    const m = line.match(/(\w+):\s?['"]+[^'"]*['"]+,?/);
                    if (m) {
                        lines[i] = line.replace(m[1], '"' + m[1] + '"');
                    }
                });
                content = lines.join('\n').replace(/'/g, '"').replace();

                try {
                    content = JSON.parse(content);
                    this.setState({content});
                } catch (e) {
                    console.error('Cannot parse: ' + e);
                    console.error('Cannot parse: ' + content);
                }
            });
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
        return (<div className={this.props.classes.cardLine}>
            <span  className={this.props.classes.cardLineName}>{I18n.t(name)}:</span>
            <span  className={this.props.classes.cardLineValue}>{value}</span>
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
        return (<div>{lines.map(line => [line, (<br/>)])}</div>);
    }

    renderImage(image) {
        if (this.state.filter && this.state.filter !== 'all' && this.state.filter !== image.device) return null;

        return (<Card key={image.file} className={this.props.classes.card} style={{width: this.cardWidth}}>
            <CardActionArea>
                <div className={this.props.classes.cardMedia}
                     style={{backgroundImage: 'url(http://iobroker.live/images/img/' + image.picture + ')'}}
                />
                <div  className={this.props.classes.cardTitle}>
                    <h2>{image.device}</h2>
                </div>
                <CardContent className={this.props.classes.cardContent}>
                    <h2>&nbsp;</h2>
                    <div className={this.props.classes.cardInfo}>
                        <p>
                            {this.renderLine('Date', this.formatDate(image.date))}
                            {this.renderLine('Linux', image.linux)}

                            {Object.keys(image)
                                .filter(attr => IGONRED_ATTRS.indexOf(attr) === -1)
                                .map(attr => {
                                    if (image[attr].match(/^https?:/)) {
                                        this.renderLine(attr, (<a href={image[attr]} target="_blank">I18n.t('link')</a>));
                                    } else {
                                        this.renderLine(attr, image[attr]);
                                    }
                                })}

                            {image.details && this.renderLine('Details', this.formatDetails(image.details))}
                        </p>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => this.openLink(image.file)}>{I18n.t('Download')}</Button>
                {image.info && (<Button size="small" color="primary" onClick={() => this.openLink(image.info)}>{I18n.t('Info')}</Button>)}
            </CardActions>
        </Card>);
    }

    openLink(url, target) {
        if (target === 'this') {
            window.location = url;
        } else {
            window.open(url, target || '_blank');
        }
    }

    renderSelector() {
        if (!this.state.content) return;
        const types = [];
        this.state.content.forEach(item => types.indexOf(item.device) === -1 && types.push(item.device));

        return (<FormControl className={this.props.classes.formControl}>
            <Select
                value={this.state.filter}
                onChange={e => this.setState({filter: e.target.value})}
                input={<Input name="type" id="type-helper" />}
            >
                <MenuItem value="all"><em>{I18n.t('All')}</em></MenuItem>
                {types.map(type => (<MenuItem value={type}>{type}</MenuItem>))}
            </Select>
            <FormHelperText>{I18n.t('Platform')}</FormHelperText>
        </FormControl>)
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return (<Loader theme={this.props.theme}/>);
        }

        return [
            this.renderSelector(),
            (<div className={this.props.classes.root}>
                {this.state.content && this.state.content.map(image => this.renderImage(image))}
            </div>),
            (<Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/>),
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
