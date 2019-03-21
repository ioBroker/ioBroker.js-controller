import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import BackImage from '../assets/background-1259196409.jpg';
import LinusShell from '../Components/LinusShell';
import I18n from '../i18n';

const styles = theme => ({
    content: theme.content,
    backImage: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + BackImage + ')'
    },
    title: {
        margin: 'auto',
        width: '100%',
        maxWidth: 650,
        paddingTop: 50,
    },
    titleDiv: {
        background: '#FFFFFFAA',
        borderRadius: 20,
        paddingTop: 20,
        paddingLeft: 40,
        paddingBottom: 20,
        paddingRight: 40,
    },
    titleMain: {
        fontSize: 48,
        fontFamily: 'Audiowide'
    },
    titleSecond: {
        fontSize: 32,
        fontFamily: 'Audiowide'
    },
    titleDescription: {
        fontSize: 24,
    },
});

class Intro extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => this.setState({loading: false}), 500);
    }

    render() {
        return [
            (<div className={this.props.classes.content + ' ' + this.props.classes.backImage} key="content">
                <div className={this.props.classes.title}>
                    <div className={this.props.classes.titleDiv}>
                        <div className={this.props.classes.titleMain}>ioBroker</div>
                        <div className={this.props.classes.titleSecond}>Automate your life</div>
                        <div  className={this.props.classes.titleDescription}>Open source automation platform</div>
                    </div>
                </div>
                {!this.props.mobile ? (<LinusShell
                    header={I18n.t('install on linux')}
                    copyTitle={I18n.t('copy to clipboard')}
                    copiedText={I18n.t('copied to clipboard')}
                    typedText="curl -sL https://iobroker.net/install.sh | bash -"
                />) : null}
            </div>),
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
