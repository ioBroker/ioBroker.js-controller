import {createMuiTheme} from '@material-ui/core/styles';

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
                background: '#bac6c9',
                color: '#1b4777',
                height: 54,
                width: '100%',
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
                background: '#bac6c9',
                color: '#1b4777',
                height: 54,
                width: '100%',
            },
        });

    }
}
