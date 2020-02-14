$.get('../json/map/china.json', function (chinaJson) {

    echarts.registerMap('china', chinaJson);

    var myChart = echarts.init(document.getElementById('map'));

    $.get('../json/map/result8.json', function (data) {
        var hStep = 300 / (data.length - 1);
        var obj = eval(data);
        var busLines = [];
        var time_line_date = [];
        var time_line_option = [];

        for (let i = 0; i < obj.length; i++) {
            var time = obj[i]["time"];
            time_line_date.unshift(time);
            // let d = []
            // for (let j = 0; j < obj[i]['confirm']['province_level'].length; j++) {
            //     const element = obj[i]['confirm']['province_level'][j];                
            // }
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
        console.log(time_line_option);
        // for (var i = 0; i < obj.length; i++) {
        //     var points = [];
        //     for (var j = 0; j < obj[i].Mnst.length; j++) {
        //         // 这里有一个坑我必须说明一下 我的数据result8.json里经纬度反了，所以这里取值的时候先取的value[1],再取的value[0]
        //         points.push([obj[i].Mnst[j].value[1], obj[i].Mnst[j].value[0]]);
        //     }
        //     busLines.push({
        //         coords: points,
        //         name: obj[i].name,
        //         tooltip: {
        //             trigger: 'item',
        //             formatter: '{b}'
        //         },
        //         lineStyle: {
        //             normal: {
        //                 color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * i))
        //             }
        //         },
        //     });
        // };


        myChart.setOption({
            baseOption: {
                backgroundColor: '#6f6f6f',
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
                    bottom: '5%',
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
                        borderColor: '#ddd'
                    },
                    lineStyle: {
                        // 线
                        "color": "#ddd",
                    },
                    textStyle: {
                        color: '#fff'
                    },
                    itemStyle: {
                        borderColor: "#fff",
                    },
                    controlStyle: {
                        color: '#fff',
                        borderColor: "#fff"
                    },
                    label: {
                        color: "#fff"
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
                    roam: true,
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
            // [{ //option 1 对应timeline.data中第一项2002年
            //         title: {
            //             text: '2002年统计值'
            //         },
            //         series: [
            //             //     {
            //             //     type: 'heatmap',
            //             //     coordinateSystem: 'geo',
            //             //     data: [
            //             //         [116.46, 39.92, 6000]
            //             //     ],
            //             // }, 
            //             {
            //                 type: 'map',
            //                 geoIndex: 0,
            //                 // coordinateSystem: 'geo',
            //                 data: busLines,
            //                 label: {
            //                     normal: {
            //                         show: false
            //                     }
            //                 },
            //                 roam: true,
            //             }
            //         ]
            //     }
            // ]
        });




    }, );
})