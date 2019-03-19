import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import Footer from '../Footer';
import Loader from '../Components/Loader';
import I18n from '../i18n';
import Utils from '../Utils';
import {Converter} from "react-showdown";

const styles = theme => ({
    root: {
        width: '100%',
    },
    header: {
        width: '90%',
        background: '#123456',
        paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: '10%'
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 48,
    },
    headerNotice: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    pages: {
        textAlign: 'center',
    },
    pagePage: {
        maxWidth: 1280,
        width: '80%',
        textAlign: 'left',
        padding: 10,
        margin: 20,
    },
    pageLogo: {
        maxHeight: 250,
    },
    pageTitle: {

    },
    pagePosted: {

    }
});

const converter = new Converter();

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            pages: {},
            loadTimeout: false,
        };
        this.load();

        // Give 300ms to load the page. After that show the loading indicator.
        setTimeout(() => !this.state.content && this.setState({loadTimeout: true}), 300);

        this.contentRef = React.createRef();
    }

    load() {
        const d = new Date();

        fetch(`blog.json?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}`)
            .then(res => res.json())
            .then(content => {
                this.setState({content}, () => this.loadBlog());
            });
    }

    loadBlog(page) {
        const pages = Object.keys(this.state.content.pages);
        page = page || pages[0];
        if (page) {
            fetch(`${this.props.language}/blog/${page}.md`)
                .then(res => res.text())
                .then(text => {
                    const pages = JSON.parse(JSON.stringify(this.state.pages));
                    pages[page] = text;
                    this.setState({pages, loadTimeout: false});
                });
        } else {
            this.setState({loadTimeout: false});
        }
    }

    renderHeader() {
        return (<div key={"header"} className={this.props.classes.header}>
            <h1 key="title" className={this.props.classes.headerTitle}>{I18n.t('ioBroker Blog')}</h1>
            <div key="notice"  className={this.props.classes.headerNotice}>{I18n.t('News, announcement, ideas about ioBroker')}</div>
        </div>);
    }

    replaceHref(reactObj, prefix) {
        if (reactObj && reactObj.props && reactObj.props.children) {
            reactObj.props.children.forEach((item, i) => {
                if (item && item.type === 'a') {
                    let link = item.props.href;
                    if (link) {
                        if (!link.match(/^https?:\/\//)) {
                            link = prefix + link;
                        }

                        reactObj.props.children[i] = (<div
                            className={this.props.classes.mdLink + ' md-link'}
                            title={link}
                            onClick={() => this.onNavigate(null, link)}>
                            {item.props.children[0]}
                        </div>);
                    }
                }

                if (typeof item === 'object') {
                    this.replaceHref(item);
                }
            });
        }
    }

    renderEntry(page) {
        const text = this.state.pages[page];
        let {header, body} = Utils.extractHeader(text);
        let date = page.substring(0, 10).replace(/_/g, '.');
        const d = new Date(date);

        const reactElement = converter.convert(body || '');

        this.replaceHref(reactElement, `${this.props.language}/blog/`);

        return (<Paper  className={this.props.classes.pagePage}>
            {header.logo ? (<img src={header.logo} className={this.props.classes.pageLogo} alt="logo"/>) : null}
            <h2 className={this.props.classes.pageTitle}>{header.title}</h2>
            <div className={this.props.classes.pagePosted}><b>{header.author}</b> {I18n.t(' posted on %s', d.toLocaleDateString())}</div>
            {reactElement}
        </Paper>);
    }

    renderEntries() {
        if (!this.state.content || !this.state.content.pages) {
            return;
        }

        return (<div className={this.props.classes.pages}>{
            Object.keys(this.state.content.pages).filter(page => !!this.state.pages[page]).map(page => this.renderEntry(page))
        }</div>);
    }

    render() {
        if (this.state.loadTimeout && !this.state.content) {
            return (<Loader theme={this.props.theme}/>);
        }

        return [(<div className={this.props.classes.root}>
                {this.renderHeader()}
                {this.renderEntries()}</div>),
            (<Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/>)];
    }
}

Blog.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Blog);
