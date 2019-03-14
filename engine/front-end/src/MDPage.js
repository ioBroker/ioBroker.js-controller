import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

import MD from './Markdown';
import Footer from './Footer';

const styles = theme => ({
    content: theme.content
});

class Imprint extends Component {
    render() {
        return [
            (<div className={this.props.classes.content}>
                <MD path={this.props.path}
                    language={this.props.language}
                    theme={this.props.theme}
                    mobile={this.props.mobile}
                    onNavigate={this.props.onNavigate}
                />
            </div>),
            (<Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/>)
        ];
    }
}


Imprint.propTypes = {
    path: PropTypes.string,
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Imprint);
