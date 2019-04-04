import React, {Component} from 'react';
import ChartistGraph from 'react-chartist';

import I18n from '../i18n';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = theme => ({
    cardChart: {
        width: '100%',
        height: '100%',
    },
    chartColor0: {fill: '#96e7ff'},
    chartColor1: {fill: '#86ffb9'},
    chartColor2: {fill: '#ffff77'},
    chartColor3: {fill: '#ff6e00'},
    chartColor4: {fill: '#ffadc7'},
    chartColor5: {fill: '#d7c1ff'},
    chartColor6: {fill: '#ff8ed2'},
    chartColor7: {fill: '#f4fffd'},
    chartColor8: {fill: '#418aff'},
    chartColor9: {fill: '#5ffcff'},
    chartColor10: {fill: '#47ff9a'},
    chartColor11: {fill: '#bfff2b'},
    chartColor12: {fill: '#ffb227'},
    chartColor13: {fill: '#ff3c0a'},
    chartColor14: {fill: '#ff0867'},
    chartColor15: {fill: '#ff099a'},
    chartColor16: {fill: '#dc1eff'},
    chartColor17: {fill: '#771eff'},
    chartColor18: {fill: '#3b15ff'},
    chartColor19: {fill: '#1685ff'},
    chartColor20: {fill: '#00fbff'},
});

class PieStats2 extends Component {
    constructor(props) {
        super(props);
        this.colors = [
            this.props.classes.chartColor0,
            this.props.classes.chartColor1,
            this.props.classes.chartColor2,
            this.props.classes.chartColor3,
            this.props.classes.chartColor4,
            this.props.classes.chartColor5,
            this.props.classes.chartColor6,
            this.props.classes.chartColor7,
            this.props.classes.chartColor8,
            this.props.classes.chartColor9,
            this.props.classes.chartColor10,
            this.props.classes.chartColor11,
            this.props.classes.chartColor12,
            this.props.classes.chartColor13,
            this.props.classes.chartColor14,
            this.props.classes.chartColor15,
            this.props.classes.chartColor16,
            this.props.classes.chartColor17,
            this.props.classes.chartColor18,
            this.props.classes.chartColor19,
            this.props.classes.chartColor20,
        ];
    }

    render() {
        let labels = Object.keys(this.props.data).sort((a, b) => this.props.data[b] - this.props.data[a]);
        let series = labels.map(l => this.props.data[l]);
        let sum = 0;
        series.forEach(v => sum += v || 0);

        for (let k = 0; k < series.length; k++) {
            if (series[k] / sum < this.props.startFromPercent / 100) {
                let others = 0;
                for (let i = k; i < series.length; i++) {
                    others += series[i];
                }
                labels.splice(k, labels.length - k);
                series.splice(k, series.length - k);
                labels.push(I18n.t('others'));
                series.push(others);
                const d = {};
                labels.forEach((l, i) => d[l] = series[i]);
                labels = Object.keys(d).sort((a, b) => d[b] - d[a]);
                series = labels.map(l => d[l]);

                break;
            }
        }
        const ddd = labels.map((n, i) => {
            return {
                value: series[i],
                name: n,
                className: this.colors[i] || undefined,
                meta: 'Meta One'
            };
        });

        return (<ChartistGraph
            className={this.props.classes.cardChart}
            data={{series: ddd}}
            options={{
                labelInterpolationFnc: (value, index) => {
                    console.log(value);
                    return labels[index];// + ' - ' + (Math.round(value / sum * 1000) / 10) + '%';
                }
            }}
            responsiveOptions={[
                [
                    'screen',
                    {
                        chartPadding: 20,
                        labelOffset: 35,
                        labelDirection: 'explode',
                        labelInterpolationFnc: (value, index) => {
                            console.log(value);
                            return labels[index];
                        }
                    }
                ]
            ]}
            type={'Pie'} />);
    }
}

PieStats2.propTypes = {
    language: PropTypes.string,
    onNavigate: PropTypes.func,
    theme: PropTypes.string,
    mobile: PropTypes.bool,
    data: PropTypes.object,
    startFromPercent: PropTypes.number,
};

export default withStyles(styles)(PieStats2);
