import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    content: theme.content
});

class Imprint extends Component {
    render() {
        return (<div className={this.props.classes.content}>
            <h1>{I18n.t('Imprint')}</h1>

        </div>);
    }
}

TabGeneric.propTypes = {
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Imprint);
