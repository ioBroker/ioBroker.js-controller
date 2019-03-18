import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Converter} from 'react-showdown';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';


import {MdEdit as IconEdit} from 'react-icons/md';
import {MdClose as IconClose} from 'react-icons/md';
import {MdExpandMore as IconExpandMore} from 'react-icons/md';
import {FaGithub as IconGithub} from 'react-icons/fa';

import Rooter from './Rooter';
import Loader from './Components/Loader';
import I18n from './i18n';

const styles = theme => ({
    root: {
        width: 'calc(100% - 40px)',
        maxWidth: 1000,
        margin: 20,

        '& h2': {
            width: '100%',
            textAlign: 'left',
            paddingBottom: 10,
            borderBottom: '1px solid lightgray'
        },
        '& hr': {
            borderWidth: '0 0 1px 0'
        },
        '& .warn': {
            borderColor: '#0b87da',
            borderWidth: '0 0 0 3px',
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            borderStyle: 'solid',
            background: '#eff6fb',
            '&:before': {
                content: '"⚠"',
                //borderRadius: '50%',
                //background: '#008aff',
            }
        },
        '& .alarm': {
            borderColor: '#da0b50',
            borderWidth: '0 0 0 3px',
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            borderStyle: 'solid',
            background: '#fbeff3',
            '&:before': {
                content: '"⚠"',
                //borderRadius: '50%',
                //background: '#008aff',
            }
        },
        '& .notice': {
            borderColor: '#9c989b',
            borderWidth: '0 0 0 3px',
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            borderStyle: 'solid',
            background: '#dedede',
            '&:before': {
                content: '"✋"',
                //borderRadius: '50%',
                //background: '#dedede',
            }
        },
        '& a': {
            color: 'inherit'
        },
        '& code': {
            margin: '0 0.15em',
            padding: '0.125em 0.4em',
            borderRadius: 2,
            background: '#e3e3e3',
            color: '#000000',
            whiteSpace: 'nowrap',
        },
        '& img': {
            maxWidth: '100%'
        }
    },
    logoImage: {
        width: 64,
        verticalAlign: 'middle',
    },
    infoEdit: {
        float: 'right'
    },
    adapterCard:{
        marginBottom: 15,
        marginTop: 15
    },
    badgesDetails: {
        display: 'block',
        '& img': {
            marginRight: 5,
        }
    },
    titleText: {
        display: 'inline-block',
        marginLeft: 10,
    },
    adapterCardAttr:{
        fontWeight: 'bold',
        width: 150,
        display: 'inline-block'
    },
    description: {
        fontStyle: 'italic'
    },
    contentDiv: {
        position: 'fixed',
        width: '20%',
        minWidth: 200,
        overflowX: 'hidden',
        opacity: 0.8,
        top: 60,
        right: 20,
        background: '#EEEEEE',
        maxHeight: 'calc(100% - 70px)',
    },
    contentDivClosed: {
        position: 'fixed',
        opacity: 0.8,
        top: 60,
        right: 20,
        width: 25,
        height: 25,
        cursor: 'pointer'
    },
    contentClose: {
        position: 'fixed',
        top: 60 + 5,
        right: 20 + 5,
        cursor: 'pointer',

        '&:hover': {
            color: '#111111'
        }
    },
    contentLinks: {
        cursor: 'pointer',
        '&:hover': {
            color: '#111111'
        }
    },
    headerTranslated: {
        borderColor: '#009c4f',
        borderWidth: '0 0 0 3px',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        borderStyle: 'solid',
        background: '#bdded5',
        '&:before': {
            content: '"i"',
            //borderRadius: '50%',
            //background: '#91dea9',
            color: '#000000'
        }
    },
    license: {
        paddingTop: 10,
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    mdLink: {
        cursor: 'pointer',
        '&:after': {
            content: '"🔗"',
            opacity: 0.7,
            fontSize: 14,
            marginLeft: 5
        }
    },
    info: {
        paddingTop: 10,
        paddingBottom: 10,
    }
});

const converter = new Converter();
let title;

const ADAPTER_CARD = ['version', 'authors', 'keywords', 'mode', 'materialize', 'compact'];

class Markdown extends Rooter {
    constructor(props) {
        super(props);
        // load page
        this.state = {
            text: '',
            loadTimeout: false,
            header: {},
            content: {},
            license: '',
            changeLog: '',
            hideContent: window.localStorage ? window.localStorage.getItem('Docs.hideContent') === 'true' : false,
        };

        if (!title) {
            title = window.title;
        }

        this.load();

        // Give 300ms to load the page. After that show the loading indicator.
        setTimeout(() => !this.state.text && this.setState({loadTimeout: true}), 300);

        this.contentRef = React.createRef();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.path !== nextProps.path) {
            this.load(nextProps.path);
        } else
        if (this.props.language !== nextProps.language) {
            this.load(null, nextProps.language);
        }
    }

    onHashChange(location) {
        location = location || this.getLocation();
        if (location.chapter) {
            const el = window.document.getElementById(location.chapter);
            el && el.scrollIntoView(true);
        }
    }

    openLink(url, target) {
        if (target === 'this') {
            window.location = url;
        } else {
            window.open(url, target || '_blank');
        }
    }

    onNavigate(id, link) {
        if (link && link.match(/^https?:\/\//)) {
            this.openLink(link);
        } else if (id) {
            const el = window.document.getElementById(id) || window.document.getElementById(id.replace('nbsp', ''));
            if (el) {
                el.scrollIntoView(true);
            }

        } else if (link) {
            this.props.onNavigate(null, null, link);
        }
    }

    static getTitle(text) {
        let {body, header} = Markdown.extractHeader(text);
        if (!header.title) {
            // remove {docsify-bla}
            body = body.replace(/{[^}]*}/g, '');
            body = body.trim();
            const lines = body.replace(/\r/g, '').split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith('# ')) {
                    return lines[i].substring(2).trim();
                }
            }
            return '';
        } else {
            return header.title;
        }
    }

    load(path, language) {
        path = path || this.props.path;
        language = language || this.props.language;
        fetch(`${language}${path[0] === '/' ? path : '/' + path}`)
            .then(res => res.text())
            .then(text => {
                const {header, body, content, license, changeLog} = this.format(text);
                let _title = header.title || Markdown.getTitle(text);
                if (_title) {
                    window.document.title = _title;
                } else if (title) {
                    window.document.title = title;
                }
                this.setState({text: body, header, loadTimeout: false, content, license, changeLog});

                setTimeout(() => this.onHashChange(), 200);
            });
    }

    static text2link(text) {
        const m = text.match(/\d+\.\)\s/);
        if (m) {
            text = text.replace(m[0], m[0].replace(/\s/, '&nbsp;'));
        }

        return text.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').trim().replace(/\s/g, '').toLowerCase();
    }

    static text2docLink(text, path) {
        const m = text.match(/\[([^\]]*)]\(([^)]*)\)/);
        if (m) {
            const parts = path.split('/');
            parts.pop();
            return {link: parts.join('/') + '/' + m[2], name: m[1]};
        } else {
            return null;
        }
    }

    static findTitle(line, level, path) {
        let name = line.substring(level + 3).trim()
        // remove bold and italic modifier
            .replace(/^\*|\*$/g, '')
            .replace(/^\*|\*$/g, '')
            .replace(/^\*|\*$/g, '');

        const t = Markdown.text2link(name);

        // detect <a id="Systemeinstellungen"></a>9.) Systemeinstellungen
        const m = name.match(/<a [^>]*>(.*)<\/a>/);
        if (m) {
            name = name.replace(m[0], m[1]).trim();
        }

        const link = Markdown.text2docLink(name, path);

        return {
            level: level,
            title: link ? link.name : name,
            link:  link ? link.link : t,
            href:  t,
            external: !!link
        };
    }

    static decorateText(text, header, path) {
        const lines = text.split('\n');
        const content = {};
        let current = [null, null, null, null, null];

        let license = false;
        let log = false;
        const licenseLines = [];
        const changeLog = [];

        lines.forEach((line, i) => {
            if (line.startsWith('=========')) {
                line = '';
                lines[i] = '--delete--';
            }
            if (header.adapter) {
                if (!license && lines[i].startsWith('## License')) {
                    license = true;
                    log = false;
                    lines[i] = '--delete--';
                    line = '';
                } else if (license) {
                    licenseLines.push(lines[i]);
                    lines[i] = '--delete--';
                    line = '';
                }
                if (license && lines[i].startsWith('## ')) {
                    license = false;
                }

                if (!log && lines[i].match(/^## Changelog/i)) {
                    log = true;
                    license = false;
                    lines[i] = '--delete--';
                    line = '';
                } else if (log) {
                    changeLog.push(lines[i]);
                    lines[i] = '--delete--';
                    line = '';
                }
                if (log && lines[i].startsWith('## ')) {
                    log = false;
                }
            }

            if (line.trim().startsWith('@@@')) {
                lines[i] = line.substring(3).trim();
                const _ll = [];

                let j = i;
                while (j < lines.length && !lines[j].match(/@@@$/)) {
                    _ll.push(lines[j]);
                    lines[j] = '';
                    j++;
                }
                _ll.push(lines[j].replace(/@@@$/, ''));
                lines[j] = '';

                if (j > i + 1) {
                    _ll[0] = '<b>' + _ll[0] + '</b>';
                }

                lines[i] = `<div class="notice" markdown>
${_ll.join('\n')}
</div>`;
            } else
            if (line.startsWith('?> ') || line.startsWith('!> ')) {
                const _ll = [line.substring(3) + '<br/>'];
                let j = i + 1;
                while (j < lines.length && lines[j].startsWith('   ')) {
                    _ll.push(lines[j].substring(3));
                    lines[j] = '';
                    j++;
                }
                if (j > i + 1) {
                    _ll[0] = '<b>' + _ll[0] + '</b>';
                }

                lines[i] = `<div class="${line[0] === '?' ? 'warn' : 'alarm'}" markdown>
${_ll.join('\n')}
</div>`;
            } else if (line.startsWith('## ')) {
                const cont = Markdown.findTitle(line, 0, path);
                content[cont.href] = cont;
                current[0] = cont;
                current[2] = null;
                current[3] = null;
                current[4] = null;
                current[5] = null;
            } else if (line.startsWith('### ')) {
                const cont = Markdown.findTitle(line, 1, path);
                content[cont.href] = cont;

                if (current[0]) {
                    current[0].children = current[0].children || [];
                    current[0].children.push(cont.href);
                }

                current[1] = cont;
                current[2] = null;
                current[3] = null;
                current[4] = null;
            } else if (line.startsWith('#### ')) {
                const cont = Markdown.findTitle(line, 2, path);
                content[cont.href] = cont;
                if (current[1]) {
                    current[1].children = current[1].children || [];
                    current[1].children.push(cont.href);
                }

                current[2] = cont;
                current[3] = null;
                current[4] = null;
            } else if (line.startsWith('##### ')) {
                const cont = Markdown.findTitle(line, 3, path);
                content[cont.href] = cont;
                if (current[2]) {
                    current[2].children = current[2].children || [];
                    current[2].children.push(cont.href);
                }

                current[3] = cont;
                current[4] = null;
            }
        });
        return {lines: lines.filter(line => line !== '--delete--'), content, changeLog: changeLog.join('\n'), license: licenseLines.join('\n')};
    }

    format(text) {
        text = (text || '').trim();
        let {header, body} = Markdown.extractHeader(text);

        body = Markdown.removeDocsify(body);
        let {lines, content, license, changeLog} = Markdown.decorateText(body, header, `${this.props.path[0] === '/' ? this.props.path : '/' + this.props.path}`);

        return {header, body: lines.join('\n'), content, license, changeLog};
    }

    static extractHeader(text) {
        const attrs = {};
        if (text.substring(0, 3) === '---') {
            const pos = text.substring(3).indexOf('\n---');
            if (pos !== -1) {
                const _header = text.substring(3, pos + 3);
                const lines = _header.replace(/\r/g, '').split('\n');
                lines.forEach(line => {
                    if (!line.trim()) {
                        return;
                    }
                    const pos = line.indexOf(':');
                    if (pos !== -1) {
                        const attr = line.substring(0, pos).trim();
                        attrs[attr] = line.substring(pos + 1).trim();
                        attrs[attr] = attrs[attr].replace(/^['"]|['"]$/g, '');
                        if (attrs[attr] === 'true') {
                            attrs[attr] = true;
                        } else if (attrs[attr] === 'false') {
                            attrs[attr] = false;
                        } else if (parseFloat(attrs[attr]).toString() === attrs[attr]) {
                            attrs[attr] = parseFloat(attrs[attr]);
                        }
                    } else {
                        attrs[line.trim()] = true;
                    }
                });
                text = text.substring(pos + 7);
            }
        }
        return {header: attrs, body: text};
    }

    static removeDocsify(text) {
        const m = text.match(/{docsify-[^}]*}/g);
        if (m) {
            m.forEach(doc => text = text.replace(doc, ''));
        }
        return text;
    }

    renderHeader() {
        const data = [];

        if (this.state.header.translatedFrom) {
            data.push((<div className={this.props.classes.headerTranslated}>{I18n.t('Translated from %s', this.state.header.translatedFrom)}</div>));
        }
        if (this.state.header.adapter) {
            data.push((<h1>{[
                this.state.header.logo ? (<img src={this.state.header.logo} alt="logo" className={this.props.classes.logoImage}/>) : null,
                (<div className={this.props.classes.titleText}>{this.state.header.title}</div>)
            ]}</h1>));
            if (this.state.header.readme) {
                const link = this.state.header.readme.replace(/blob\/master\/README.md$/, '');
                data.push((<IconButton title={I18n.t('Open repository')} onClick={() => this.openLink(link)}><IconGithub/></IconButton>));
            }
        }


        if (this.state.header.description) {
            data.push((<span className={this.props.classes.description}>{this.state.header.description}</span>));
        }

        if (Object.keys(this.state.header).find(attr => ADAPTER_CARD.indexOf(attr) !== -1)) {
            data.push((<ExpansionPanel className={this.props.classes.adapterCard}>
                <ExpansionPanelSummary expandIcon={<IconExpandMore />}>{I18n.t('Information')}</ExpansionPanelSummary>
                <ExpansionPanelDetails><List>{
                    ADAPTER_CARD
                        .filter(attr => this.state.header.hasOwnProperty(attr))
                        .map(attr => (
                            <ListItem>
                                <div className={this.props.classes.adapterCardAttr}>{I18n.t(attr)}: </div>
                                <span>{this.state.header[attr].toString()}</span>
                            </ListItem>))}
                </List></ExpansionPanelDetails>
                </ExpansionPanel>));
        }

        if (Object.keys(this.state.header).find(attr => attr.startsWith('BADGE-'))) {
            data.push((<ExpansionPanel className={this.props.classes.adapterCard}>
                <ExpansionPanelSummary expandIcon={<IconExpandMore />}>{I18n.t('Badges')}</ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{root: this.props.classes.badgesDetails}}>{
                    Object.keys(this.state.header).filter(attr => attr.startsWith('BADGE-'))
                        .map(attr => [
                                this.state.header[attr].indexOf('nodei.co') !== -1 ? (<br/>) : null,
                                (<img src={this.state.header[attr]} alt={attr.substring(6)}/>)
                            ]
                        )}
                </ExpansionPanelDetails>
            </ExpansionPanel>));
        }

        return data;
    }

    renderInfo() {
        return (<div className={this.props.classes.info}>
            {this.state.header.lastChanged ? [
                (<span className={this.props.classes.infoTitle}>{I18n.t('Last changed: ')}</span>),
                (<span className={this.props.classes.infoValue}>{this.state.header.lastChanged}</span>),
                ] : null}
            {this.state.header.editLink ? (<a className={this.props.classes.infoEdit} href={this.state.header.editLink} target="_blank"><IconEdit />{I18n.t('Edit on github')}</a>) : null}
        </div>)
    }

    _renderSubContent(menu) {
        return (<ul>{
            menu.children.map(item => {
                const ch = this.state.content[item].children;
                const link = this.state.content[item].external && this.state.content[item].link;
                return (
                    <li><span onClick={() => this.onNavigate(item, link)} className={this.props.classes.contentLinks}>{this.state.content[item].title}</span>
                        {ch ? this._renderSubContent(this.state.content[item]) : null}
                    </li>
                );
            }).filter(e => e)
        }</ul>);
    }

    onToggleContentButton() {
        this.setState({hideContent: !this.state.hideContent});
        window.localStorage && window.localStorage.setItem('Docs.hideContent', this.state.hideContent ? 'false' : 'true');
    }

    renderContentCloseButton() {
        return (<IconClose className={this.props.classes.contentClose} onClick={() => !this.state.hideContent && this.onToggleContentButton()}/>);
    }

    renderContent() {
        const links = Object.keys(this.state.content);
        if (!links.length) {
            return null;
        }
        if (this.state.hideContent) {
            return (<Paper className={this.props.classes.contentDivClosed} onClick={() => this.onToggleContentButton()}>
                {this.renderContentCloseButton()}
            </Paper>);
        } else {
            return (<Paper className={this.props.classes.contentDiv}>
                {this.renderContentCloseButton()}
                <ul>{
                    links.map(item => {
                        if (this.state.content[item].level === 0) {
                            const link = this.state.content[item].external && this.state.content[item].link;
                            return (
                                <li><span onClick={() => this.onNavigate(item, link)} className={this.props.classes.contentLinks}>{this.state.content[item].title}</span>
                                    {this.state.content[item].children ? this._renderSubContent(this.state.content[item]) : null}
                                </li>
                            );
                        }
                    }).filter(e => e)
                }</ul>
            </Paper>);
        }
    }

    renderLicense() {
        if (!this.state.license) {
            return null;
        } else {
            return (<ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<IconExpandMore />}>{I18n.t('License')} <span className={this.props.classes.license}> {this.state.header.license}</span></ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {converter.convert(this.state.license)}
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        }
    }

    renderChangeLog() {
        if (!this.state.changeLog) {
            return null;
        } else {
            return (<ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<IconExpandMore />}>{I18n.t('Changelog')}</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {converter.convert(this.state.changeLog)}
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        }
    }

    replaceHref(reactObj) {
        const parts = this.props.path.split('/');
        parts.pop();
        const prefix = parts.join('/') + '/';

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

    render() {
        if (this.state.loadTimeout && !this.state.text) {
            return (<Loader theme={this.props.theme}/>);
        }
        const reactElement = converter.convert(this.state.text || '');

        this.replaceHref(reactElement);

        return (<div className={this.props.classes.root} ref={this.contentRef}>
            {this.renderHeader()}
            {reactElement}
            <hr/>
            {this.renderLicense()}
            {this.renderChangeLog()}
            {this.renderInfo()}
            {this.renderContent()}
        </div>);
    }
}

Markdown.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    path:  PropTypes.string,
};

export default withStyles(styles)(Markdown);
