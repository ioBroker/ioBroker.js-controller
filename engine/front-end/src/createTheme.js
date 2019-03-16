import {createMuiTheme} from '@material-ui/core/styles';

const APP_BAR_HEIGHT = 54;

export default type => {
    if (type === 'dark') {
        return createMuiTheme({
            palette: {
                type: type,
                primary: {
                    light: '#5F6975',
                    main: '#2978d0',
                    dark: '#053C72',
                    contrastText: '#CСС',
                },
                secondary: {
                    light: '#7EB2CC',
                    main: '#3399CC',
                    dark: '#068ACC',
                    contrastText: '#ee0000',
                }
            },
            tabs: {
                background: '#e4e4e4',
                color: '#1b4777',
                height: APP_BAR_HEIGHT,
                width: '100%',
            },
            content: {
                minHeight: '100%',
                color: '#2c3e50'
            },
        });
    } else {
        return createMuiTheme({
            palette: {
                type: type,
                primary: {
                    light: '#5F6975',
                    main: '#164477',
                    dark: '#053C72',
                    contrastText: '#FFF',
                },
                secondary: {
                    light: '#7EB2CC',
                    main: '#3399CC',
                    dark: '#068ACC',
                    contrastText: '#ee0000',
                }
            },
            tabs: {
                background: '#e4e4e4',
                color: '#1b4777',
                height: APP_BAR_HEIGHT,
                width: '100%',
            },
            content: {
                minHeight: '100%',
                color: '#2c3e50'
            },
        });

    }
}
