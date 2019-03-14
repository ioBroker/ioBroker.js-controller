import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DialogError from './Dialogs/Error';
import MDPage from './MDPage';
import TreePage from './Pages/TreePage';

import LogoBig from './assets/iobroker-logo.svg';
import LogoSmall from './assets/iobroker-logo-small.png';

// tabs
import TabBlog from './Tabs/blog/Tab';
import TabDownload from './Tabs/download/Tab';

// pages
import PageIntro from './Pages/Intro';

import Loader from './Components/Loader';
import I18n from './i18n';

const styles = theme => ({
    root: {},

    tabContent: {
        padding: 10,
        height: `calc(100% - ${theme.tabs.height + 6}px)`,
        overflow: 'auto',
        position: 'relative'
    },
    logoBig: {
        width: 135,
        height: theme.tabs.height,
        cursor: 'pointer'
    },
    tabs: theme.tabs
});

const PAGES = {
    'blog':     {tabIndex: 1, component: TabBlog,     icon: null, name: 'Blog'},
    'download': {tabIndex: 2, component: TabDownload, icon: null, name: 'Download'},
    'documentation':  {tabIndex: 3, name: 'documentation', content: '/content.json'},
    'cloud':    {tabIndex: 4, name: 'Cloud', menu: [
        {link: 'https://iobroker.net', name: 'Free', target: 'this'},
        {link: 'https://iobroker.pro', name: 'Pro', target: 'this'},
        {link: 'https://iobroker.link', name: 'VPN', target: 'this'},
        ]},
    'intro':    {component: PageIntro, name: 'intro'},
    'imprint':  {name: 'imprint', md: '/imprint.md'},
    'privacy':  {name: 'privacy', md: '/privacy.md'}
};

class App extends Component {
    constructor(props) {
        super(props);

        let hash = window.location.hash.substring(1);
        if (hash) {
            hash = hash.split('/')[0];
        }

        this.state = {
            errorText: '',
            loaded: true,
            themeType: 'light',
            mobile: false,
            menuOpened: [],
            anchorMenu: null,
            language: 'en',
            selectedPage: hash || 'intro'
        };
        this.contentRef = React.createRef();

        this.onHashChangeBound = this.onHashChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.onHashChangeBound, false);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onHashChangeBound);
    }

    onHashChange() {
        let selectedPage = window.location.hash.substring(1).split('/')[0];
        if (selectedPage !== this.state.selectedPage) {
            this.setState({selectedPage});
        }
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
            onClick={() => this.onNavigate('intro')}
        />)
    }

    openLink(url, target) {
        if (target === 'this') {
            window.location = url;
        } else {
            window.open(url, target || '_blank');
        }
    }

    onNavigate(page) {
        this.contentRef.current.scrollTop = 0;

        window.location.hash = '#' + page;
    }

    renderMenu(name) {
        if (this.state.menuOpened.indexOf(name) !== -1) {
            return (<Menu id="simple-menu" anchorEl={this.state.anchorMenu} open={true} onClose={() => {
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

    renderAppBar() {
        let selected = this.tabName2index(this.state.selectedPage);
        if (this.state.selectedPage === 'intro') {
            selected = 0;
        } else if (selected === -1) {
            selected = false;
        } else {
            selected = selected + 2;
        }

        return (
            <Toolbar position="static" variant="dense" className={this.props.classes.tabs} >
                <Tabs className={this.props.classes.tabs} value={selected}
                      onChange={(e, value) => {
                          const selectedPage = Object.keys(PAGES)[value - 2];
                          if (PAGES[selectedPage].link) {
                              this.openLink(PAGES[selectedPage].link, PAGES[selectedPage].target);
                          } else if (PAGES[selectedPage].menu) {
                              const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                              if (menuOpened.indexOf(selectedPage) === -1) {
                                  menuOpened.push(selectedPage);
                              }
                              this.setState({menuOpened, anchorMenu: e.target})
                          } else {
                              this.onNavigate(selectedPage);
                          }
                      }}>
                    {this.renderLogo()}

                    <div style={{flexGrow: 1}}/>

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

                </Tabs>
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
                    {PAGES[this.state.selectedPage].md ? (<MDPage
                        path={PAGES[this.state.selectedPage].md}
                        theme={this.state.themeType}
                        mobile={this.state.mobile}
                        onNavigate={this.onNavigate.bind(this)}
                        language={this.state.language} />) : null}
                    {PAGES[this.state.selectedPage].content ? (<TreePage
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
