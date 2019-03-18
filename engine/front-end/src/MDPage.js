import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";

import {MdMenu as IconMenuClosed} from 'react-icons/md';
import {MdArrowBack as IconMenuOpened} from 'react-icons/md';

import MD from './Markdown';
import Footer from './Footer';
import Adapters from "./Pages/Adapters";

const styles = theme => ({
    content: theme.content,
    menuOpenCloseButton: {
        position: 'fixed',
        left: 0,
        borderRadius: '0 5px 5px 0',
        top: theme.tabs.height + 2,
        paddingTop: 8,
        cursor: 'pointer',
        zIndex: 1,
        height: 25,
        width: 18,
        background: theme.palette.secondary.light,
        color: theme.palette.primary.main,
        paddingLeft: 1,
        '&:hover': {
            color: 'white'
        }
    },
    menuOpenCloseButtonMobile: {
        width: 22,
        paddingLeft: 4
    }
});

class MDPage extends Component {
    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.mobile !== nextProps.mobile) {
            //setTimeout(() => this.forceUpdate(), 100);
        }
    }

    renderOpenCloseButton() {
        if (!this.props.onMenuOpenClose) return;
        if (this.props.mobile) {
            return (<div key="closeMenu"
                         className={this.props.classes.menuOpenCloseButton + ' ' + this.props.classes.menuOpenCloseButtonMobile}
                         style={{left: 0}}
                         onClick={() => this.props.onMenuOpenClose()}>
                <IconMenuClosed />
            </div>);
        } else {
            return (<div key="closeMenu" className={this.props.classes.menuOpenCloseButton + ' ' + (this.props.mobile ? this.props.classes.menuOpenCloseButtonMobile : '')} style={{left: this.props.menuOpened ? this.props.contentWidth + 3 : 0}} onClick={() => this.props.onMenuOpenClose()}>
                {this.props.menuOpened ? (<IconMenuOpened />) : (<IconMenuClosed />)}
            </div>);
        }
    }

    onNavigate(language, tab, page, chapter) {
        if (page) {
            this.contentRef.current.parentNode.scrollTop = 0;
        }

        this.props.onNavigate(language, tab, page, chapter);
    }

    render() {
        return [
            this.renderOpenCloseButton(),
            (<div className={this.props.classes.content} ref={this.contentRef}>
                {this.props.path === 'adapters.md' ?
                    (<Adapters path={this.props.path}
                         language={this.props.language}
                         theme={this.props.theme}
                         mobile={this.props.mobile}
                         onNavigate={(language, tab, page, chapter) => this.onNavigate(language, tab, page, chapter)}
                    />)
                    :
                    (<MD path={this.props.path}
                        language={this.props.language}
                        theme={this.props.theme}
                        mobile={this.props.mobile}
                        onNavigate={(language, tab, page, chapter) => this.onNavigate(language, tab, page, chapter)}
                    />)}
            </div>),
            (<Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/>)
        ];
    }
}


MDPage.propTypes = {
    path: PropTypes.string,
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    onMenuOpenClose: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    menuOpened: PropTypes.bool,
    contentWidth: PropTypes.number,
};

export default withStyles(styles)(MDPage);
