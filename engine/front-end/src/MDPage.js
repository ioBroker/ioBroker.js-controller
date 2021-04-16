import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {MdMenu as IconMenuClosed} from 'react-icons/md';
import {MdArrowBack as IconMenuOpened} from 'react-icons/md';

import Markdown from './Markdown';
import Footer from './Footer';
import Adapters from './Pages/Adapters';
import Affiliates from './Components/Affiliates';
import Editor from './Pages/Editor';

const styles = theme => ({
    content: theme.content,
    contentMenuClosed: {
        marginLeft: 20,
    },
    menuOpenCloseButton: {
        position: 'fixed',
        left: 0,
        borderRadius: '0 5px 5px 0',
        top: theme.tabs.height + 2,
        paddingTop: 8,
        cursor: 'pointer',
        zIndex: 0,
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
        this.state = {
            editMode: false
        };
        this.mounted = false;

        this.contentRef = React.createRef();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.mobile !== nextProps.mobile) {
            //setTimeout(() => this.forceUpdate(), 100);
        }
        if (this.props.path !== nextProps.path) {
            this.forceUpdate();
        }
    }

    renderOpenCloseButton() {
        if (!this.props.onMenuOpenClose || this.props.editMode) {
            return null;
        }

        if (this.props.mobile) {
            return <div
                key="closeMenu"
                className={this.props.classes.menuOpenCloseButton + ' ' + this.props.classes.menuOpenCloseButtonMobile}
                style={{left: 0}}
                onClick={() => this.props.onMenuOpenClose()}
            >
                <IconMenuClosed />
            </div>;
        } else {
            return <div key="closeMenu" className={this.props.classes.menuOpenCloseButton + ' ' + (this.props.mobile ? this.props.classes.menuOpenCloseButtonMobile : '')} style={{left: this.props.menuOpened ? this.props.menuWidth + 3 : 0}} onClick={() => this.props.onMenuOpenClose()}>
                {this.props.menuOpened ? <IconMenuOpened /> : <IconMenuClosed />}
            </div>;
        }
    }

    onNavigate(language, tab, page, chapter) {
        if (page) {
            this.contentRef.current.parentNode.scrollTop = 0;
        }

        this.props.onNavigate(language, tab, page, chapter);
    }

    onEditMode(editMode) {
        this.props.onEditMode(editMode);
    }

    render() {
        return [
            this.renderOpenCloseButton(),
            <div key="mdpage" className={this.props.classes.content + ' ' + (!this.props.mobile && !this.props.menuOpened ? this.props.classes.contentMenuClosed : '')} ref={this.contentRef}>
                {this.props.path === 'adapters.md' || this.props.path === 'adapters' ?
                    <Adapters path={this.props.path}
                         language={this.props.language}
                         theme={this.props.theme}
                         contentWidth={this.props.contentWidth}
                         mobile={this.props.mobile}
                         scrollPosition={top => {
                             if (top !== undefined) {
                                 this.contentRef.current.parentNode.scrollTop = top;
                             } else {
                                 return this.contentRef.current.parentNode.scrollTop;
                             }
                         }}
                         onNavigate={(language, tab, page, chapter) => this.onNavigate(language, tab, page, chapter)}
                    />
                    :
                    <Markdown path={this.props.path}
                         editor={Editor}
                         affiliates={Affiliates}
                         language={this.props.language}
                         theme={this.props.theme}
                         mobile={this.props.mobile}
                         editMode={this.props.editMode}
                         onEditMode={this.onEditMode.bind(this)}
                         editEnabled={true}
                         onNavigate={(language, tab, page, chapter) => this.onNavigate(language, tab, page, chapter)}
                    />}
            </div>,
            !this.props.editMode ? <Footer key="footer" theme={this.props.theme} mobile={this.props.mobile} onNavigate={this.props.onNavigate}/> : null
        ];
    }
}

MDPage.propTypes = {
    path: PropTypes.string,
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    onMenuOpenClose: PropTypes.func,
    editMode: PropTypes.bool,
    onEditMode: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    menuOpened: PropTypes.bool,
    contentWidth: PropTypes.number,
    menuWidth: PropTypes.number,
};

export default withStyles(styles)(MDPage);
