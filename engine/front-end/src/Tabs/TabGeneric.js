import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loader from '../Components/Loader';

class TabGeneric extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    render() {
        if (this.state.loading) {
            return (<Loader theme={this.props.theme}/>);
        }
        return null;
    }
}

TabGeneric.propTypes = {
    onNavigate: PropTypes.func,
    baseURL: PropTypes.string,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default TabGeneric;
