import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SplitterLayout from 'react-splitter-layout';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import {FaFolder as IconFolder} from 'react-icons/fa';
import {FaFolderOpen as IconFolderOpened} from 'react-icons/fa';
import {MdExpandMore as IconCollapse} from 'react-icons/md';
import {MdKeyboardArrowRight as IconExpand} from 'react-icons/md';

import MDPage from '../MDPage';

const styles = theme => ({
    expandButton: {
        width: 37,
        height: 37
    },
    element: {
        cursor: 'pointer',
        padding: 0,
        userSelect: 'none'
    },
});

class Intro extends Component {
    constructor(props) {
        super(props);
        let expanded = window.localStorage ? window.localStorage.getItem('Docs.expanded') : '[]';
        try {
            expanded = JSON.parse(expanded) || [];
        } catch (e) {
            expanded = [];
        }


        this.state = {
            path: '',
            content: {},
            menuOpened: true,
            expanded
        };
        this.menuSize = window.localStorage ? parseFloat(window.localStorage.getItem('Docs.menuSize')) || 300 : 300;
        this.load();
    }

    load(contentPath) {
        contentPath = contentPath || this.props.contentPath;
        fetch(contentPath)
            .then(res => res.json())
            .then(content => {
                this.setState({content});
            });
    }

    saveExpanded(expanded) {
        window.localStorage.setItem('Docs.expanded', JSON.stringify(expanded || this.state.expanded));
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

    renderFolderButtons(item, children, isExpanded) {
        if (children) {
            return (
                <IconButton className={this.props.classes.expandButton}
                            onClick={isExpanded ? e => this.onCollapse(item, e) : e => this.onExpand(item, e)}>
                    {isExpanded ? (<IconCollapse fontSize="small"/>) : (<IconExpand fontSize="small"/>)}
                </IconButton>
            );
        } else {
            return (<div className={this.props.classes.expandButton}/>);
        }
    }

    onNavigate(item, obj) {
        const newState = {};
        if (obj.pages && this.state.expanded.indexOf(item) === -1) {
            if (this.state.expanded.indexOf(item) === -1) {
                this.onExpand(item);
            } else {
                this.onCollapse(item);
            }
        }
        if (obj.content) {
            this.setState({path: obj.content});
        }
    }

    renderMenuItem(root, item, level) {
        let isExpanded = true;

        if (root.pages && item) {
            isExpanded = this.state.expanded.indexOf(item) !== -1;
        }

        return [root.title ? (<ListItem
                key={item}
                className={this.props.classes.element}
                onClick={() => this.onNavigate(item, root)}>
                {this.renderFolderButtons(item, root.pages, isExpanded)}
                <ListItemIcon>{root.pages ? (isExpanded ? (<IconFolderOpened/>) : (<IconFolder/>)) : null}</ListItemIcon>
                <ListItemText
                    classes={{primary: item === this.state.selected ? this.props.classes.selected : undefined}}
                    style={{}} primary={root.title[this.props.language] || root.title.en}/>
            </ListItem>) : null,
            isExpanded && root.pages ? Object.keys(root.pages).map(p =>
                this.renderMenuItem(root.pages[p], p, level + 1)) : null
        ];
    }


    render() {
        return (<SplitterLayout
            key="splitterLayout"
            vertical={false}
            primaryMinSize={100}
            primaryIndex={1}
            percentage={false}
            secondaryInitialSize={this.menuSize}
            customClassName={this.props.classes.splitterDivs + ' ' + (!this.state.menuOpened ? this.props.classes.menuDivWithoutMenu : '')}
            onSecondaryPaneSizeChange={size => this.menuSize = parseFloat(size)}
            onDragEnd={() => {
                window.localStorage && window.localStorage.setItem('Docs.menuSize', this.menuSize.toString());
            }}
        >
            <div>{this.renderMenuItem(this.state.content, '', 0)}</div>
            <MDPage
                language={this.props.language}
                theme={this.props.theme}
                mobil={this.props.mobile}
                path={this.state.path}
            />
        </SplitterLayout>);
    }
}

Intro.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    contentPath: PropTypes.string
};

export default withStyles(styles)(Intro);
