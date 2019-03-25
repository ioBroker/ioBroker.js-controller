import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import {MdContentCopy as IconCopy} from 'react-icons/md';
import {FaUsers as IconForum} from 'react-icons/fa'
import {FaAddressCard as IconUsers} from 'react-icons/fa'
import {FaComments as IconPosts} from 'react-icons/fa'
import {FaComment as IconThemes} from 'react-icons/fa'

import Footer from '../Footer';
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
        height: 'calc(100vh - 50px)'
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

    forumDiv: {
        background: '#e4e4e4',
        width: 'calc(100% - 60px)',
        textAlign: 'center',
        padding: 30,
    },
    forumTitle: {
        fontSize: 20,
    },
    forumDivInfo: {
        width: '100%',
        maxWidth: 600,
        display: 'inline-block',
    },
    forumDivInfoBox: {
        width: '100%',
        display: 'flex',
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forumDivInfoCard: {
        width: 200,
        flex: 1,
    },
    forumIconMain: {
        display: 'inline-block',
        width: 64,
        height: 64,
    },
    forumDivInfoIcon: {
        width: 32,
        height: 32,
    },
    forumDivInfoText: {
        fontSize: 20
    },
    forumDivInfoValue: {
        fontSize: 32
    },
    forumButton: {
        display: 'inline-block',
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 20,
    },
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

    renderAbout() {
        return (<div className={this.props.classes.aboutHeader}>
            <div className={this.props.classes.aboutHeader}>{I18n.t('About ioBroker')}</div>
            <div className={this.props.classes.aboutBody}>
                <div className={this.props.classes.aboutPicture1} />
                <div className={this.props.classes.aboutText1}>
                    <span className={this.props.classes.aboutTextLine}>- {I18n.t('ioBroker is an IoT platform.')}</span>
                    <span className={this.props.classes.aboutTextLine}>- {I18n.t('The ability to manage your IoT system as one intelligent, robust project.')}</span>
                    <span className={this.props.classes.aboutTextLine}>- {I18n.t('Unique graphics and beautiful interfaces for you.')}</span>
                    <span className={this.props.classes.aboutTextLine}>- {I18n.t('Use one of the best open source products for managing your automation system on premise.')}</span>
                </div>
            </div>
            <div className={this.props.classes.aboutBody}>
                <div className={this.props.classes.aboutText2}>
                    <span className={this.props.classes.aboutTextLine}>- {I18n.t('Automate everything')}</span>
                    <span className={this.props.classes.aboutTextLine}>- {I18n.t('JavaScript node.js')}</span>
                    <span className={this.props.classes.aboutTextLine}>- {I18n.t('Windows, Linux, OSX, Raspberry Pi, ARM or PC')}</span>
                    <span className={this.props.classes.aboutTextLine}>- {I18n.t('Dynamically growing community.')}</span>
                </div>
                <div className={this.props.classes.aboutPicture2} />
            </div>
        </div>);
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
        return [
            (<div className={this.props.classes.content + ' ' + this.props.classes.backImage} key="content">
                <div className={this.props.classes.title}>
                    <div className={this.props.classes.titleDiv}>
                        <div className={this.props.classes.titleMain}>ioBroker</div>
                        <div className={this.props.classes.titleSecond}>Automate your life</div>
                        <div  className={this.props.classes.titleDescription}>Open source automation platform</div>
                    </div>
                </div>
                {!this.props.mobile ? (<LinusShell
                    header={I18n.t('install on linux')}
                    copyTitle={I18n.t('copy to clipboard')}
                    copiedText={I18n.t('copied to clipboard')}
                    typedText="curl -sL https://iobroker.net/install.sh | bash -"
                />) : null}
            </div>),
            this.renderForum(),
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
