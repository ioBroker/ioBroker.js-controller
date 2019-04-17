import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import I18n from '../i18n';
import Utils from '../Utils';
import PieStats from '../Components/PieStats';

const styles = theme => ({
    dialogContent: {
        textAlign: 'center',
    },
    dialogContentMobile: {
        padding: 5
    },
    paper: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: 10,
    },
    paperPie: {
        width: 400,
        height: 380,
        padding: 10,
    },
    paperTable: {
        height: 400,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    paperMobile: {
        width: 'calc(100% - 40px) !important',
        margin: '5px !important',
        padding: '3px !important',
    },
    tableRoot: {
        height: 'calc(100% - 55px)',
        width: '100%',
        overflow: 'hidden',
    },
    table: {

    },
    tableLogo: {
        height: 'auto',
        width: 'auto',
        maxWidth: 32,
    },
    tableRow:{
        cursor: 'pointer',
        height: 24,
        '&:hover': {
            background: '#DDDDDD'
        }
    },
    tableCell:{
        padding: '0 5px',
        minWidth: 0,
    },
    tableColumnVersion: {
        fontWeight: 'bold',
    },
    tableColumnCount: {

    },
    tableColumnPercent: {

    },
});
const MAX_MOBILE_WIDTH = 1000;

class AdapterStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderBy: window.localStorage ? window.localStorage.getItem('Docs.asOrderBy') || 'Count' : 'Count',
            order: window.localStorage ? window.localStorage.getItem('Docs.asOrder') || 'desc' : 'desc',
            mobile: this.props.mobile || this.props.width < MAX_MOBILE_WIDTH,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.mobile !== (nextProps.mobile || nextProps.width < MAX_MOBILE_WIDTH)) {
            this.setState({mobile: (nextProps.mobile || nextProps.width < MAX_MOBILE_WIDTH)});
        }
    }

    sortHandler(col) {
        if (this.state.orderBy === col) {
            const order = this.state.order === 'asc' ? 'desc' : 'asc';
            this.setState({order});
            window.localStorage && window.localStorage.setItem('Docs.asOrder', order);
        } else {
            const order = 'desc';
            window.localStorage && window.localStorage.setItem('Docs.asOrder', order);
            window.localStorage && window.localStorage.setItem('Docs.asOrderBy', col);
            this.setState({order, orderBy: col});
        }
    }

    renderHeaderCell(className, type, align) {
        return (<TableCell
            className={this.props.classes.tableCell + ' ' + className}
            align={align}
            sortDirection={this.state.orderBy === type ? this.state.order : false}
        >
            <Tooltip
                title={I18n.t('Sort')}
                placement="bottom-end"
                enterDelay={300}
            >
                <TableSortLabel
                    active={this.state.orderBy === type}
                    direction={this.state.order}
                    onClick={() => this.sortHandler(type)}
                >{I18n.t(type)}</TableSortLabel>
            </Tooltip>
        </TableCell>);
    }

    renderTable() {
        let versions;
        const stats = this.props.statistics.versions[this.props.adapter];

        if (this.state.orderBy === 'Version') {
            if (this.state.order === 'asc') {
                versions = Object.keys(stats).sort((a, b) => Utils.compareStrings(a, b));
            } else {
                versions = Object.keys(stats).sort((a, b) => Utils.compareStrings(a, b, true));
            }
        } else {
            versions = Object.keys(stats);
            if (this.state.order === 'asc') {
                versions.sort((a, b) => stats[a] - stats[b]);
            } else {
                versions.sort((a, b) => stats[b] - stats[a]);
            }
        }
        let sum = 0;
        versions.forEach(v => sum += stats[v]);

        return (<Table key="table" padding="dense" className={this.props.classes.table}>
            <TableHead>
                <TableRow>
                    {this.renderHeaderCell(this.props.classes.tableColumnVersion, 'Version', 'right')}
                    {this.renderHeaderCell(this.props.classes.tableColumnCount, 'Count', 'left')}
                    <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnPercent} align="left">%</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {versions.map(v => (
                    <TableRow className={this.props.classes.tableRow}>
                        <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnVersion}>{v}</TableCell>
                        <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnCount}>{stats[v]}</TableCell>
                        <TableCell className={this.props.classes.tableCell + ' ' + this.props.classes.tableColumnPercent}>{Math.round((stats[v] / sum) * 10000) / 100}%</TableCell>
                    </TableRow>))}
            </TableBody>
        </Table>);
    }

    renderContent() {
        const { classes } = this.props;
        return [
            (<h2>{I18n.t('Total count: ')} {this.props.statistics.adapters[this.props.adapter]}</h2>),
            (<Paper className={classes.paper + ' ' + classes.paperPie + ' ' + (this.state.mobile ? this.props.classes.paperMobile : '')}>
                <PieStats
                    data={this.props.statistics.versions[this.props.adapter]}
                    size={'45%'}
                    height={400}
                    hideNumbersInLegend={true}
                    startFromPercent={3}
                    series={I18n.t('Count')}
                />
            </Paper>),
            (<Paper className={classes.paper + ' ' + classes.paperTable + ' ' + (this.state.mobile ? this.props.classes.paperMobile : '')}>{this.renderTable()}</Paper>)
        ]
    }

    render() {
        return (
            <Dialog
                className={this.props.classes.dialog}
                fullWidth={this.state.mobile}
                maxWidth="xl"
                open={true}
                onClose={() => this.props.onClose()}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">{I18n.t('Adapter %s statistics', this.props.adapter)}</DialogTitle>
                <DialogContent className={this.props.classes.dialogContent + ' ' + (this.state.mobile ? this.props.classes.dialogContentMobile : '')}>
                    {
                        !this.props.statistics ||
                        !this.props.statistics.versions ||
                        !this.props.statistics.versions[this.props.adapter] ? (<Paper>No info</Paper>) :
                            this.renderContent()
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.onClose()} color="primary">{I18n.t('Close')}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AdapterStatistics.propTypes = {
    language: PropTypes.string,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    width: PropTypes.number,
    adapter: PropTypes.string,
    statistics: PropTypes.object,
    onClose: PropTypes.func,
};

export default withStyles(styles)(AdapterStatistics);
