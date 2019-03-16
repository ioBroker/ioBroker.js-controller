import {Component} from 'react';

class Rooter extends Component {
    constructor(props) {
        super(props);

        this.onHashChangeBound = this._onHashChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.onHashChangeBound, false);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.onHashChangeBound);
    }

    _onHashChange() {
        if (this.onHashChange) {
            this.onHashChange(this.getLocation());
        }
    }
    onNavigate(tab, doc, chapter) {
        if (tab === null) {
            let location = this.getLocation();
            tab = location.tab;
        }
        // rooter: #TAB/PAGE?chapterOnPage
        // rooter: #TAB?chapterOnPage
        window.location.hash = `#${tab}${doc ? '/' + doc : ''}${chapter ? '?' + chapter : ''}`;
    }

    getLocation() {
        const hash = window.location.hash.substring(1);
        let pos = hash.indexOf('/');
        const result = {
            tab: '',
            page: '',
            chapter: ''
        };
        if (pos !== -1) {
            result.tab = hash.substring(0, pos);
            result.page = hash.substring(pos + 1);
            pos = result.page.indexOf('?');
            if (pos !== -1) {
                result.chapter = result.page.substring(pos + 1);
                result.page = result.page.substring(0, pos);
            }
        } else {
            pos = hash.indexOf('?');
            if (pos !== -1) {
                result.page = hash.substring(pos + 1);
                result.tab = hash.substring(0, pos);
            } else {
                result.tab = hash;
            }
        }

        return result;
    }
}



export default Rooter;
