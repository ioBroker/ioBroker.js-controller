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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

import {MdExpandMore as IconExpandMore} from 'react-icons/md';
import {MdReorder as IconList} from 'react-icons/md';
import {MdViewModule as IconCards} from 'react-icons/md';
import {MdUnfoldMore as IconExpandAll} from 'react-icons/md';
import {MdUnfoldLess as IconCollapseAll} from 'react-icons/md';

import Loader from '../Components/Loader';
import I18n from '../i18n';
import Utils from "../Utils";

const MARGIN = 10;

const styles = theme => ({
    root: {
        margin: 10,
        height: 'calc(100% - 55px)',
        overflow: 'hidden',
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
    },

    headerButtons: {
        '&:hover': {
            backgroundColor: '#dbdbdb'
        },
        color: theme.palette.type === 'dark' ? '#ffffff' : '#111111',
        cursor: 'pointer',
        marginTop: 1,
        marginRight: 2,
        height: 22,
        width: 22,
    },
    tableRoot: {
        height: 'calc(100% - 55px)',
        width: '100%',
        overflow: 'hidden',
    },
    table: {

    },
    tableLogo: {
        height: 'auto',
        width: 'auto',
        maxWidth: 32,
    },
    tableRow:{
        cursor: 'pointer',
        '&:hover': {
            background: '#DDDDDD'
        }
    },
    tableCell:{
        padding: '0 5px',
        minWidth: 0,
    },
    tableColumnIcon: {
        width: 32,
    },
    tableColumnTitle: {
        width: 80,
        fontWeight: 'bold',
    },
    tableColumnDesc: {
    },
    tableColumnType: {
        width: 100,
    },
    tableColumnInstalled: {
        width: 80,
    },
    tableColumnLicense: {
        width: 80,
    },
    tableColumnAuthor: {
        width: 100,
    },
    tableColumnCreated: {
        width: 48,
    },
    tableColumnVersions: {
        width: 48,
        whiteSpace: 'nowrap',
        textAlign: 'left',
        paddingRight: '5px !important',
    },
    tableEmail: {
        color: '#00a7ff',
        cursor: 'pointer',
    },
    versionTitle: {
        fontSize: 8,
        paddingRight: 3,
        width: 24,
        display: 'inline-block',
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

        let expanded = window.localStorage ? window.localStorage.getItem('Docs.AExpanden') : '[]';
        try {
            expanded = JSON.parse(expanded) || [];
        } catch (e) {
            expanded = [];
        }

        let filter = window.localStorage ? window.localStorage.getItem('Docs.afilter') || '' : '';

        // load page
        this.state = {
            content: '',
            adapters: {},
            expanded,
            showNew: false,
            filter,
            fastFilter: filter,
            total: '-',
            tableView: window.localStorage ? window.localStorage.getItem('Docs.aTableView') === 'true' : false,
            newMonth: window.localStorage ? window.localStorage.getItem('Docs.anew') === 'true' : false,
            loadTimeout: false,
            statistics: {},
            orderBy: window.localStorage ? window.localStorage.getItem('Docs.aOrderBy') || 'Title' : 'Title',
            order: window.localStorage ? window.localStorage.getItem('Docs.aOrder') || 'asc' : 'asc',
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
        const result = {total: 0, newMonth: 0, adapters: {}};
        this.forMonth = new Date();
        this.forMonth.setDate(this.forMonth.getDate() - 30);

        Object.keys(content.pages).forEach(type => {
            if (content.pages[type].pages) {
                Object.keys(content.pages[type].pages).forEach(adapter => {
                    const obj = content.pages[type].pages[adapter];
                    result.total++;
                    obj.type = type;
                    if (obj.published && typeof obj.published !== 'object') {
                        obj.published = new Date(obj.published);
                    }
                    obj.date = this.formatDate(obj.published);
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

                    }
                    obj.keywords = obj.keywords || '';
                    obj.keywords += obj.title;
                    obj.keywords = obj.keywords.toLowerCase();
                    result.adapters[adapter] = obj;
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
                    newMonth: stats.newMonth,
                    adapters: stats.adapters,
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

    renderAdapterCard(type, adapter, obj) {
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
                <div  className={this.props.classes.cardTitle}><h2>{adapter}</h2></div>
                <CardContent className={this.props.classes.cardContent}>
                    <h2>&nbsp;</h2>
                    <p>
                        {obj.titleFull ? obj.titleFull[this.props.language] || obj.titleFull.en || obj.titleFull : obj.title[this.props.language] || obj.title.en || obj.title}
                    </p>
                    <p>{obj.description ? obj.description[this.props.language] || obj.description.en : ''}</p>
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
        window.localStorage.setItem('Docs.AExpanden', JSON.stringify(expanded || this.state.expanded));
    }

    onExpandAll() {
        const expanded = Object.keys(this.state.content.pages);
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
            <IconExpandAll key="expandAll" className={this.props.classes.headerButtons} title={I18n.t('Expand all')} onClick={() => this.onExpandAll()}/>
            {this.state.expanded.length ? (<IconCollapseAll key="collapseAll" className={this.props.classes.headerButtons} title={I18n.t('Collapse all')} onClick={() => this.onCollapseAll()}/>) : null}
            {<IconButton onClick={() => {
                window.localStorage && window.localStorage.setItem('Docs.aTableView', this.state.tableView ? 'false' : 'true');
                this.setState({tableView: !this.state.tableView});
            }}>{this.state.tableView ? (<IconCards/>) : (<IconList/>)}</IconButton>}
            {!this.state.tableView ? (<Button className={this.props.classes.pageTitleNew} color={this.state.showNew ? 'secondary' : ''} onClick={() => {
                this.setState({showNew: !this.state.showNew});
                window.localStorage && window.localStorage.setItem('Docs.anew', this.state.showNew ? 'false' : 'true');
            }}>{I18n.t('New in last month:') + ' ' + this.state.newMonth}</Button>) : null}
            <span className={this.props.classes.pageTitleTotal}>{I18n.t('Total:') + ' ' + this.state.total}{this.state.tableView ? '' : ', '}</span>
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
            <ExpansionPanelDetails classes={{root: this.props.classes.details}} style={this.props.mobile ? {textAlign: 'center'} :  {}}>
                {isExpanded && Object.keys(items.pages).map(adapter => this.isAdapterVisible(items.pages[adapter]) && this.renderAdapterCard(type, adapter, items.pages[adapter]))}
            </ExpansionPanelDetails>
        </ExpansionPanel>);
    }

    formatDate(date) {
        if (!date) return '';
        return date.getFullYear() + '.' + Utils.padding(date.getMonth() + 1) + '.' + Utils.padding(date.getDate());
    }

    formatAuthor(author, email) {
        if (email) {
            return (<span className={this.props.classes.tableEmail} title={I18n.t('Click to copy %s', email)} onClick={e => {
                Utils.onCopy(e, email);
                this.setState({tooltip: I18n.t('Copied')});
            }}>{author}</span>);
        } else {
            return (<span className={this.props.classes.tableAuthor}>{author}</span>);
        }
    }

    renderVersion(obj) {
        if (obj.version !== obj.latestVersion) {
            return [
                (<div className={this.props.classes.versionTitle}>stable</div>),
                obj.version,
                (<br/>),
                (<div className={this.props.classes.versionTitle}>latest</div>),
                obj.latestVersion
            ];
        } else {
            return [(<div className={this.props.classes.versionTitle}>&nbsp;</div>), obj.version];
        }
    }

    renderTableLine(name, obj) {
        return (<TableRow className={this.props.classes.tableRow} onClick={() => {
            this.onNavigate(`adapterref/iobroker.${name}/README.md`);
        }}>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnIcon} align="left" padding="dense">{(<img className={this.props.classes.tableLogo} alt="logo" src={this.props.language + '/' + obj.icon}/>)}</TableCell>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnTitle} align="left" padding="dense">{name}</TableCell>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnDesc} padding="dense">{obj.description ? obj.description[this.props.language] || obj.description.en : ''}</TableCell>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnType} align="right" padding="dense">{obj.type}</TableCell>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnInstalled} align="right" padding="dense">{obj.installs}</TableCell>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnLicense} align="right" padding="dense">{obj.license}</TableCell>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnAuthor} align="right" padding="dense">{obj.authors ? obj.authors.map(item => [this.formatAuthor(item.name, item.email), (<br/>)]) : ''}</TableCell>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnCreated} align="right" padding="dense">{this.formatDate(obj.published)}</TableCell>
            <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnVersions} align="right" padding="dense">{this.renderVersion(obj)}</TableCell>
        </TableRow>)
    }

    sortHandler(col) {
        if (this.state.orderBy === col) {
            const order = this.state.order === 'asc' ? 'desc' : 'asc';
            this.setState({order});
            window.localStorage && window.localStorage.setItem('Docs.aOrder', order);
        } else {
            const order = col === 'Installed' || col === 'Created' ? 'desc' : 'asc';
            window.localStorage && window.localStorage.setItem('Docs.aOrder', order);
            window.localStorage && window.localStorage.setItem('Docs.aOrderBy', col);
            this.setState({order, orderBy: col})
        }
    }

    renderHeaderCell(className, type, align) {
        return (<TableCell
            className={this.props.classes.tableCell + ' ' + className}
            align={align}
            sortDirection={this.state.orderBy === type ? this.state.order : false}
        >
            <Tooltip
                title={I18n.t('Sort')}
                placement="bottom-end"
                enterDelay={300}
            >
                <TableSortLabel
                    active={this.state.orderBy === type}
                    direction={this.state.order}
                    onClick={() => this.sortHandler(type)}
                >{I18n.t(type)}</TableSortLabel>
            </Tooltip>
        </TableCell>);
    }

    static compareStrings(a, b, invert) {
        if (a === b) return 0;
        if (a > b) {
            return invert ? -1 : 1;
        } else {
            return invert ? 1 : -1;
        }
    }

    renderTable() {
        const names = Object.keys(this.state.adapters);
        if (this.state.orderBy === 'Title') {
            if (this.state.order === 'asc') {
                names.sort();
            } else {
                names.sort((a, b) => Adapters.compareStrings(a, b, true));
            }
        } else if (this.state.orderBy === 'Installed') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => ad[a].installs - ad[b].installs);
            } else {
                names.sort((a, b) => ad[b].installs - ad[a].installs);
            }
        } else if (this.state.orderBy === 'License') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => ad[a].license === ad[b].license ? (Adapters.compareStrings(a, b)) : Adapters.compareStrings(ad[a].license, ad[b].license));
            } else {
                names.sort((a, b) => ad[a].license === ad[b].license ? (Adapters.compareStrings(a, b, true)) : Adapters.compareStrings(ad[a].license, ad[b].license, true));
            }
        } else if (this.state.orderBy === 'Created') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => ad[a].date === ad[b].date ? (Adapters.compareStrings(a, b)) : Adapters.compareStrings(ad[a].date, ad[b].date));
            } else {
                names.sort((a, b) => ad[a].date === ad[b].date ? (Adapters.compareStrings(a, b, true)) : Adapters.compareStrings(ad[a].date, ad[b].date, true));
            }
        } else if (this.state.orderBy === 'Type') {
            const ad = this.state.adapters;
            if (this.state.order === 'asc') {
                names.sort((a, b) => ad[a].type === ad[b].type ? (Adapters.compareStrings(a, b)) : Adapters.compareStrings(ad[a].type, ad[b].type));
            } else {
                names.sort((a, b) => ad[a].type === ad[b].type ? (Adapters.compareStrings(a, b, true)) : Adapters.compareStrings(ad[a].type, ad[b].type, true));
            }
        }

        return (<div className={this.props.classes.tableRoot}><Table key="table" padding="dense" className={this.props.classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnIcon} align="left">{I18n.t('Icon')}</TableCell>
                    {this.renderHeaderCell(this.props.classes.tableColumnTitle, 'Title', 'left')}
                    <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnDesc}>{I18n.t('Description')}</TableCell>
                    {this.renderHeaderCell(this.props.classes.tableColumnType, 'Type', 'right')}
                    {this.renderHeaderCell(this.props.classes.tableColumnInstalled, 'Installed', 'right')}
                    {this.renderHeaderCell(this.props.classes.tableColumnLicense, 'License', 'right')}
                    <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnAuthor} align="right">{I18n.t('Maintainer')}</TableCell>
                    {this.renderHeaderCell(this.props.classes.tableColumnCreated, 'Created', 'right')}
                    <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnVersions} align="right">{I18n.t('Versions')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {names.map(a => this.renderTableLine(a, this.state.adapters[a]))}
            </TableBody>
        </Table></div>)
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return (<Loader theme={this.props.theme}/>);
        }

        this.cardWidth = this.getWidthOfCard();

        return [
            this.renderHeader(),
            this.state.tableView ? this.renderTable() :
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
