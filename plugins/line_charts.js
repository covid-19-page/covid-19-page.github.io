var yesterday_confirmed = 0, yesterday_unconfirmed = 0, yesterday_died = 0, yesterday_cured = 0

		var myChart = echarts.init(document.getElementById('line'));
		var dataSource = [];
		var dimensions = ['日期', '累计确诊', '现有确诊（含重症）', '现有疑似', '现有重症', '累计死亡', '累计治愈',
			'累计确诊+现有疑似', '新增确诊', '新增疑似', '新增(疑似+确诊)', '观察中', '死亡/确诊'];
		option = {
			title: {
				text: '',
				x: 'center',
				y: 'top',
				top: '15px',
				subtext: '(支持缩放及左右滑动)',
				subtextStyle: {
					fontSize: 12
				}
			},
			legend: {
				type: 'scroll',
				x: 'center',
				y: 'bottom',
				padding: [0, 20],
				itemGap: 3,
				selected: {}
			},
			grid: {
				left: '15%',
				bottom: '40px'
			},
			tooltip: {},
			dataset: {
				dimensions: dimensions,
				source: dataSource,
			},
			xAxis: { type: 'category' },
			yAxis: {},
			dataZoom: [
				{
					type: 'inside',
					throttle: '50',
					minValueSpan: 7,
					start: 100,
					end: 100
				}],
			series: [
				{ type: 'bar' },
				{ type: 'bar' },
				{ type: 'bar' },
				{ type: 'bar' },
				{ type: 'bar' },
				{ type: 'bar' },
				{
					type: 'line',
					label: {
						normal: {
							show: true,
							position: 'top',
						},


					}
				},
				{
					type: 'line',
					label: {
						normal: {
							show: true,
							position: 'top',
						},


					}
				},
				{
					type: 'line',
					label: {
						normal: {
							show: true,
							position: 'top',
						},


					}
				},
				{
					type: 'line',
					label: {
						normal: {
							show: true,
							position: 'top',
						}
					}
				},
				{
					type: 'line',
					label: {
						normal: {
							show: true,
							position: 'top',
						}
					}
				},
				{
					type: 'line',
					label: {
						normal: {
							show: true,
							position: 'top',
							formatter: function (params) {
								str = params.data['死亡/确诊'] + '%'
								return str;
							}
						}
					},
					tooltip: {
						formatter: function (item) {
							str = item.seriesName + "<br>"
								+ item.marker + ' ' + item.data['日期'] + ' : ' + item.data['死亡/确诊'] + '%';
							return str;
						}

					}
				}
			]
		};

		$.ajaxSettings.async = false;
		$.getJSON("../json/line_data.json?" + Date.parse(new Date()), function (data) {
			dataSource = data;

			// dataSource.forEach(function (item) {
			// 	item["死亡/确诊"] = (item.死亡 / item.确诊).toFixed(3);
			// 	item["治愈/确诊"] = (item.治愈 / item.确诊).toFixed(3);
			// });
			// option.dataset.dimensions.push("死亡/确诊");
			// option.series.push({ type: 'line', label: { normal: { show: true, position: 'top' } } });

			// option.dataset.dimensions.push("治愈/确诊");
			// option.series.push({
			// 	type: 'line',
			// 	label: { normal: { show: true, position: 'top' } },
			// 	itemStyle: { normal: { color: '#8cd5c2', lineStyle: { color: '#8cd5c2' } } },
			// });

			option.legend.selected['观察中'] = false;
			option.legend.selected['死亡/确诊'] = false;
			option.dataset.source = dataSource;

			var yesterday_data = data.filter(item => (new Date(item.日期)).Format("yyyy/M/d") == (new Date()).DateAdd("d", -1).Format("yyyy/M/d"));
			console.log(yesterday_data);
			if (yesterday_data.length > 0) {
				yesterday_confirmed = ~~yesterday_data[0].累计确诊;
				yesterday_unconfirmed = ~~yesterday_data[0].现有疑似;
				yesterday_died = ~~yesterday_data[0].累计死亡;
				yesterday_cured = ~~yesterday_data[0].累计治愈;
			}
		})


		myChart.setOption(option);
		window.onresize = () => this.myChart.resize();




