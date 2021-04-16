import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/*
Copyright 2019 Robin Selmer
https://codepen.io/robinselmer/pen/vJjbOZ
*/

import I18n from '../i18n';

const styles = theme => ({
    content: Object.assign({background: 'black', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}, theme.content),
    root: {
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        backgroundColor: '#000000',
        backgroundImage: 'radial-gradient(#104254 , #05181c)',
        fontFamily: "'Inconsolata', Helvetica, sans-serif",
        fontSize: '1.5rem',
        color: 'rgba(128, 175, 255, 0.8)',
        textShadow:
            `0 0 1ex rgba(51, 70, 255, 1),
        0 0 2px rgba(255, 255, 255, 0.8)`
    },
    overlay: {
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        background:
            `repeating-linear-gradient(
                180deg,
            rgba(0, 0, 0, 0) 0,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0) 100%)`,
        backgroundSize: 'auto 4px',
        zIndex: 99,
        '&::before': {
            content: '""',
            pointerEvents: 'none',
            position: 'absolute',
            display: 'block',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(
                0deg,
                transparent 0%,
                rgba(32, 50, 128, 0.2) 2%,
                rgba(32, 50, 128, 0.8) 3%,
                rgba(32, 50, 128, 0.2) 3%,
                transparent 100%)`,
            backgroundRepeat: 'no-repeat',
            animation: 'scan 7.5s linear 0s infinite',
        }
    },

    terminal: {
        boxSizing: 'inherit',
        position: 'absolute',
        height: '100%',
        width: 'calc(100% - 8rem)',
        maxWidth: '100%',
        padding: '4rem',
        textTransform: 'uppercase',
    },
    output: {
        color: 'rgba(128, 175, 255, 0.8)',
        textShadow: `
        0 0 1px rgba(51, 70, 255, 0.4),
            0 0 2px rgba(255, 255, 255, 0.8)`,
        '&::before': {
            content: '"> "'
        }
    },
    errorCode: {
        color: 'white'
    }
});

class Page404 extends Component {
    render() {
        return <div className={this.props.classes.content}>
            <div className={this.props.classes.root}>
                <div className={this.props.classes.overlay}>
                    <div className={this.props.classes.terminal}>
                        <h1>Error<span className={this.props.classes.errorCode}>404</span></h1>
                        <p className={this.props.classes.output}>
                            {I18n.t('The page you are looking for')}</p>
                        <p className={this.props.classes.output}>{I18n.t('Good luck')}</p>
                    </div>
                </div>
            </div>
        </div>;
    }
}

Page404.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Page404);
