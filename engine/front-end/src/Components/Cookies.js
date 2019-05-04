import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import I18n from '../i18n';
import Utils from '../Utils';

const styles = theme => ({
    mainDiv: {
        position: 'absolute',
        bottom: 16,
        left: 16,
//        alignContent: 'center',
//        alignItems: 'center',
        background: '#3c4043',
        borderRadius: 2,
        color: '#fff',
//        display: 'flex',
        boxShadow: '0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)',
//        boxOrient: 'horizontal',
//        boxDirection: 'normal',
//        flexDirection: 'row',
        fontSize: 14,
        minHeight: 48,
        padding: 0,
        zIndex: 2
    },
    mainDivMobile: {
        width: 'calc(100% - 32px)'
    },
    text: {
//        flexGrow: 1,
//        flexShrink: 1,
        lineHeight: 'normal',
        overflow: 'hidden',
        padding: 24,
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        display: 'inline-block',
    },
    buttonMore: {
        color: theme.palette.secondary.main,
        lineHeight: 'normal',
        overflow: 'hidden',
        padding: 24,
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        display: 'inline-block',
        cursor: 'pointer',
    },
    buttonOk: {
        lineHeight: 'normal',
        verticalAlign: 'top',
        marginLeft: 18,
        display: 'inline-block',
        marginTop: 18,
    },
    buttonOkDesktop: {
        marginRight: 18,
    }

});

class Cookies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmed: window.localStorage ? window.localStorage.getItem('Docs.cookies') === 'true' : false
        };
    }

    onConfirm() {
        window.localStorage && window.localStorage.setItem('Docs.cookies', 'true');
        this.setState({confirmed: true});
    }

    render() {
        if (this.state.confirmed) return null;

        const classes = this.props.classes;
        return (
            <div className={classes.mainDiv + ' ' + (this.props.mobile ? classes.mainDivMobile : '')}>
                <div className={classes.text}>{I18n.t('cookies_text')}</div>
                <div className={classes.buttonMore} onClick={() => this.props.onNavigate(null, 'privacy')}>{I18n.t('Privacy policy')}</div>
                <Button variant="contained" className={classes.buttonOk + ' ' + (this.props.mobile ? '' : classes.buttonOkDesktop)} onClick={() => this.onConfirm()}>{I18n.t('Got it!')}</Button>
            </div>);
    }
}

Cookies.propTypes = {
    language: PropTypes.string,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    onNavigate: PropTypes.func,
    contentWidth: PropTypes.number
};

export default withStyles(styles)(Cookies);
