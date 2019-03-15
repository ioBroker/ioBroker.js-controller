import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Converter} from 'react-showdown';
import Paper from '@material-ui/core/Paper';

import {MdEdit as IconEdit} from 'react-icons/md';

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
        },        '& a': {
            color: 'inherit'
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
    contentLinks: {
        cursor: 'pointer',
        '&:hover': {
            color: '#111111'
        }
    }
});

const converter = new Converter();
let title;

class Markdown extends Component {
    constructor(props) {
        super(props);
        // load page
        this.state = {
            text: '',
            loadTimeout: false,
            header: {},
            content: {}
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

        this.onHashChangeBound = this.onHashChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.onHashChangeBound, false);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onHashChangeBound);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.path !== nextProps.path) {
            this.load(nextProps.path);
        }
    }

    onHashChange() {
        let hash = window.location.hash.substring(1).split('/');
        if (hash.length > 1) {
            const id = hash.pop();
            const el = window.document.getElementById(id);
            el && el.scrollIntoView(true);
        }
    }

    onNavigate(id) {
        let hash = window.location.hash.substring(1).split('/');
        if (hash.length === 2) {
            hash[1] = id;
        } else {
            hash.push(id);
        }
        window.location.hash = '#' + hash.join('/');
    }

    load(path) {
        path = path || this.props.path;
        fetch(`/${this.props.language}/${path}`)
            .then(res => res.text())
            .then(text => {
                const {header, body, content} = this.format(text);
                this.setState({text: body, header, loadTimeout: false, content});
                if (header.title) {
                    window.document.title = header.title;
                } else {
                    window.document.title = title;
                }
                setTimeout(() => this.onHashChange(), 200);
            });
    }

    static text2link(text) {
        return text.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').trim().replace(/\s/g, '').toLowerCase();
    }
    static decorateText(text) {
        const lines = text.split('\n');
        const content = {};
        let current = [null, null, null, null, null];
        lines.forEach((line, i) => {
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
                current[4] = null;            }
        });
        return {lines, content};
    }

    format(text) {
        text = (text || '').trim();
        let {header, body} = Markdown.extractHeader(text);

        body = Markdown.removeDocsify(body);
        let {lines, content} = Markdown.decorateText(body);

        return {header, body: lines.join('\n'), content};
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

    renderInfo() {
        return (<div className={this.props.classes.info}>
            {this.state.header.lastChanged ? [
                (<span className={this.props.classes.infoTitle}>{I18n.t('Last changed: ')}</span>),
                (<span className={this.props.classes.infoValue}>{this.state.header.lastChanged}</span>),
                ] : null}
            {this.state.header.source ? (<a className={this.props.classes.infoEdit} href={this.state.header.source} target="_blank"><IconEdit />{I18n.t('Edit on github')}</a>) : null}
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

    renderContent(root) {
        const links = Object.keys(this.state.content);
        if (!links.length) {
            return null;
        }
        return (<Paper className={this.props.classes.contentDiv}>
            <ul>
            {
                links.map(item => {
                    if (this.state.content[item].level === 0) {
                        const ch =this.state.content[item].children;
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

    render() {
        if (this.state.loadTimeout && !this.state.text) {
            return (<Loader theme={this.props.theme}/>);
        }
        const reactElement = converter.convert(this.state.text);

        return (<div className={this.props.classes.root} ref={this.contentRef}>
            {reactElement}
            <hr/>
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
