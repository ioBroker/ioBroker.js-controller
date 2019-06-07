import {Component} from 'react';

class Router extends Component {
    constructor(props) {
        super(props);

        this.onHashChangeBound = this._onHashChange.bind(this);
    }

    static detectLanguage() {
        let lang = window.navigator.language || window.navigator.userLanguage;
        lang = lang.toLowerCase().substring(0, 2);
        if (lang === 'zh') {
            lang = 'zh-cn';
        }
        return lang;
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.onHashChangeBound, false);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onHashChangeBound);
    }

    _onHashChange() {
        if (this.onHashChange) {
            this.onHashChange(Router.getLocation());
        }
    }

    onNavigate(language, tab, page, chapter) {
        if (tab === null || language === null || page === null) {
            let location = Router.getLocation();
            if (tab === null) {
                tab      = tab || location.tab;
            }
            if (page === null) {
                page     = page || location.page;
            }
            language = language || location.language;
        }
        // rooter: #LN/TAB/PAGE?chapterOnPage
        // rooter: #LN/TAB?chapterOnPage
        // rooter: #?chapterOnPage
        window.location.hash = `#${language}/${tab}${page ? '/' + page : ''}${chapter ? '?' + chapter : ''}`;
    }

    static getLocation() {
        let hash = window.location.hash.substring(1);
        let pos = hash.indexOf('/');
        const result = {
            language: '',
            tab: '',
            page: '',
            chapter: ''
        };

        if (pos !== -1) {
            result.language = hash.substring(0, pos);
            result.tab = hash.substring(pos + 1);
            pos = result.tab.indexOf('/');
            if (pos !== -1) {
                result.page = result.tab.substring(pos + 1);
                result.tab = result.tab.substring(0, pos);

                pos = result.page.indexOf('?');

                if (pos !== -1) {
                    result.chapter = result.page.substring(pos + 1);
                    result.page = result.page.substring(0, pos);
                }
            }
        } else {
            pos = hash.indexOf('?');
            if (pos !== -1) {
                result.language = hash.substring(pos + 1);
                result.chapter = hash.substring(0, pos);
            } else {
                result.language = hash;
            }
        }

        return result;
    }
}



export default Router;
