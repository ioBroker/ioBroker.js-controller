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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';

import {MdExpandMore as IconExpandMore, MdHelpOutline as IconQuestion} from 'react-icons/md';

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
        mixBlendMode: 'multiply',
        maxHeight: 128,
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
        fontSize: 10,
    },
    moreDetails: {
        display: 'block'
    }
});

class Affiliates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            explanation: false,
            expanded: (window.localStorage && window.localStorage.getItem('Docs.affExpanded') === 'true') || false,
        };
    }

    renderExplanation() {
        if (!this.state.explanation) {
            return;
        }

        return <Dialog
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
        </Dialog>;
    }

    renderOne(one) {
        return <div key={one.text} className={this.props.classes.mainDiv}>
            {one.date ? <div className={this.props.classes.date}>{I18n.t('Last edit')}: {one.date}</div> : null}
            {one.title ? <div className={this.props.classes.title}>{one.title}</div> : null}
            {one.img ? <div className={this.props.classes.imgDiv}><img className={this.props.classes.img} src={one.img} alt="product"/></div> : null}
            {one.text ? <div className={this.props.classes.text}>{one.text}</div> : null}
            <div className={this.props.classes.buttonDiv}>
                <Button className={this.props.classes.button} onClick={() => Utils.openLink(one.link)} color="secondary">{I18n.t('to Shop')} *</Button>
                <div className={this.props.classes.partnerLink}>{I18n.t('* partner link')}</div>
            </div>
            <IconButton title={I18n.t('Explanation')} onClick={() => this.setState({explanation: true})} className={this.props.classes.question}><IconQuestion/></IconButton>
            {this.renderExplanation()}
        </div>;
    }

    renderExpands() {
        if (this.props.data.length > 1) {
            return <Accordion key="expansion" className={this.props.classes.morePanel}>
                <AccordionSummary className={this.props.classes.summary} classes={{expanded: this.props.classes.moreSummary}} expandIcon={<IconExpandMore />}>{I18n.t('More devices')}</AccordionSummary>
                <AccordionActions className={this.props.classes.moreDetails}>
                    {this.props.data.filter((a, i) => i > 0).map(a => this.renderOne(a))}
                </AccordionActions>
            </Accordion>;
        } else {
            return null;
        }
    }

    render() {
        return [
            this.renderOne(this.props.data[0]),
            this.renderExpands()
        ];
    }
}

Affiliates.propTypes = {
    language: PropTypes.string,
    data: PropTypes.array,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Affiliates);
