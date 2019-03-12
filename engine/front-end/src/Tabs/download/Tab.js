import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TabGeneric from '../TabGeneric';

const styles = theme => ({

});

class Tab extends TabGeneric {
    constructor(props) {
        super(props);
    }

    render() {
        const data = super.render();
        if (data) {
            return data;
        }

        return (
            <p>Downloads</p>
        );
    }
}

Tab.propTypes = {
    baseURL: PropTypes.string,
    theme: PropTypes.string,
};

export default withStyles(styles)(Tab);
