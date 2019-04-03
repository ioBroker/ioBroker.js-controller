import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';


import I18n from '../i18n';

const styles = theme => ({
    content: theme.content,
    iframe: {
        border: 0,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    paper: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: 10,
    },
    paperMap: {
        width: 'calc(100% - 20px)',
        height: 'calc(100% - 20px)',
    }
});

class Statistics extends Component {

    renderMap() {
        return (<Paper className={this.props.classes.paper + ' ' + this.props.classes.paperMap}>
            <iframe className={this.props.classes.iframe} src={'http://download.iobroker.net/map.html'}/>
        </Paper>);
    }

    render() {
        return [
            this.renderMap(),
        ];
    }
}

Statistics.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Statistics);
