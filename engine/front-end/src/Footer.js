import React from "react";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';

import I18n from './i18n';

import LogoIoBroker from './assets/iobroker-logo-small.png';
import {FaGithubSquare as IconGithub} from 'react-icons/fa';
import {FaFacebook as IconFacebook} from 'react-icons/fa';
import Utils from './Utils';


const styles = theme => ({
    footer: {
        background: theme.palette.primary.light,
        textAlign: 'center',
        padding: 20
    },
    footerIconDiv: {
        width: 54,
        height: 54,
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative'
    },
    footerIcon: {
        width: 54,
        height: 54,
        color: '#b1b1b1',
    },
    footerCopyright: {
        color: '#b1b1b1',
    },
    footerLogo: {
        width: 72,
        filter: 'grayscale(100%) invert(1)',
    },
    footerIconText: {
        position: 'absolute',
        bottom: 3,
        width: '100%',
        textAlign: 'center',
        fontSize: 8
    },
    footerLink: {
        display: 'inline-block',
        cursor: 'pointer',
        color: '#b1b1b1',
        paddingRight: 10
    }
});

class Loader extends React.Component {
    render() {
        return (<div className={this.props.classes.footer}>
            <div title="Repository" className={this.props.classes.footerIconDiv}>
                <IconGithub className={this.props.classes.footerIcon}
                        onClick={() => Utils.openLink('https://github.com/ioBroker')}
                />
            </div>
            <div title="Community adapters repository" className={this.props.classes.footerIconDiv}>
                <IconGithub className={this.props.classes.footerIcon}
                        onClick={() => Utils.openLink('https://github.com/iobroker-community-adapters')}
                />
                <div className={this.props.classes.footerIconText}>Community</div>
            </div>
            <div title="Unofficial Facebook group" className={this.props.classes.footerIconDiv}>
                <IconFacebook className={this.props.classes.footerIcon}
                            onClick={() => Utils.openLink('https://www.facebook.com/groups/440499112958264')}
                />
            </div>
            <br/>

            <div className={this.props.classes.footerLink} onClick={() => this.props.onNavigate(null, 'imprint')}>{I18n.t('Imprint')}</div>
            <div className={this.props.classes.footerLink} style={{cursor: 'inherit'}}> | </div>
            <div className={this.props.classes.footerLink} onClick={() => this.props.onNavigate(null, 'privacy')}>{I18n.t('Privacy policy')}</div>

            <p className={this.props.classes.footerCopyright}>Copyright © 2014-2019 by the ioBroker Community and the ioBroker GmbH.</p>
            <img src={LogoIoBroker} className={this.props.classes.footerLogo} alt="logo"/>
        </div>);
    }
}

Loader.propTypes = {
    onNavigate: PropTypes.func,
    language: PropTypes.string,
    mobile: PropTypes.bool,
    theme: PropTypes.string
};

export default withStyles(styles)(Loader);
