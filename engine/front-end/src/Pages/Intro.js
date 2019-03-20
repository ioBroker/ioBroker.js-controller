import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import Typed from 'react-typed';

const styles = theme => ({
    aaa: {
        color: 'red'
    },
    content: theme.content
});

class Intro extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => this.setState({loading: false}), 500);
    }

    renderCallToAction() {
        return (<div className={this.props.classes.linuxShell}>
            <div className={this.props.classes.linuxShellHeader}></div>
            <div className={this.props.classes.linuxShellWindow}>
                <Typed
                    strings={['curl -sL https://iobroker.net/install.sh | bash -']}
                    typeSpeed={40}
                />
            </div>
        </div>);
    }

    render() {
        return [
            (<div className={this.props.classes.content} key="content">Hello world1</div>),
            this.renderCallToAction(),
            (<Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/>),
        ];
    }
}

Intro.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool
};

export default withStyles(styles)(Intro);
