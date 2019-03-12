import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TabGeneric from '../TabGeneric';

const styles = theme => ({
    aaa: {
        color: 'red'
    }
});

class Tab extends TabGeneric {
    constructor(props) {
        super(props);
    }

    render

    render() {
        const data = super.render();
        if (data) {
            return data;
        }

        return (
            <p>Hello world</p>
        );
    }
}

Tab.propTypes = {
    baseURL: PropTypes.string,
    theme: PropTypes.string,
};

export default withStyles(styles)(Tab);
