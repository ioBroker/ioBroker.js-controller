import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {MdHelpOutline as IconQuestion} from 'react-icons/md';

import I18n from '../i18n';
import Utils from '../Utils';

const styles = theme => ({
    mainDiv: {
        marginTop: 10,
        marginBottom: 10,
        background: '#fdfbf4',
        width: 'calc(100% - 20px)',
        border: '1px solid #d5a91b',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    title: {
        color: theme.palette.primary.light,
        fontSize: 24,
        fontWeight: 'bold'
    },
    imgDiv: {

    },
    img: {
        'mix-blend-mode': 'multiply',
    },
    text: {
        flexGrow: 1,
        padding: 10,
    },
    buttonDiv: {
        textAlign: 'center'
    },
    button: {
        width: 150,
        background: '#d8dedc'
    },
    partnerLink: {
        fontSize: 10
    },
    question: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.7,
    },
    date: {
        position: 'absolute',
        top: 2,
        right: 2,
        opacity: 0.7,
        fontSize: 12,
    }
});

class Affiliate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            explanation: false
        };
    }

    renderExplanation() {
        if (!this.state.explanation) return;

        return (<Dialog
            open={true}
            onClose={() => this.setState({explanation: false})}
        >
            <DialogTitle id="alert-dialog-title">{I18n.t('Why this link is here?')}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {I18n.t('Partner explanation')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.setState({explanation: false})} color="primary" autoFocus>Ok</Button>
            </DialogActions>
        </Dialog>)
    }

    render() {
        return (<div key="Affiliate" className={this.props.classes.mainDiv}>
            {this.props.data.date ? (<div className={this.props.classes.date}>{I18n.t('Last edit')}: {this.props.data.date}</div>) : null}
            {this.props.data.title ? (<div className={this.props.classes.title}>{this.props.data.title}</div>) : null}
            {this.props.data.img ? (<div className={this.props.classes.imgDiv}><img  className={this.props.classes.img} src={this.props.data.img} alt="picture"/></div>) : null}
            {this.props.data.text ? (<div className={this.props.classes.text}>{this.props.data.text}</div>) : null}
            <div className={this.props.classes.buttonDiv}>
                <Button className={this.props.classes.button} onClick={() => Utils.openLink(this.props.data.link)} color="secondary">{I18n.t('to Shop')} *</Button>
                <div className={this.props.classes.partnerLink}>{I18n.t('* partner link')}</div>
            </div>
            <IconButton title={I18n.t('Explanation')} onClick={() => this.setState({explanation: true})} className={this.props.classes.question}><IconQuestion/></IconButton>
            {this.renderExplanation()}
        </div>);
    }
}

Affiliate.propTypes = {
    language: PropTypes.string,
    data: PropTypes.object,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Affiliate);
