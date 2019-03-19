import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
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

import {MdLanguage as IconLanguage} from 'react-icons/md';
import {MdMenu as IconMenu} from 'react-icons/md';

import DialogError from './Dialogs/Error';
import MDPage from './MDPage';
import TreePage from './TreePage';
import Router from './Router';

import LogoBig from './assets/iobroker-logo.svg';
import LogoSmall from './assets/iobroker-logo-small.png';

// Pages
import Blog from './Pages/Blog';
import TabDownload from './Tabs/download/Tab';

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
    }
});

const LANGUAGES = [
    'en', 'de', 'ru'
];

const PAGES = {
    'blog':     {tabIndex: 1, component: Blog,     icon: null, name: 'Blog'},
    'download': {tabIndex: 2, component: TabDownload, icon: null, name: 'Download'},
    'documentation':  {tabIndex: 3, name: 'Documentation', content: 'content.json'},
    'adapters':  {tabIndex: 4, name: 'Adapters', content: 'adapters.json'},
    'about':  {tabIndex: 5, name: 'About', menu: [
            {link: 'https://iobroker.net', name: 'Free', target: 'this'},
            {link: 'https://iobroker.pro', name: 'Pro', target: 'this'},
            {link: 'https://iobroker.link', name: 'VPN', target: 'this'},
    ]},
    'cloud':    {tabIndex: 6, name: 'Cloud', menu: [
        {link: 'https://iobroker.net', name: 'Free', target: 'this'},
        {link: 'https://iobroker.pro', name: 'Pro', target: 'this'},
        {link: 'https://iobroker.link', name: 'VPN', target: 'this'},
    ]},
    'intro':    {component: PageIntro, name: 'intro'},
    'imprint':  {name: 'imprint', md: 'imprint.md'},
    'privacy':  {name: 'privacy', md: 'privacy.md'}
};

class App extends Router {
    constructor(props) {
        super(props);

        let hash = this.getLocation();
        let language = window.localStorage ? window.localStorage.getItem('Docs.language') || Router.detectLanguage() : Router.detectLanguage();
        if (LANGUAGES.indexOf(language) === -1) {
            language = 'de';
        }

        const width = window.innerWidth;

        this.state = {
            errorText: '',
            loaded: true,
            themeType: 'light',
            mobile: width < 650,
            menuOpened: [],
            language,
            showTabMenu: false,
            languageMenu: false,
            anchorMenu: null,
            width: width,
            height: window.innerHeight,
            selectedPage: hash.tab || 'intro'
        };
        this.contentRef = React.createRef();
        this.updateWindowDimensionsBound = this.updateWindowDimensions.bind(this);
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
            this.setState({width, height: window.innerHeight, mobile: width < 650});
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
            if (LANGUAGES.indexOf(location.language) !== -1) {
                newState.language = location.language;
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
                <span className={this.props.classes.languageText}>{this.state.language.toUpperCase()}</span>
            </div>,
            this.state.languageMenu ? [
                (<Menu key="langMenu" id="language-menu" transitionDuration={0} anchorEl={this.state.anchorMenu} open={true} onClose={() => {
                    this.setState({languageMenu: false, anchorMenu: null});
                }}>
                    {LANGUAGES.map(lang => (
                        <MenuItem key={lang} selected={this.state.language === lang} onClick={() =>
                            this.setState({languageMenu: false, anchorMenu: null}, () => {
                                const location = this.getLocation();
                                this.onNavigate(lang, location.tab, location.page, location.chapter);
                            })
                        }>{lang.toUpperCase()}</MenuItem>
                    ))}
                </Menu>)
            ] : null
        ];
    }

    openLink(url, target) {
        if (target === 'this') {
            window.location = url;
        } else {
            window.open(url, target || '_blank');
        }
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
                    <MenuItem key={item.name} onClick={() => this.openLink(item.link, item.target)}>{item.icon || ''}{I18n.t(item.name)}</MenuItem>
                )}
            </Menu>);
        }
    }

    renderTabs() {
        let selected = this.tabName2index(this.state.selectedPage);
        if (selected === -1) {
            selected = false;
        }

        return (<Tabs className={this.props.classes.tabs} value={selected}
                      variant="standard"
                      onChange={(e, value) => {
                          const selectedPage = Object.keys(PAGES)[value];
                          if (PAGES[selectedPage].link) {
                              this.openLink(PAGES[selectedPage].link, PAGES[selectedPage].target);
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
                if (!PAGES[tab].tabIndex) return;

                if (PAGES[tab].menu) {
                    return [
                        (<Tab key={tab} fullWidth={false} label={PAGES[tab].icon ? [(<span>{I18n.t(PAGES[tab].name)}</span>), PAGES[tab].icon] : I18n.t(PAGES[tab].name)}/>),
                        this.renderMenu(tab)
                    ];
                } else {
                    return (<Tab key={tab} fullWidth={false} label={PAGES[tab].icon ? [(<span>{I18n.t(PAGES[tab].name)}</span>), PAGES[tab].icon] : I18n.t(PAGES[tab].name)}/>);
                }
            })}

        </Tabs>);
    }

    renderPagesMenu() {
        return [
            (<IconButton onClick={() => this.setState({showTabMenu: true})}>
                <IconMenu />
            </IconButton>),
            (<Drawer open={this.state.showTabMenu} anchor="right" onClose={() => this.setState({showTabMenu: false})}>
                <List>
                    {Object.keys(PAGES).map(tab => {
                        if (!PAGES[tab].tabIndex) return;

                        if (PAGES[tab].menu) {
                            return [
                                (<ListItem button key={tab}
                                    onClick={e => {
                                        const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                                        if (menuOpened.indexOf(tab) === -1) {
                                            menuOpened.push(tab);
                                        }
                                        this.setState({menuOpened, anchorMenu: e.target})
                                    }}
                                >
                                    {PAGES[tab].icon ? (<ListItemIcon>{PAGES[tab].icon}</ListItemIcon>) : null}
                                    <ListItemText primary={I18n.t(PAGES[tab].name)} />
                                </ListItem>),

                                (<List className={this.props.classes.subMenu}>
                                    {PAGES[tab].menu.map(item =>
                                        (<ListItem classes={{root: this.props.classes.subMenuItem}}button key={item}
                                                   onClick={() => this.openLink(item.link, item.target)}>
                                            {item.icon ? (<ListItemIcon>{item.icon}</ListItemIcon>) : null}
                                            <ListItemText classes={{primary: this.props.classes.subMenuItemText}} primary={item.name} />
                                        </ListItem>)
                                    )}
                                </List>)
                            ];
                        } else {
                            return (<ListItem selected={this.state.selectedPage === tab} button key={tab} onClick={e => {
                                    this.setState({showTabMenu: false}, () => {
                                        this.onNavigate(this.state.language, tab);
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
        return (
            <Toolbar position="static" variant="dense" className={this.props.classes.tabs} >
                {this.renderLogo()}
                {this.renderLanguage()}
                <div style={{flex: 1}}/>
                {this.state.width > 1200 ? this.renderTabs() : this.renderPagesMenu()}

            </Toolbar>
        );
    }

    render() {
        if (!this.state.loaded) {
            return (<Loader theme={this.state.themeType}/>);
        }

        const PageComponent = PAGES[this.state.selectedPage] && PAGES[this.state.selectedPage].component;

        return (
            <div className="App">
                {this.renderAppBar()}
                <div className={this.props.classes.tabContent} ref={this.contentRef}>
                    {PageComponent ? <PageComponent
                        theme={this.state.themeType}
                        mobile={this.state.mobile}
                        onNavigate={this.onNavigate.bind(this)}
                        language={this.state.language}
                    /> : null}
                    {PAGES[this.state.selectedPage] && PAGES[this.state.selectedPage].md ? (<MDPage
                        path={PAGES[this.state.selectedPage].md}
                        theme={this.state.themeType}
                        mobile={this.state.mobile}
                        onNavigate={this.onNavigate.bind(this)}
                        language={this.state.language} />) : null}
                    {PAGES[this.state.selectedPage] && PAGES[this.state.selectedPage].content ? (<TreePage
                        contentPath={PAGES[this.state.selectedPage].content}
                        theme={this.state.themeType}
                        mobile={this.state.mobile}
                        onNavigate={this.onNavigate.bind(this)}
                        language={this.state.language} />) : null}
                </div>
                {this.renderError()}
            </div>
        );
    }
}

export default withStyles(styles)(App);
