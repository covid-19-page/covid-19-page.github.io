$.get('../json/map/china.json', function (chinaJson) {

    echarts.registerMap('china', chinaJson);

    var mapId = document.getElementById('map')


    if (!mapId){
        return false;
    }
    var myChart = echarts.init(mapId);

    $.get('../json/data/china_map.json', function (data) {
        var hStep = 300 / (data.length - 1);
        var obj = eval(data);
        var busLines = [];
        var time_line_date = [];
        var time_line_option = [];

        for (let i = 0; i < obj.length; i++) {
            var time = obj[i]["time"];
            time_line_date.unshift(time);
            let o = {
                title: {
                    text: time + '确诊人数'
                },
                series: [{
                    type: 'map',
                    geoIndex: 0,
                    // coordinateSystem: 'geo',
                    data: obj[i]['confirm']['province_level'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    roam: true,
                }]
            };

            time_line_option.unshift(o);


        }

        myChart.setOption({
            baseOption: {
                backgroundColor: '#fff',
                visualMap: {
                    // min: 1,
                    // max: 2000,
                    // splitNumber: 30,
                    show: true,
                    inRange: {
                        color: [

                            "#fef6fe",
                            "#d88273",
                            "#bf444c"

                        ]
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
                animation: true,
                title: {
                    text: '确诊地图',
                    subtext: 'data from : http://www.nhc.gov.cn/',
                    sublink: '',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br>确诊:{c}'
                },
                timeline: {
                    currentIndex: time_line_date.length - 1,
                    tooltip: {
                        show: false
                    },
                    bottom: '2%',
                    playInterval: 1000,
                    realtime: true,
                    autoPlay: false,
                    emphasis: {
                        controlStyle: {
                            color: "#777"
                        }
                    },
                    checkpointStyle: {
                        // 当前点
                        color: '#fff',
                        borderColor: '#aaa'
                    },
                    lineStyle: {
                        // 线
                        "color": "#aaa",
                    },
                    textStyle: {
                        color: '#aaa'
                    },
                    itemStyle: {
                        borderColor: "#aaa",
                    },
                    controlStyle: {
                        color: '#aaa',
                        borderColor: "#aaa"
                    },
                    label: {
                        color: "#aaa"
                    },
                    data: time_line_date
                },
                geo: {
                    map: 'china',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{a}',
                            // position: 'inside',
                            //backgroundColor: '#fff',
                            // padding: [3, 5],
                            // borderRadius: 3,
                            // borderWidth: 1,
                            // borderColor: 'rgba(0,0,0,0.5)',
                            color: '#777'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    },
                    selectedMode: 'single',
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#ccc',
                            borderColor: '#777'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    },
                    scaleLimit: { //所属组件的z分层，z值小的图形会被z值大的图形覆盖
                        min: 0.6, //最小的缩放值
                        max: 3, //最大的缩放值
                    }

                },
                //    series: series
            },
            options: time_line_option
            // [{ //option 1 对应timeline.data中第一项2002年}]
           
        });




    }, );
})