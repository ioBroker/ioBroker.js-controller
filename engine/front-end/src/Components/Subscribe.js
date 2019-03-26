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
    }
});

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
            fetch(`https://subscription.iobroker.in/v1/subscriptions?email=${encodeURIComponent(this.state.email)}&lang=${this.props.language}`)
                .then(data => data.json())
                .then(data => {
                    if (data.result === 'added') {
                        this.setState({tooltip: I18n.t('Subscribed!')});
                    } else {
                        this.setState({tooltip: I18n.t('Cannot subscribe: ') + I18n.t(data.result)});
                    }
                })
                .catch(e => {
                    this.setState({tooltip: I18n.t('Cannot subscribe: ') + e.toString()});
                });
        }
    }

    renderSnackbar() {
        return (<Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={!!this.state.tooltip}
            autoHideDuration={6000}
            onClose={() => this.setState({tooltip: ''})}
            message={<span id="message-id">{this.state.tooltip}</span>}
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    className={this.props.classes.close}
                    onClick={() => this.setState({tooltip: ''})}
                >
                    <IconClose />
                </IconButton>,
            ]}
        />)
    }

    render() {
        return (<div key="subscribe" className={this.props.classes.mainDiv + ' '  + (this.props.backClass || '')}>
            <Input
                placeholder={(I18n.t('Newsletter subscribe'))}
                classes={{input: this.state.inputFocused || this.state.email ? this.props.classes.inputRootNotEmpty : this.props.classes.inputRoot }}
                className={this.props.classes.input}
                onFocus={() => this.setState({inputFocused: true})}
                onBlur={() => this.setState({inputFocused: false})}
                onChange={e => this.setState({email: e.target.value})}
            /><br/>
            <Button
                color="primary"
                className={this.props.classes.button + ' ' + (this.state.inputFocused || this.state.email ? this.props.classes.buttonFull : '')}
                disbled={!!this.state.email}
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
