import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Carousel} from 'react-responsive-carousel';

import Screen1 from '../assets/screens/screen1.jpg';
import Screen2 from '../assets/screens/screen2.jpg';
import Screen3 from '../assets/screens/screen3.jpg';
import Screen4 from '../assets/screens/screen4.jpg';
import Screen5 from '../assets/screens/screen5.jpg';
import Screen6 from '../assets/screens/screen6.jpg';
import Screen7 from '../assets/screens/screen7.jpg';
import Screen8 from '../assets/screens/screen8.jpg';
import Screen9 from '../assets/screens/screen9.jpg';
import Screen10 from '../assets/screens/screen10.jpg';
import Screen11 from '../assets/screens/screen11.jpg';
import Screen12 from '../assets/screens/screen12.jpg';
import Screen13 from '../assets/screens/screen13.jpg';
import Screen14 from '../assets/screens/screen14.jpg';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import I18n from '../i18n';

const Images = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6, Screen7, Screen8, Screen9, Screen10, Screen11, Screen12, Screen13, Screen14]

const styles = theme => ({
    mainDiv: {
        background: '#FFFFFF',
        width: 'calc(100% - 40px)',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    carousel: {
        maxWidth: 1024,
        textAlign: 'center',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        fontSize: 32,
        padding: 15,
        fontWeight: 'bold'
    },
});

class Screenshots extends Component {
    render() {
        // https://reactjsexample.com/lightweight-and-fully-customizable-carousel-component-for-react/
        return (<div key="screenshots" className={this.props.classes.mainDiv + ' ' + (this.props.backClass || '')}>
            <div className={this.props.classes.title}>{I18n.t('Screenshots')}</div>
            <Carousel
                className={this.props.classes.carousel}
                autoPlay
                showArrows={true}
                infiniteLoop={true}
                useKeyboardArrows={true}
                dynamicHeight={true}
                interval={10000}
                centerMode={false}
                emulateTouch={true}>
                {Images.map((img, i) => (<div key={'img' + i}><img src={img} alt="Screenshot"/></div>))}
            </Carousel>
        </div>);
    }
}

Screenshots.propTypes = {
    language: PropTypes.string,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    backClass: PropTypes.string,
};

export default withStyles(styles)(Screenshots);
