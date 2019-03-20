import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import Router from "../Router";

const styles = theme => ({
    content: theme.content
});

class Downloads extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => this.setState({loading: false}), 500);
    }

    load() {
        const d = new Date();

        fetch(`http://iobroker.live/images/list.js?t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}`)
            .then(res => res.json())
            .then(content => {
                this.setState({content}, () => {
                    let location = Router.getLocation();
                    this.page = location.page;
                    if (location.page) {
                        this.loadBlog(location.page);
                    }
                });
            });
    }



    render() {
        return [
            (<iframe style={{width: '100%', height: '100%', overflow: 'hidden', border: 0}} className={this.props.classes.content} key="content" src="http://iobroker.live/images/.index.html"/>),
            (<Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/>),
        ];
    }
}

Downloads.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Downloads);
