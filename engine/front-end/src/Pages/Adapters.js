import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import {MdExpandMore as IconExpandMore} from 'react-icons/md';

import Loader from '../Components/Loader';
import I18n from '../i18n';
import Utils from "../Utils";

const MARGIN = 10;

const styles = theme => ({
    root: {
        margin: 10,
    },
    card: {
        margin: MARGIN,
        minWidth: 220,
        maxWidth: 350,
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'left',
    },
    cardMedia: {
        height: 64,
        width: 64,
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
        zIndex: 1
    },
    titleExpanded: {
        fontWeight: 'bold',
        borderBottom: '1px solid #DDD'
    },
    details: {
        display: 'inline-block',
    },
    pageHeader: {
        marginLeft: 20,
    },
    pageTitle: {
        fontSize: 32,
    },
    pageTitleNew: {
        float: 'right',
        fontSize: 14,
        paddingRight: 10,
    },
    pageTitleTotal: {
        float: 'right',
        fontSize: 14,
        //paddingRight: 10,
        padding: '6px 8px',
        textTransform: 'uppercase',
        marginTop: 2,
    },
    cardValue: {

    },
    cardInfo: {
        borderTop: '1px solid #EEE',
        paddingTop: 10,
    },
    cardName: {
        fontWeight: 'bold',
        paddingRight: 5,
        width: 100
    },
    cardFilter: {
        marginLeft: 10,
    },
    cardVersionName: {
        background: 'gray',
        borderRadius: '3px 0 0 3px',
        padding: '1px 3px 1px 3px',
        color: 'white'
    },
    cardVersionValue: {
        background: 'green',
        borderRadius: '0 3px 3px 0',
        padding: '1px 3px 1px 3px',
        color: 'white'
    }
});

function fetchLocal(url) {
    return new Promise((resolve, reject) => {
        const oReq = new XMLHttpRequest();
        oReq.onload = function () {resolve(this.responseText);};
        oReq.open('get', url, true);
        oReq.addEventListener('error', function (e) {reject(e)}, false);
        oReq.send();
    });
}

let adaptersLastScroll = 0;
let adapterStatistics = null;
let adapterList = null;

class Adapters extends Component {
    constructor(props) {
        super(props);

        let expanded = window.localStorage ? window.localStorage.getItem('Docs.aexpanded') : '[]';
        try {
            expanded = JSON.parse(expanded) || [];
        } catch (e) {
            expanded = [];
        }

        let filter = window.localStorage ? window.localStorage.getItem('Docs.afilter') || '' : '';

        // load page
        this.state = {
            content: '',
            expanded,
            showNew: false,
            filter,
            fastFilter: filter,
            total: '-',
            newMonth: window.localStorage ? window.localStorage.getItem('Docs.anew') === 'true' : false,
            loadTimeout: false,
            statistics: {}
        };

        this.load();

        // Give 300ms to load the page. After that show the loading indicator.
        setTimeout(() => !this.state.content && this.setState({loadTimeout: true}), 300);

        this.contentRef = React.createRef();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.language !== nextProps.language) {
            this.load(null, nextProps.language);
        }
    }

    getCounters(content) {
        const result = {total: 0, newMonth: 0};
        this.forMonth = new Date();
        this.forMonth.setDate(this.forMonth.getDate() - 30);

        Object.keys(content.pages).forEach(type => {
            if (content.pages[type].pages) {
                Object.keys(content.pages[type].pages).forEach(adapter => {
                    const obj = content.pages[type].pages[adapter];
                    result.total++;
                    if (typeof obj.published !== 'object') {
                        obj.published = new Date(obj.published);
                    }
                    if (obj.published && this.forMonth < obj.published) {
                        result.newMonth++;
                    }
                    if (typeof obj.authors !== 'object') {
                        obj.authors = (obj.authors || '').split(',').map(item => {
                            const m = item.match(/([^<]*)<([^>]+)>/);
                            if (m) {
                                return {name: m[1].trim(), email: (m[2] || '').trim()};
                            } else {
                                return {name: item.trim(), email: ''};
                            }
                        });

                        obj.keywords = obj.keywords || '';
                        obj.keywords += obj.title;
                        obj.keywords = obj.keywords.toLowerCase();
                    }
                });
            }
        });
        return result;
    }

    load(path, language) {
        const d = new Date();
        adapterList = adapterList || fetch(`adapters.json?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`).then(res => res.json());
        adapterStatistics = adapterStatistics || fetchLocal(`http://iobroker.live/statistics.json?$t={d.getFullYear()}_${d.getMonth()}_${d.getDate()}`).then(data => JSON.parse(data));
        Promise.all([adapterList, adapterStatistics])
            .then(results => {
                const stats = this.getCounters(results[0]);

                this.setState({
                    content: results[0],
                    loadTimeout: false,
                    statistics: results[1],
                    total: stats.total,
                    newMonth: stats.newMonth
                });

                if (adaptersLastScroll) {
                    setTimeout(() => {
                        this.props.scrollPosition(adaptersLastScroll);
                        adaptersLastScroll = 0;
                    }, 100);
                }
            });
    }

    onNavigate(link) {
        adaptersLastScroll = this.props.scrollPosition();
        this.props.onNavigate(null, null, link);
    }

    renderAdapter(type, adapter, obj) {
        this.words = this.words || {};
        this.words.authors = this.words.authors || I18n.t('Authors:');
        this.words.stable = this.words.stable || I18n.t('Stable:');
        this.words.installs = this.words.installs || I18n.t('Installs:');
        this.words.read = this.words.read || I18n.t('Read');
        this.words.github = this.words.github || I18n.t('Github');

        return (<Card key={adapter} className={this.props.classes.card} style={{width: this.cardWidth}}>
            <CardActionArea onClick={() => this.onNavigate(obj.content)}>
                <div className={this.props.classes.cardMedia}
                    style={{backgroundImage: 'url(' + this.props.language + '/' + obj.icon + ')'}}
                />
                <div  className={this.props.classes.cardTitle}>
                    <h2>{adapter}</h2>
                </div>
                <CardContent className={this.props.classes.cardContent}>
                    <h2>&nbsp;</h2>
                    <p>
                        {obj.titleFull ? obj.titleFull[this.props.language] || obj.titleFull.en || obj.titleFull : obj.title[this.props.language] || obj.title.en || obj.title}
                    </p>
                    <p>
                        {obj.description ? obj.description[this.props.language] || obj.description.en : ''}
                    </p>
                    <div className={this.props.classes.cardInfo}>
                        {obj.authors ? (<div><span className={this.props.classes.cardName}>{this.words.authors}</span><span className={this.props.classes.cardValue}>{obj.authors.map(item => item.name).join(', ')}</span></div>) : null}
                        {obj.version ? (<div><span className={this.props.classes.cardName}>{this.words.stable}</span><span className={this.props.classes.cardValue}>{obj.version}</span></div>) : null}
                        {this.state.statistics.adapters[adapter] ? (<div><span className={this.props.classes.cardName}>{this.words.installs}</span><span className={this.props.classes.cardValue}>{this.state.statistics.adapters[adapter]}</span></div>) : null}
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => this.onNavigate(obj.content)}>{this.words.read}</Button>
                <Button size="small" color="primary" onClick={() => Utils.openLink(obj.github)}>{this.words.github}</Button>
            </CardActions>
        </Card>);
    }

    getWidthOfCard() {
        const width = window.innerWidth;
        if (width < 600) {
            return `calc(50% - ${MARGIN * 2}px)`;
        } else if (width < 1200) {
            return `calc(30% - ${MARGIN * 2}px)`;
        } else if (width < 1600) {
            return `calc(25% - ${MARGIN * 2}px)`;
        } else if (width < 1980) {
            return `calc(20% - ${MARGIN * 2}px)`;
        } else {
            return `calc(10% - ${MARGIN * 2}px)`;
        }
    }

    saveExpanded(expanded) {
        window.localStorage.setItem('Docs.aexpanded', JSON.stringify(expanded || this.state.expanded));
    }

    onExpandAll() {
        const expanded = this.getFolders();
        this.setState({expanded});
        this.saveExpanded(expanded);
    }

    onCollapseAll() {
        this.setState({expanded: []});
        this.saveExpanded([]);
    }

    onExpand(id, e) {
        e && e.stopPropagation();
        if (this.state.expanded.indexOf(id) === -1) {
            const expanded = this.state.expanded.concat([id]);
            this.setState({expanded});
            this.saveExpanded(expanded);
        }
    }

    onCollapse(id, e) {
        e && e.stopPropagation();
        const pos = this.state.expanded.indexOf(id);
        if (pos !== -1) {
            const expanded = this.state.expanded.concat([]);
            expanded.splice(pos, 1);
            this.setState({expanded});
            this.saveExpanded(expanded);
        }
    }

    onToggle(id, e) {
        e && e.stopPropagation();
        const pos = this.state.expanded.indexOf(id);
        if (pos === -1) {
            this.onExpand(id, e);
        } else {
            this.onCollapse(id, e);
        }
    }

    renderHeader() {
        return (<div className={this.props.classes.pageHeader} key="header">
            <span className={this.props.classes.pageTitle}>{I18n.t('List of adapters')}</span>
            <Input placeholder={I18n.t('Filter')}
                   className={this.props.classes.cardFilter}
                   value={this.state.fastFilter}
                   onChange={e => {
                       this.filterTimeout && clearTimeout(this.filterTimeout);
                       this.filterTimeout = setTimeout(() => {
                           this.filterTimeout = null;
                           this.setState({filter: this.state.fastFilter});
                       }, 300);
                       this.setState({fastFilter: e.target.value});
                       window.localStorage && window.localStorage.setItem('Docs.afilter', e.target.value);
                   }}
            />
            <Button className={this.props.classes.pageTitleNew} onClick={() => {
                this.setState({showNew: !this.state.showNew});
                window.localStorage && window.localStorage.setItem('Docs.anew', this.state.showNew ? 'false' : 'true');
            }}>{I18n.t('New in last month:') + ' ' + this.state.newMonth}</Button>
            <span className={this.props.classes.pageTitleTotal}>{I18n.t('Total:') + ' ' + this.state.total}, </span>
        </div>);
    }

    isAdapterVisible(obj) {
        if (this.state.showNew) {
            if (!obj.published || this.forMonth >= obj.published) {
                return false;
            }
        }
        if (this.state.filter) {
            if (obj.keywords.indexOf(this.state.filter.toLowerCase()) === -1) {
                return false;
            }
        }
        return true;
    }

    isSomeVisible(type) {
        if (!this.state.filter && !this.state.showNew) {
            return true;
        } else {
            const items = this.state.content.pages[type];
            return Object.keys(items.pages).find(adapter =>
                this.isAdapterVisible(items.pages[adapter]));
        }
    }

    renderType(type, i) {
        const items = this.state.content.pages[type];
        if (!items || !items.pages) return;

        const isExpanded = this.state.expanded.indexOf(type) !== -1;

        const isSomeVisible = this.isSomeVisible(type);

        if (!isSomeVisible) {
            return null;
        }

        return (<ExpansionPanel key={type} expanded={isExpanded} onChange={e => this.onToggle(type, e)}>
            <ExpansionPanelSummary
                expandIcon={<IconExpandMore />}
                style={{width: 'calc(100% - 48px)'}} //workaround because of the bug. On mobile devices the first element is broken
                className={isExpanded ? this.props.classes.titleExpanded : ''}
            >{
                this.state.content.pages[type].title[this.props.language] || this.state.content.pages[type].title.en || type
            }</ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{root: this.props.classes.details}} style={this.props.mobile ? {textAlign: 'center'} :  {}>
                {isExpanded && Object.keys(items.pages).map(adapter => this.isAdapterVisible(items.pages[adapter]) && this.renderAdapter(type, adapter, items.pages[adapter]))}
            </ExpansionPanelDetails>
        </ExpansionPanel>);
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return (<Loader theme={this.props.theme}/>);
        }

        this.cardWidth = this.getWidthOfCard();

        return [
            this.renderHeader(),
            (<div key="body" className={this.props.classes.root} ref={this.contentRef}>
                {this.state.content && Object.keys(this.state.content.pages).map(type => this.renderType(type))}
            </div>)
        ];
    }
}

Adapters.propTypes = {
    scrollPosition: PropTypes.func,
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
};

export default withStyles(styles)(Adapters);
