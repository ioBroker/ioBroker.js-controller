import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Image1 from '../assets/464030846.jpg';
import Image2 from '../assets/493271902.jpg';

import {FaCogs as IconAutomate} from 'react-icons/fa';
import {FaNodeJs as IconJS} from 'react-icons/fa';
import {FaLaptopCode as IconPlatforms} from 'react-icons/fa';
import {FaThumbsUp as IconSocial} from 'react-icons/fa';

import I18n from '../i18n';

const styles = theme => ({
    mainDiv: {
        background: '#FFFFFF',
        width: 'calc(100% - 60px)',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        fontSize: 32,
        padding: 15,
        fontWeight: 'bold'
    },
    preBox: {
        display: 'inline-block',
        maxWidth: 1100,
        width: '100%'
    },
    box: {
        display: 'inline-block',
        width: '100%',
    },
    image: {
        display: 'inline-block'
    },
    imageMobile: {
        width: '100%',
    },
    imageDesktop: {
        width: 'calc(50% - 30px)',
    },
    img: {
        width: '100%',
    },
    text: {
        textAlign: 'left',
        fontSize: 20,
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '10px 20px'
    },
    textMobile: {
        width: '100%',
    },
    textDesktop: {
        width: 'calc(50% - 30px)',
    },
    textLine: {
        display: 'block',
        paddingBottom: 10,
        position: 'relative',
        marginBottom: 10,
    },
    point: {
        '&::before': {
            content: '"•"',
            paddingRight: 5,
            fontSize: 24,
        }
    },
    icon: {
        fontSize: 48,
        borderRadius: '50%',
        border: '2px solid #3399CC',
        color: '#3399CC',
        //color: '#2dc997',
        padding: 5,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    lineTitle: {
        display: 'inline-block',
        fontWeight: 'bold',
        marginLeft: 80,
        verticalAlign: 'top',
        width: 'calc(100% - 90px)',
        textTransform: 'uppercase',
    },
    lineComment: {
        display: 'inline-block',
        verticalAlign: 'top',
        marginLeft: 80,
    }
});

class About extends Component {
    render() {
        return (<div key="about" className={this.props.classes.mainDiv + ' '  + (this.props.backClass || '')}>
            <div className={this.props.classes.title}>{I18n.t('About ioBroker')}</div>
            <div className={this.props.classes.preBox}>
                <div className={this.props.classes.box}>
                    <div className={this.props.classes.image + ' ' + (this.props.mobile ? this.props.classes.imageMobile : this.props.classes.imageDesktop)}>
                        <img className={this.props.classes.img} src={Image1} alt="Image1"/>
                    </div>
                    <div className={this.props.classes.text + ' ' + (this.props.mobile ? this.props.classes.textMobile : this.props.classes.textDesktop)}>
                        <span className={this.props.classes.textLine + ' ' + this.props.classes.point}>{I18n.t('ioBroker is an IoT platform (Fog computing).')}</span>
                        <span className={this.props.classes.textLine + ' ' + this.props.classes.point}>{I18n.t('The ability to manage your IoT system as one intelligent, robust project.')}</span>
                        <span className={this.props.classes.textLine + ' ' + this.props.classes.point}>{I18n.t('Unique graphics and beautiful interfaces for you.')}</span>
                        <span className={this.props.classes.textLine + ' ' + this.props.classes.point}>{I18n.t('Use one of the best open source products for managing your automation system on premise.')}</span>
                        <span className={this.props.classes.textLine + ' ' + this.props.classes.point}>{I18n.t('Comprehensive smart home support')}</span>
                    </div>
                </div>
                <div className={this.props.classes.box}>
                    <div className={this.props.classes.text + ' ' + (this.props.mobile ? this.props.classes.textMobile : this.props.classes.textDesktop)}>
                        <div className={this.props.classes.textLine}>
                            <IconAutomate className={this.props.classes.icon}/>
                            <div className={this.props.classes.lineTitle}>{I18n.t('Automate everything')}</div>
                            <div className={this.props.classes.lineComment}>{I18n.t('Light, shutter, thermostat, schedule, ...')}</div>
                        </div>
                        <div className={this.props.classes.textLine}>
                            <IconJS className={this.props.classes.icon}/>
                            <div className={this.props.classes.lineTitle}>{I18n.t('Written with Node.js')}</div>
                            <div className={this.props.classes.lineComment}>{I18n.t('Javascript is most popular language')}</div>
                        </div>
                        <div className={this.props.classes.textLine}>
                            <IconPlatforms className={this.props.classes.icon}/>
                            <div className={this.props.classes.lineTitle}>{I18n.t('Runs on')}</div>
                            <div className={this.props.classes.lineComment}>{I18n.t('Windows, Linux, OSX, Raspberry Pi, ARM or PC')}</div>
                        </div>
                        <div className={this.props.classes.textLine}>
                            <IconSocial className={this.props.classes.icon}/>
                            <div className={this.props.classes.lineTitle}>{I18n.t('Social support')}</div>
                            <div className={this.props.classes.lineComment}>{I18n.t('Dynamically growing community.')}</div>
                        </div>
                    </div>
                    <div className={this.props.classes.image + ' ' + (this.props.mobile ? this.props.classes.imageMobile : this.props.classes.imageDesktop)}>
                        <img className={this.props.classes.img} src={Image2} alt="Image2"/>
                    </div>
                </div>
            </div>
        </div>);
    }
}

About.propTypes = {
    language: PropTypes.string,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    backClass: PropTypes.string,
};

export default withStyles(styles)(About);
