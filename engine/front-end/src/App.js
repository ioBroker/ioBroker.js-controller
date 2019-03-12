import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DialogError from './Dialogs/Error';


import LogoBig from './assets/iobroker-logo.svg';
import LogoSmall from './assets/iobroker-logo-small.png';
import {FaExternalLinkAlt as IconLink} from 'react-icons/fa';

// tabs
import TabIntro from './Tabs/intro/Tab';
import TabBlog from './Tabs/blog/Tab';
import TabDownload from './Tabs/download/Tab';


import Loader from './Components/Loader';
import I18n from './i18n';

const styles = theme => ({
    root: {},
    tabContent: {
        padding: 10,
        height: 'calc(100% - 64px - 48px - 20px)',
        overflow: 'auto'
    },
    logoBig: {
        width: 135,
        height: theme.tabs.height,
        cursor: 'pointer'
    },
    tabs: theme.tabs
});

const TABS = {
    'blog':     {component: TabBlog,     icon: null, name: 'Blog'},
    'download': {component: TabDownload, icon: null, name: 'Download'},
    'github':   {link: 'https://github.com/ioBroker', icon: (<IconLink style={{marginLeft: 10}} />), name: 'GitHub'},
    'cloud':    {name: 'Cloud', menu: [
        {link: 'https://iobroker.net', name: 'Free', target: 'this'},
        {link: 'https://iobroker.pro', name: 'Pro', target: 'this'},
        {link: 'https://iobroker.link', name: 'VPN', target: 'this'},
        ]},
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: '',
            errorText: '',
            loaded: true,
            themeType: 'light',
            mobile: false,
            menuOpened: [],
            anchorMenu: null,
        };
    }

    renderError() {
        if (!this.state.errorText) {
            return null;
        }

        return (<DialogError text={this.state.text} onClose={() => this.setState({errorText: ''})} />);
    }

    tabName2index(name) {
        return Object.keys(TABS).indexOf(name || this.state.selectedTab);
    }

    renderLogo() {
        return (<img
            src={this.state.mobile ? LogoSmall : LogoBig}
            alt="logo"
            className={this.state.mobile ? this.props.classes.logoSmall : this.props.classes.logoBig}
            onClick={() => this.setState({selectedTab: ''})}
        />)
    }

    openLink(url, target) {
        if (target === 'this') {
            window.location = url;
        } else {
            window.open(url, target || '_blank');
        }

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
                {TABS[name].menu.map(item =>
                    <MenuItem key={item.name} onClick={() => this.openLink(item.link, item.target)}>{item.icon || ''}{I18n.t(item.name)}</MenuItem>
                )}
            </Menu>);

        }
    }

    renderAppBar() {
        const selected = this.tabName2index(this.state.selectedTab);
        return (
            <Toolbar position="static" variant="dense" className={this.props.classes.tabs} >
                <Tabs className={this.props.classes.tabs} value={!this.state.selectedTab ? -1 : selected + 2}
                      onChange={(e, value) => {
                          const selectedTab = Object.keys(TABS)[value - 2];
                          if (TABS[selectedTab].link) {
                              this.openLink(TABS[selectedTab].link, TABS[selectedTab].target);
                          } else if (TABS[selectedTab].menu) {
                              const menuOpened = JSON.parse(JSON.stringify(this.state.menuOpened));
                              if (menuOpened.indexOf(selectedTab) === -1) {
                                  menuOpened.push(selectedTab);
                              }
                              this.setState({menuOpened, anchorMenu: e.target})
                          } else {
                              this.setState({selectedTab});
                          }
                      }}>
                    {this.renderLogo()}

                    <div style={{flexGrow: 1}}/>

                    {Object.keys(TABS).map(tab => {
                        if (TABS[tab].menu) {
                            return [
                                (<Tab key={tab} fullWidth={false} label={TABS[tab].icon ? [(<span>{I18n.t(TABS[tab].name)}</span>), TABS[tab].icon] : I18n.t(TABS[tab].name)}/>),
                                this.renderMenu(tab)
                            ];
                        } else {
                            return (<Tab key={tab} fullWidth={false} label={TABS[tab].icon ? [(<span>{I18n.t(TABS[tab].name)}</span>), TABS[tab].icon] : I18n.t(TABS[tab].name)}/>);
                        }
                    })}

                </Tabs>
            </Toolbar>
        );
    }

    renderFooter() {

    }

    render() {
        if (!this.state.loaded) {
            return (<Loader theme={this.state.themeType}/>);
        }

        const TabComponent = TABS[this.state.selectedTab] && TABS[this.state.selectedTab].component;

        return (
            <div className="App">
                {this.renderAppBar()}
                <div className={this.props.classes.tabContent}>
                    {!this.state.selectedTab ? <TabIntro  theme={this.state.themeType}/> : null}
                    {TabComponent ? <TabComponent theme={this.state.themeType}/> : null}
                </div>
                {this.renderError()}
                {this.renderFooter()}
            </div>
        );
    }
}

export default withStyles(styles)(App);
