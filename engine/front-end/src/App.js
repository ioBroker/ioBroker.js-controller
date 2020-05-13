import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Input from '@material-ui/core/Input';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import {MdLanguage as IconLanguage} from 'react-icons/md';
import {MdMenu as IconMenu} from 'react-icons/md';
import {MdSearch as IconSearch} from 'react-icons/md';

import DialogError from './Dialogs/Error';
import MDPage from './MDPage';
import TreePage from './TreePage';
import Router from './Router';
import Utils from './Utils';
import Cookies from './Components/Cookies';

import 'react-splitter-layout/lib/index.css';

import LogoBig from './assets/iobroker-logo.svg';
import LogoSmall from './assets/iobroker-logo-small.png';

// Pages
import Blog from './Pages/Blog';
import Statistics from './Pages/Statistics';
import Downloads from './Pages/Downloads';

// pages
import PageIntro from './Pages/Intro';

import Loader from './Components/Loader';
import I18n from './i18n';

const styles = theme => ({
    root: {},

    tabContent: {
        height: `calc(100% - ${theme.tabs.height}px)`,
        overflow: 'auto',
        position: 'relative'
    },
    logoBig: {
        width: 135,
        height: theme.tabs.height,
        cursor: 'pointer'
    },
    logoSmall: {
        width: theme.tabs.height - 10,
        height: theme.tabs.height - 10,
        cursor: 'pointer'
    },
    tabs: Object.assign({display: 'flex'}, theme.tabs),
    tabsNoTabs: {
        paddingLeft: 0,
    },
    tab:  {
        minWidth: 'inherit'
    },
    tabAction: {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    },

    languageButton: {
        width: 32,
        height: 32,
        cursor: 'pointer',
        marginLeft: 15
    },
    languageText: {
        paddingTop: 3,
        cursor: 'pointer'
    },
    subMenu: {
        marginLeft: 30,
        padding: 0,
    },
    subMenuItem: {
        padding: '3px 0 3px 10px'
    },
    subMenuItemText: {
        fontSize: 14,
    },
    searchDiv: {
        marginLeft: 10,
        display: 'inline-block',
        background: '#CCCCCC',
        borderRadius: 3,
        height: 36,
        whiteSpace: 'nowrap'
    },
    search: {
        width: 120,
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        //padding: '8px 8px 8px 72px',
        boxSizing: 'content-box',
        backgroundColor: '#CCCCCC',
        padding: '3px 0 1px 0',
        border: 0,
        marginLeft: 10,
        borderRadius: 3,
        '&:after' : {
            border: 0
        },
        '&:before' : {
            border: 0
        }
    },
    searchInput: {
        display: 'inline-block',
    },
    searchFocus: {
        width: 200,
    },
    searchButton: {
        float: 'left',
        marginLeft: 5,
        marginTop: 10,
        height: 20,
        width: 20,
    },
    searchResultsDiv: {
        minWidth: 100,
        padding: 10,
        zIndex: 100,
    },

    sRdiv: {
        cursor: 'pointer',
        '&:hover': {
            background: '#EEEEEE'
        }
    },
    sRdivNotLast: {
        borderBottom: '1px solid #CCCCCC',
    },
    sRdivType: {
        display: 'inline-block',
        borderRight: '1px solid #CCCCCC',
        padding: '2px 5px',
        textAlign: 'right',
        width: 120,
    },
    sRdivText: {
        display: 'inline-block',
        padding: '2px 5px',
    },
});

const LANGUAGES = {
    'en': {full: 'English', short: 'En'},
    'de': {full: 'Deutsch', short: 'De'},
    'ru': {full: 'Русский', short: 'Ру'},
    'zh-cn': {full: '简体中文', short: 'zh-cn'},
};

const PAGES = {
    'blog':           {tabIndex: 1, component: Blog,      icon: null, name: 'Blog'},
    'download':       {tabIndex: 2, component: Downloads, icon: null, name: 'Download'},
    'documentation':  {tabIndex: 3, name: 'Documentation', content: 'content.json'},
    'adapters':       {tabIndex: 4, name: 'Adapters',      content: 'adapters.json'},
    'forum':          {tabIndex: 5, name: 'Forum',
        links: {
            en: 'https://forum.iobroker.net',
            nl: 'https://forum.iobroker.net/category/40/nederlands',
            de: 'https://forum.iobroker.net/category/4/deutsch',
            ru: 'https://forum.iobroker.net/category/28/%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9',
            'zh-cn': 'https://bbs.iobroker.cn/'
        }, target: '_self'},
    'about':          {tabIndex: 6, name: 'About', menu: [
            {tab: 'statistics', name: 'Statistics', icon: null},
            {name: 'Imprint', tab: 'imprint', icon: null},
        ]},
    'cloud':          {tabIndex: 7, name: 'Cloud', menu: [
            {link: 'https://iobroker.net', name: 'Free', target: 'this'},
            {link: 'https://iobroker.pro', name: 'Pro', target: 'this'},
            {link: 'https://iobroker.link', name: 'VPN', target: 'this'},
        ]},
    'intro':         {component: PageIntro, name: 'intro'},
    'imprint':       {name: 'imprint', md: 'imprint.md'},
    'privacy':       {name: 'privacy', md: 'privacy.md'},
    'statistics':    {component: Statistics},
};

const MOBILE_WIDTH = 650;
const TABS_WIDTH = 1180;

class App extends Router {
    constructor(props) {
        super(props);

        let hash = Router.getLocation();
        let language = hash.language || Router.detectLanguage();
        if (!LANGUAGES[language]) {
            language = 'de';
        }
        I18n.setLanguage(language);

        const width = window.innerWidth;

        this.state = {
            errorText: '',
            loaded: true,
            themeType: 'light',
            mobile: width < MOBILE_WIDTH,
            menuOpened: [],
            language,
            showTabMenu: false,
            languageMenu: false,
            anchorMenu: null,
            width,
            height: window.innerHeight,
            selectedPage: hash.tab || 'intro',
            search: '',
            searchResults: null,
            searchFocus: false,
            lastSeenBlog: window.localStorage.getItem('iobroker.net.lastSeenBlog') ? new Date(window.localStorage.getItem('iobroker.net.lastSeenBlog')).getTime() : 0,
        };

        this.contentRef = React.createRef();
        this.updateWindowDimensionsBound = this.updateWindowDimensions.bind(this);
        Blog.fetchData()
            .then(json => {
               let data = Object.keys(json.pages).sort().pop().split('_');
               this.setState({ latestBlog: new Date(parseInt(data[0], 10), parseInt(data[1], 10) - 1, parseInt(data[2], 10)).getTime() });
            });
    }

    componentDidMount () {
        super.componentDidMount();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensionsBound);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener('resize', this.updateWindowDimensionsBound);
    }

    updateWindowDimensions() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => {
            this.resizeTimer = null;
            const width = window.innerWidth;
            this.setState({width, height: window.innerHeight, mobile: width < MOBILE_WIDTH});
        }, 200);
    }

    onHashChange(location) {
        const newState = {};
        let changed = false;
        if (location.tab !== this.state.selectedPage) {
            newState.selectedPage = location.tab;
            changed = true;
        }
        if (location.language !== this.state.language) {
            if (LANGUAGES[location.language]) {
                newState.language = location.language;
                I18n.setLanguage(newState.language);
                changed = true;
            }
        }
        changed && this.setState(newState);
    }

    renderError() {
        if (!this.state.errorText) {
            return null;
        }

        return (<DialogError text={this.state.text} onClose={() => this.setState({errorText: ''})} />);
    }

    tabName2index(name) {
        return Object.keys(PAGES).filter(page => PAGES[page].tabIndex).indexOf(name || this.state.selectedPage);
    }

    renderLogo() {
        return (<img
            src={this.state.mobile ? LogoSmall : LogoBig}
            alt="logo"
            className={this.state.mobile ? this.props.classes.logoSmall : this.props.classes.logoBig}
            onClick={() => this.onNavigate(this.state.language, 'intro')}
        />)
    }

    renderLanguage() {
        return [
            <div key="langButton" style={{display: 'inherit'}} onClick={e => {
                this.setState({languageMenu: true, anchorMenu: e.target});
            }}>
                <IconLanguage className={this.props.classes.languageButton} />
                <span className={this.props.classes.languageText}>{LANGUAGES[this.state.language].short}</span>
            </div>,
            this.state.languageMenu ? [
                (<Menu key="langMenu" id="language-menu" transitionDuration={0} anchorEl={this.state.anchorMenu} open={true} onClose={() => {
                    this.setState({languageMenu: false, anchorMenu: null});
                }}>
                    {Object.keys(LANGUAGES).map(lang => (
                        <MenuItem key={lang} selected={this.state.language === lang} onClick={() =>
                            this.setState({languageMenu: false, anchorMenu: null}, () => {
                                const location = Router.getLocation();
                                this.onNavigate(lang, location.tab || 'intro', location.page, location.chapter);
                            })
                        }>{LANGUAGES[lang].full}</MenuItem>
                    ))}
                </Menu>)
            ] : null
        ];
    }

    onSearch() {
        if (this.state.search || this.searchValue) {
            window.fetch(`search?ln=${this.state.language}&q=${encodeURIComponent(this.state.search || this.searchValue)}`)
                .then(data => data.json())
                .then(searchResults => this.setState({searchResults}));
        } else {
            this.setState({searchResults: null});
        }
    }

    renderSearch() {
        return (<div className={this.props.classes.searchDiv}><Input
            className={this.props.classes.search + ' ' + (this.state.searchFocus ? this.props.classes.searchFocus : '')}
            //value={this.state.search}
            placeholder={I18n.t('Search...')}
            classes={{input: this.props.classes.searchInput}}
            onFocus={() => this.setState({searchFocus: true})}
            onBlur={() => setTimeout(() => this.setState({searchFocus: false}), 100)}
            onChange={e => {
                this.searchAnchor = this.searchAnchor || e.target;
                this.searchValue = e.target.value;

                //this.setState({search: e.target.value});
                this.searchTimeout && clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.searchTimeout = null;
                    this.onSearch();
                }, 300);
            }}
            onKeyUp={e => {
                if (e.keyCode === 13) {
                    this.searchTimeout && clearTimeout(this.searchTimeout);
                    this.searchTimeout = null;
                    this.onSearch();
                }
            }}
        /><IconSearch className={this.props.classes.searchButton}/></div>);
    }

    renderSearchResult(result, last) {
        const type = result.id.split('/').shift();
        const tab = type === '...' ? type : (type === 'adapterref' ? 'adapters' : 'documentation');
        return (<div className={this.props.classes.sRdiv + ' ' + (!last ? this.props.classes.sRdivNotLast : '')}
                     onClick={e => {
                         e.preventDefault();
                         e.stopPropagation();
                         this.setState({searchResults: null});
                         this.onNavigate(null, tab, result.id)
                     }}>
            <div className={this.props.classes.sRdivType}>{I18n.t(tab)}</div>
            <div className={this.props.classes.sRdivText}>{type === '...' ? I18n.t('More %s results', result.title) : result.title}</div>
        </div>);
    }

    renderSearchResults() {
        const len = this.state.searchResults &&this.state.searchResults.length;
        return (<Popper
            placement="bottom"
            disablePortal={false}
            anchorEl={this.searchAnchor}
            open={!!this.state.searchResults && this.state.searchFocus}
            modifiers={{
                flip: {
                    enabled: true,
                },
                arrow: {
                    enabled: true,
                    element: this.searchAnchor,
                },
            }}
            children={this.state.searchResults && this.state.searchResults.length ?
                (<Paper className={this.props.classes.searchResultsDiv}>{this.state.searchResults.map((link, i) => this.renderSearchResult(link, len - 1 === i))}</Paper>) :
                (<Paper className={this.props.classes.searchResultsDiv}>{I18n.t('No results found')}</Paper>)}
        />);
    }

    onNavigate(language, tab, page, chapter) {
        this.contentRef.current.scrollTop = 0;
        language = language || this.state.language;

        super.onNavigate(language, tab, page, chapter);
    }

    renderMenu(name) {
        if (this.state.menuOpened.indexOf(name) !== -1) {
            return (<Menu id="simple-menu" transitionDuration={0} anchorEl={this.state.anchorMenu} open={true} onClose={() => {
                const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                const pos = menuOpened.indexOf(name);
                if (pos !== -1) {
                    menuOpened.splice(pos, 1);
                    this.setState({menuOpened, anchorMenu: null});
                }}
            }>
                {PAGES[name].menu.map(item =>
                    <MenuItem key={item.name} onClick={() => {
                        if (item.link) {
                            Utils.openLink(item.link, item.target)
                        } else if (item.tab) {
                            this.onNavigate(null, item.tab);
                        }
                        const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                        const pos = menuOpened.indexOf(name);
                        if (pos !== -1) {
                            menuOpened.splice(pos, 1);
                            this.setState({menuOpened, anchorMenu: null});
                        }
                    }}>
                        {item.icon || ''}{I18n.t(item.name)}
                        {this.state.last}
                    </MenuItem>
                )}
            </Menu>);
        }
    }

    renderTabs() {
        let selected = this.tabName2index(this.state.selectedPage);
        if (selected === -1) {
            selected = false;
        }

        return (<Tabs className={this.props.classes.tabs}
                      value={selected}
                      variant="standard"
                      onChange={(e, value) => {
                          const selectedPage = Object.keys(PAGES)[value];
                          if (selectedPage === 'blog') {
                              window.localStorage.setItem('iobroker.net.lastSeenBlog', new Date().toISOString());
                              this.setState({lastSeenBlog: Date.now()});
                          }

                          if (PAGES[selectedPage].links) {
                              Utils.openLink(PAGES[selectedPage].links[this.state.language] || PAGES[selectedPage].links.en, PAGES[selectedPage].target);
                          } else
                          if (PAGES[selectedPage].link) {
                              Utils.openLink(PAGES[selectedPage].link, PAGES[selectedPage].target);
                          } else if (PAGES[selectedPage].menu) {
                              const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                              if (menuOpened.indexOf(selectedPage) === -1) {
                                  menuOpened.push(selectedPage);
                              }
                              this.setState({menuOpened, anchorMenu: e.target})
                          } else {
                              this.onNavigate(this.state.language, selectedPage);
                          }
                      }}>

            {Object.keys(PAGES).map(tab => {
                if (!PAGES[tab].tabIndex) return null;

                if (PAGES[tab].menu) {
                    return [
                        (<Tab classes={{root: this.props.classes.tab}} key={tab} fullWidth={false} label={PAGES[tab].icon ? [(<span>{I18n.t(PAGES[tab].name)}</span>), PAGES[tab].icon] : I18n.t(PAGES[tab].name)}/>),
                        this.renderMenu(tab)
                    ];
                } else {
                    let star = false;
                    if (tab === 'blog') {
                        if (this.state.latestBlog > this.state.lastSeenBlog) {
                            star = true;
                        }
                    }
                    return (<Tab key={tab} classes={{root: clsx(this.props.classes.tab, star && this.props.classes.tabAction) }} fullWidth={false} label={PAGES[tab].icon ? [(<span>{I18n.t(PAGES[tab].name)}</span>), PAGES[tab].icon] : I18n.t(PAGES[tab].name)}/>);
                }
            })}

        </Tabs>);
    }

    renderPagesMenu() {
        return [
            (<Drawer key="drawer" open={this.state.showTabMenu} anchor="right" onClose={() => this.setState({showTabMenu: false})}>
                <List>
                    {Object.keys(PAGES).map(tab => {
                        if (!PAGES[tab].tabIndex) return null;

                        if (PAGES[tab].menu) {
                            return [
                                (<ListItem button key={tab}
                                           onClick={e => {
                                               const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                                               const pos = menuOpened.indexOf(tab);
                                               if (pos === -1) {
                                                   menuOpened.push(tab);
                                               } else {
                                                   menuOpened.splice(pos, 1);
                                               }
                                               this.setState({menuOpened});
                                           }}
                                >
                                    {PAGES[tab].icon ? (<ListItemIcon>{PAGES[tab].icon}</ListItemIcon>) : null}
                                    <ListItemText primary={I18n.t(PAGES[tab].name)} />
                                </ListItem>),

                                this.state.menuOpened.indexOf(tab) !== -1 ? (<List className={this.props.classes.subMenu}>
                                    {PAGES[tab].menu.map(item =>
                                        (<ListItem classes={{root: this.props.classes.subMenuItem}} selected={this.state.selectedPage === tab} button key={item}
                                                   onClick={() => {
                                                       if (item.links) {
                                                           Utils.openLink(item.links[this.state.language] || item.links.en, item.target);
                                                       } else
                                                       if (item.link) {
                                                           Utils.openLink(item.link, item.target)
                                                       } else if (item.tab) {
                                                           this.onNavigate(null, item.tab);
                                                       }
                                                       this.setState({showTabMenu: false});
                                                   }}>
                                            {item.icon ? (<ListItemIcon>{item.icon}</ListItemIcon>) : null}
                                            <ListItemText classes={{primary: this.props.classes.subMenuItemText}} primary={item.name} />
                                        </ListItem>)
                                    )}
                                </List>) : null
                            ];
                        } else {
                            return (<ListItem selected={this.state.selectedPage === tab} button key={tab} onClick={e => {
                                this.setState({showTabMenu: false}, () => {
                                    if (PAGES[tab].links) {
                                        Utils.openLink(PAGES[tab].links[this.state.language] || PAGES[tab].links.en, PAGES[tab].target);
                                    } else if (PAGES[tab].link) {
                                        Utils.openLink(PAGES[tab].link, PAGES[tab].target)
                                    } else {
                                        this.onNavigate(null, tab);
                                    }
                                    this.setState({showTabMenu: false});
                                });
                            }}>
                                {PAGES[tab].icon ? (<ListItemIcon>{PAGES[tab].icon}</ListItemIcon>) : null}
                                <ListItemText primary={I18n.t(PAGES[tab].name)} />
                            </ListItem>);
                        }
                    })}
                </List>
            </Drawer>)
        ];
    }

    renderAppBar() {
        const noTabs = this.state.width <= TABS_WIDTH;
        return (
            <Toolbar position="static" variant="dense" className={this.props.classes.tabs + ' ' + (noTabs ? this.props.classes.tabsNoTabs : '')}>
                {this.renderLogo()}
                {this.renderLanguage()}
                {this.renderSearch()}
                <div style={{flex: 1}}/>
                {noTabs ? (<IconButton key="menuButton" onClick={() => this.setState({showTabMenu: true})}>
                    <IconMenu />
                </IconButton>) : null}
                {noTabs ? this.renderPagesMenu() : this.renderTabs()}
            </Toolbar>
        );
    }

    render() {
        if (!this.state.loaded) {
            return (<Loader theme={this.state.themeType}/>);
        }

        const selectedPage = this.state.selectedPage || 'intro';
        const PageComponent = PAGES[selectedPage] && PAGES[selectedPage].component;

        return (
            <div className="App">
                {this.renderAppBar()}
                <div className={this.props.classes.tabContent} ref={this.contentRef}>
                    {PageComponent ? <PageComponent
                        theme={this.state.themeType}
                        mobile={this.state.mobile}
                        onNavigate={this.onNavigate.bind(this)}
                        language={this.state.language}
                        contentWidth={this.state.width}
                    /> : null}
                    {PAGES[selectedPage] && PAGES[selectedPage].md ? (<MDPage
                        path={PAGES[selectedPage].md}
                        theme={this.state.themeType}
                        mobile={this.state.mobile}
                        onNavigate={this.onNavigate.bind(this)}
                        contentWidth={this.state.width}
                        language={this.state.language} />) : null}
                    {PAGES[selectedPage] && PAGES[selectedPage].content ? (<TreePage
                        contentPath={PAGES[selectedPage].content}
                        theme={this.state.themeType}
                        mobile={this.state.mobile}
                        onNavigate={this.onNavigate.bind(this)}
                        contentWidth={this.state.width}
                        language={this.state.language} />) : null}
                </div>
                {this.renderError()}
                {this.renderSearchResults()}
                <Cookies theme={this.state.themeType}
                         mobile={this.state.mobile}
                         onNavigate={this.onNavigate.bind(this)}
                         language={this.state.language}
                         contentWidth={this.state.width} />
            </div>
        );
    }
}

export default withStyles(styles)(App);
