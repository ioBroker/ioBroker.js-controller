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

import {MdExpandMore as IconExpandMore} from 'react-icons/md';

import Loader from '../Components/Loader';
import I18n from '../i18n';

const MARGIN = 10;

const styles = theme => ({
    root: {
        margin: 10,
    },
    card: {
        margin: MARGIN,
        minWidth: 150,
        display: 'inline-block'
    },
    titleExpanded: {
        fontWeight: 'bold',
        borderBottom: '1px solid #999999'
    },
    details: {
        display: 'inline-block'
    }
});

function ajax(url, cb) {
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {cb(null, this.responseText)};
    oReq.open('get', url, true);
    oReq.addEventListener('error', function (e) {cb(e)}, false);
    oReq.send();
}

class Adapters extends Component {
    constructor(props) {
        super(props);

        let expanded = window.localStorage ? window.localStorage.getItem('Docs.aexpanded') : '[]';
        try {
            expanded = JSON.parse(expanded) || [];
        } catch (e) {
            expanded = [];
        }

        // load page
        this.state = {
            content: '',
            expanded,
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

    load(path, language) {
        fetch(`adapters.json`)
            .then(res => res.json())
            .then(content =>
                ajax(`http://iobroker.live/statistics.json`, (e, statistics) =>
                    this.setState({content, loadTimeout: false, statistics: JSON.parse(statistics)})));
    }

    renderAdapter(type, adapter, obj) {
        return (<Card className={this.props.classes.card} style={{width: this.cardWidth}}>
            <CardActionArea>
                <CardMedia
                    className={this.props.classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <h2>{adapter}</h2>
                    <p>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </p>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
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
    renderType(type) {
        const items = this.state.content.pages[type];
        if (!items || !items.pages) return;

        const isExpanded = this.state.expanded.indexOf(type) !== -1;

        return (<ExpansionPanel expanded={isExpanded} onChange={e => this.onToggle(type, e)}>
            <ExpansionPanelSummary expandIcon={<IconExpandMore />} className={isExpanded ? this.props.classes.titleExpanded : ''}>{
                this.state.content.pages[type].title[this.props.language] || this.state.content.pages[type].title.en || type
            }</ExpansionPanelSummary>
            <ExpansionPanelDetails classes={{root: this.props.classes.details}}>
                {isExpanded && Object.keys(items.pages).map(adapter => this.renderAdapter(type, adapter, items.pages[adapter]))}
            </ExpansionPanelDetails>
        </ExpansionPanel>);
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return (<Loader theme={this.props.theme}/>);
        }

        this.cardWidth = this.getWidthOfCard();

        return (<div className={this.props.classes.root} ref={this.contentRef}>
            {this.state.content && Object.keys(this.state.content.pages).map(type => this.renderType(type))}
        </div>);
    }
}

Adapters.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
};

export default withStyles(styles)(Adapters);
