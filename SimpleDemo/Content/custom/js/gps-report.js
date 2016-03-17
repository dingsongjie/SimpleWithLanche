//报表的eCharts的选项获取代码

//预警数量报表
function getAlarmCountReportOptions() {
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: []
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: []
            }
        ],
        series: []
    };

    return option;
}

function getAlarmCountReportSeries(reportData) {
    var series = [];

    $.each(reportData.xData, function (name, value) {
        var item = {
            name: this.name,
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
            data: this.data
        }
        series.push(item);
    });

    return series;
}

//预警类型报表
function getAlarmTypeCountReportOptions() {
    var option = {
        title: {
            text: '-',
            subtext: '-',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            data: []
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        series: []
    };

    return option;
}

function getAlarmTypeCountReportSeries(reportData) {
    var series = [{
        name: '预警类型报表',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: reportData.series
    }];

    //$.each(reportData.series, function (name, value) {
    //    series.data.push(this);
    //});

    return series;
}

