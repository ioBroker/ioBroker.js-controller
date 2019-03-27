import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';

import {FaMailBulk as IconEmail} from 'react-icons/fa';

import I18n from '../i18n';
import Utils from '../Utils';
import {MdClose as IconClose} from "react-icons/md";

const styles = theme => ({
    mainDiv: {
        background: '#FFFFFF',
        width: 'calc(100% - 60px)',
        textAlign: 'center',
        padding: 30,
    },
    input: {
        display: 'inline-block',
        width: 200,
        marginBottom: 5,
    },
    inputRoot: {
        textAlign: 'center'
    },
    inputRootNotEmpty: {
        textAlign: 'left'
    },
    button: {
        display: 'inline-block',
        width: 0,
        transition: 'width 1s, color 1s, opacity 1s',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        background: '#5F6975',
        color: '#5F6975',
        opacity: 0,
    },
    buttonFull: {
        width: 200,
        color: '#FFFFFF',
        opacity: 1,
    },
    tooltipError: {
        color: '#881d0d !important'
    }
});

const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Subscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            inputFocused: '',
            tooltip: ''
        };
    }

    onSubscribe() {
        if (this.state.email) {
            if (regEmail.test(this.state.email.toLowerCase())) {
                const url = `https://emails.iobroker.in/v1/subscriptions?email=${encodeURIComponent(this.state.email)}&lang=${this.props.language}`;
                fetch(url)
                    .then(data => data.json())
                    .then(data => {
                        if (data.result === 'added') {
                            this.setState({tooltip: I18n.t('Subscribed!')});
                        } else {
                            this.setState({tooltip: I18n.t('Cannot subscribe: ') + I18n.t(data.result), errorTooltip: true});
                        }
                    })
                    .catch(e => {
                        this.setState({tooltip: I18n.t('Cannot subscribe: ') + e.toString(), errorTooltip: true});
                    });
            } else {
                this.setState({tooltip: I18n.t('invalid email'), errorTooltip: true});
            }
        }
    }

    renderSnackbar() {
        return (<Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={!!this.state.tooltip}
            autoHideDuration={6000}
            onClose={() => this.setState({tooltip: '', errorTooltip: false})}
            message={<span id="message-id">{this.state.tooltip}</span>}
            classes={{root: this.state.errorTooltip ? this.props.classes.tooltipError: undefined}}
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    className={this.props.classes.close}
                    onClick={() => this.setState({tooltip: '', errorTooltip: false})}
                >
                    <IconClose />
                </IconButton>,
            ]}
        />);
    }

    render() {
        const error = this.state.email && !regEmail.test(this.state.email.toLowerCase());
        return (<div key="subscribe" className={this.props.classes.mainDiv + ' '  + (this.props.backClass || '')}>
            <Input
                error={error}
                placeholder={(I18n.t('Newsletter subscribe'))}
                classes={{input: this.state.inputFocused || this.state.email ? this.props.classes.inputRootNotEmpty : this.props.classes.inputRoot }}
                className={this.props.classes.input}
                onKeyUp={e => e.keyCode === 13 && this.onSubscribe()}
                onFocus={() => this.setState({inputFocused: true})}
                onBlur={() => this.setState({inputFocused: false})}
                onChange={e => this.setState({email: e.target.value})}
            /><br/>
            <Button
                color="primary"
                className={this.props.classes.button + ' ' + (this.state.inputFocused || this.state.email ? this.props.classes.buttonFull : '')}
                disabled={error || !this.state.email}
                onClick={() => this.onSubscribe()}>
                <IconEmail fontSize="small" style={{marginRight: 5}}/>
                {this.state.inputFocused ? I18n.t('Subscribe') : ''}
            </Button>
            {this.renderSnackbar()}
        </div>);
    }
}

Subscribe.propTypes = {
    language: PropTypes.string,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    backClass: PropTypes.string,
};

export default withStyles(styles)(Subscribe);
