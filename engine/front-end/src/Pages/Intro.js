import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import {FaUsers as IconForum} from 'react-icons/fa';
import {FaAddressCard as IconUsers} from 'react-icons/fa';
import {FaComments as IconPosts} from 'react-icons/fa';
import {FaComment as IconThemes} from 'react-icons/fa';
import {MdCloud as IconCloud} from 'react-icons/md';
import ServerImg from '../assets/iob-server.png';

import Footer from '../Footer';
import ForumInfo from '../Components/ForumInfo';
import Subscribe from '../Components/Subscribe';
import Press from '../Components/Press';
import Adapters from '../Components/Adapters';
import SupportUs from '../Components/SupportUs';
import About from '../Components/About';
import Screenshots from '../Components/Screenshots';

import BackImage from '../assets/background.jpg';
import LinusShell from '../Components/LinusShell';
import I18n from '../i18n';
import Utils from '../Utils';

const styles = theme => ({
    content: theme.content,
    backImage: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + BackImage + ')',
        height: 'calc(100vh - 50px)',
        textAlign: 'center',
    },
    title: {
        margin: 'auto',
        width: '100%',
        maxWidth: 650,
        paddingTop: 50,
    },
    titleDiv: {
        background: '#FFFFFFAA',
        borderRadius: 20,
        paddingTop: 20,
        paddingLeft: 40,
        paddingBottom: 20,
        paddingRight: 40,
    },
    titleMain: {
        fontSize: 48,
        fontFamily: 'Audiowide'
    },
    titleSecond: {
        fontSize: 32,
        fontFamily: 'Audiowide'
    },
    titleDescription: {
        fontSize: 24,
    },
    cloudButton: {
        marginTop: 100,
        paddingTop: 25,
        height: 45,
        borderRadius: 100,
        textTransform: 'uppercase',
        background: '#3399CC',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        opacity: 0.9,
        fontFamily: 'Audiowide, sans-serif',
        cursor: 'pointer'
    },
    serverButton: {
        marginTop: 100,
        paddingTop: 25,
        height: 45,
        borderRadius: 100,
        textTransform: 'uppercase',
        background: '#3399CC',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        opacity: 0.9,
        fontFamily: 'Audiowide, sans-serif',
        cursor: 'pointer'
    },
    serverButtonImage: {
        width: 50,
        height: 40,
        marginRight: 10,
        verticalAlign: 'top',
        marginTop: -8,
    },
    serverButtonText: {
        whiteSpace: 'nowrap',
        display: 'inline-block',
        verticalAlign: 'top',
    },
    cloudButtonIcon: {
        width: 32,
        height: 32,
        marginRight: 5,
        verticalAlign: 'top',
        marginTop: -3,
    },
    cloudButtonText: {
        whiteSpace: 'nowrap',
        display: 'inline-block',
        verticalAlign: 'top',
    },
    darkPart: theme.palette.darkPart,
    lightPart: theme.palette.lightPart,
});

class Intro extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => this.setState({loading: false}), 500);
    }

    onGoToForum() {
        if (this.props.language === 'ru') {
            Utils.openLink('https://forum.iobroker.net/category/28/%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9')
        } else if (this.props.language === 'zh-cn') {
            Utils.openLink('https://bbs.iobroker.cn/')
        } else if (this.props.language === 'de') {
            Utils.openLink('https://forum.iobroker.net/category/4/deutsch')
        }  else if (this.props.language === 'nl') {
            Utils.openLink('https://forum.iobroker.net/category/40/nederlands')
        } else {
            Utils.openLink('https://forum.iobroker.net/')
        }
    }

    renderForum() {
        return (<div className={this.props.classes.forumDiv}>
            <IconForum className={this.props.classes.forumIconMain}/><br/>
            <span className={this.props.classes.forumTitle}>{I18n.t('forum-text')}</span><br/>
            <div className={this.props.classes.forumDivInfo}>
                <div className={this.props.classes.forumDivInfoBox}>
                    <div className={this.props.classes.forumDivInfoCard}>
                        <IconPosts className={this.props.classes.forumDivInfoIcon}/><br/>
                        <span className={this.props.classes.forumDivInfoText}>{I18n.t('Posts')}</span><br/>
                        <span className={this.props.classes.forumDivInfoValue}>245000+</span>
                    </div>
                    <div className={this.props.classes.forumDivInfoCard}>
                        <IconUsers className={this.props.classes.forumDivInfoIcon}/><br/>
                        <span className={this.props.classes.forumDivInfoText}>{I18n.t('Users')}</span><br/>
                        <span className={this.props.classes.forumDivInfoValue}>18400+</span>
                    </div>
                    <div className={this.props.classes.forumDivInfoCard}>
                        <IconThemes className={this.props.classes.forumDivInfoIcon}/><br/>
                        <span className={this.props.classes.forumDivInfoText}>{I18n.t('Themes')}</span><br/>
                        <span className={this.props.classes.forumDivInfoValue}>21000+</span>
                    </div>
                </div>
            </div><br/>
            <Button variant="contained" color="secondary" className={this.props.classes.forumButton} onClick={() => this.onGoToForum()}>
                {I18n.t('Join now')}
            </Button>
        </div>);
    }

    renderCloud() {
        const smallMargin = window.screen.height < 500;

        const long = I18n.getLanguage() === 'ru';

        return (<div style={{
            marginTop: smallMargin ? 10 : undefined,
            width: long ? 330 : 230,
            marginLeft: long ? 'calc(50% - 165px)' : 'calc(50% - 115px)'
        }} className={this.props.classes.cloudButton} onClick={() => window.document.location = 'https://iobroker.pro/accountRemote'}>
            <IconCloud className={ this.props.classes.cloudButtonIcon }/>
            <div className={ this.props.classes.cloudButtonText }>{I18n.t('get cloud')}</div>
        </div>)
    }

    renderServer() {
        const smallMargin = window.screen.height < 500;

        const long = I18n.getLanguage() === 'ru';

        return (<div
                    style={{
                        marginTop: smallMargin ? 10 : undefined,
                        width: long ? 500 : 350,
                        marginLeft: long ? 'calc(50% - 250px)' : 'calc(50% - 175px)'
                    }}
                    className={ this.props.classes.serverButton }
                    onClick={() => {
                        const win = window.open('https://iobroker.com/shop', '_blank');
                        win.focus();
                    }}
        >
            <img className={ this.props.classes.serverButtonImage } src={ServerImg} alt="server"/>
            <div className={ this.props.classes.serverButtonText }>{I18n.t('buy IOB server')}</div>
        </div>)
    }

    // What differs ioBroker from other open source automation platforms?
    //
    // - Comprehensive visualization
    //   vis, mobile.
    //
    // - Multi-hosts distributed system
    //   Install adapters on different computers and connect it in one system.
    //
    // - Very robust architecture
    //   Every adapter runs in own process and do not disturb each others.


    // Configure all only with your web browser

    // Create your rules and scripts with scenes, javascript, blockly or node-red

    // Actual 262 official adapters. Discover all...

    render() {
        let i = 0;

        return [
            (<div className={this.props.classes.content + ' ' + this.props.classes.backImage} key="content">
                <div className={this.props.classes.title}>
                    <div className={this.props.classes.titleDiv}>
                        <div className={this.props.classes.titleMain}>ioBroker</div>
                        <div className={this.props.classes.titleSecond}>Automate your life</div>
                        <div  className={this.props.classes.titleDescription}>Open source automation platform</div>
                    </div>
                </div>
                {/*this.renderCloud()*/}
                {this.renderServer()}
                {!this.props.mobile ? (<LinusShell
                    header={I18n.t('install on linux')}
                    copyTitle={I18n.t('copy to clipboard')}
                    copiedText={I18n.t('copied to clipboard')}
                    typedText="curl -sLf https://iobroker.net/install.sh | bash -"
                />) : null}
            </div>),
            (<SupportUs key="supportus" theme={this.props.theme} mobile={this.props.mobile} language={this.props.language}/>),
            (<ForumInfo key="forum" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language}/>),
            (<About key="about" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language}/>),
            (<Subscribe key="subscribe" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language}/>),
            (<Press key="press" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language}/>),
            (<Adapters key="adapters" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} onNavigate={this.props.onNavigate}/>),
            (<Screenshots key="screenshots" backClass={(i++ % 2) ? this.props.classes.darkPart : this.props.classes.lightPart} theme={this.props.theme} mobile={this.props.mobile} language={this.props.language} onNavigate={this.props.onNavigate}/>),
            (<Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/>),
        ];
    }
}

Intro.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Intro);
