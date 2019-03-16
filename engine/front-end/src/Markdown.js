import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Converter} from 'react-showdown';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import {MdEdit as IconEdit} from 'react-icons/md';
import {MdClose as IconClose} from 'react-icons/md';
import {MdExpandMore as IconExpandMore} from 'react-icons/md';

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
                content: 'hello',
                borderRadius: '50%',
                background: '#008aff',
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
                content: 'hello',
                borderRadius: '50%',
                background: '#008aff',
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
                content: 'hello',
                borderRadius: '50%',
                background: '#dedede',
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
        }
    },
    infoEdit: {
        float: 'right'
    },
    contentDiv: {
        position: 'fixed',
        width: '20%',
        opacity: 0.8,
        top: 60,
        right: 20,
        background: '#EEEEEE'
    },
    contentDivClosed: {
        position: 'fixed',
        opacity: 0.8,
        top: 60,
        right: 20,
        width: 25,
        height: 25,
    },
    contentClose: {
        position: 'absolute',
        top: 5,
        right: 5,
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
            content: 'i',
            borderRadius: '50%',
            background: '#91dea9',
            color: '#000000'
        }
    },
    license: {
        paddingLeft: 10,
        fontWeight: 'bold'
    }
});

const converter = new Converter();
let title;

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
        setTimeout(() => {
            if (!this.state.text) {
                this.setState({loadTimeout: true});
            }
        }, 300);

        this.contentRef = React.createRef();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.path !== nextProps.path) {
            this.load(nextProps.path);
        }
    }

    onHashChange(location) {
        location = location || this.getLocation();
        if (location.chapter) {
            const el = window.document.getElementById(location.chapter);
            el && el.scrollIntoView(true);
        }
    }

    onNavigate(id) {
        this.props.onNavigate(null, this.props.path, id);
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

    load(path) {
        path = path || this.props.path;
        fetch(`/${this.props.language}/${path}`)
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
        return text.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').trim().replace(/\s/g, '').toLowerCase();
    }
    static decorateText(text, header) {
        const lines = text.split('\n');
        const content = {};
        let current = [null, null, null, null, null];

        let license = false;
        let log = false;
        const licenseLines = [];
        const changeLog = [];

        lines.forEach((line, i) => {
            if (header.adapter) {
                if (!license && lines[i].startsWith('## License')) {
                    license = true;
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
                const name = line.substring(3).trim();
                const t = Markdown.text2link(name);
                content[t] = {
                    level: 0,
                    title: name,
                    link: t
                };
                current[0] = content[t];
                current[2] = null;
                current[3] = null;
                current[4] = null;
                current[5] = null;
            } else if (line.startsWith('### ')) {
                const name = line.substring(4).trim();
                const t = Markdown.text2link(name);
                content[t] = {
                    level: 1,
                    title: name,
                    link: t
                };
                if (current[0]) {
                    current[0].children = current[0].children || [];
                    current[0].children.push(t);
                }

                current[1] = content[t];
                current[2] = null;
                current[3] = null;
                current[4] = null;
            } else if (line.startsWith('#### ')) {
                const name = line.substring(5).trim();
                const t = Markdown.text2link(name);
                content[t] = {
                    level: 2,
                    title: name,
                    link: t
                };
                if (current[1]) {
                    current[1].children = current[1].children || [];
                    current[1].children.push(t);
                }

                current[2] = content[t];
                current[3] = null;
                current[4] = null;
            } else if (line.startsWith('##### ')) {
                const name = line.substring(6).trim();
                const t = Markdown.text2link(name);
                content[t] = {
                    level: 3,
                    title: name,
                    link: t
                };
                if (current[2]) {
                    current[2].children = current[2].children || [];
                    current[2].children.push(t);
                }

                current[3] = content[t];
                current[4] = null;
            }
        });
        return {lines: lines.filter(line => line !== '--delete--'), content, changeLog: changeLog.join('\n'), license: licenseLines.join('\n')};
    }

    format(text) {
        text = (text || '').trim();
        let {header, body} = Markdown.extractHeader(text);

        body = Markdown.removeDocsify(body);
        let {lines, content, license, changeLog} = Markdown.decorateText(body, header);

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
        if (this.state.header.translatedFrom) {
            return (<div className={this.props.classes.headerTranslated}>{I18n.t('Translated from %s', this.state.header.translatedFrom)}</div>)
        } else {
            return null;
        }
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
        return (<ul>
            {
                menu.children.map(item => {
                    const ch = this.state.content[item].children;
                    return (
                        <li><span onClick={() => this.onNavigate(item)} className={this.props.classes.contentLinks}>{this.state.content[item].title}</span>
                            {ch ? this._renderSubContent(this.state.content[item]) : null}
                        </li>
                    );
                }).filter(e => e)
            }
        </ul>);
    }

    renderContentCloseButton() {
        return (<IconClose className={this.props.classes.contentClose} onClick={() => {
            this.setState({hideContent: !this.state.hideContent});
            window.localStorage && window.localStorage.setItem('Docs.hideContent', this.state.hideContent ? 'false' : 'true');
        }}/>);
    }

    renderContent() {
        const links = Object.keys(this.state.content);
        if (!links.length) {
            return null;
        }
        if (this.state.hideContent) {
            return (<Paper className={this.props.classes.contentDivClosed}>
                {this.renderContentCloseButton()}
            </Paper>);
        } else {
            return (<Paper className={this.props.classes.contentDiv}>
                {this.renderContentCloseButton()}
                <ul>
                    {
                        links.map(item => {
                            if (this.state.content[item].level === 0) {
                                return (
                                    <li><span onClick={() => this.onNavigate(item)} className={this.props.classes.contentLinks}>{this.state.content[item].title}</span>
                                        {this.state.content[item].children ? this._renderSubContent(this.state.content[item]) : null}
                                    </li>
                                );
                            }
                        }).filter(e => e)
                    }
                </ul>
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
    render() {
        if (this.state.loadTimeout && !this.state.text) {
            return (<Loader theme={this.props.theme}/>);
        }
        const reactElement = converter.convert(this.state.text || '');

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
