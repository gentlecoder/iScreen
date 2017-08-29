import { Http, Headers } from '@angular/http';

const ConstantsList = Object.freeze({
  devUrl: 'http://10.47.202.15:8080/iScreen/',
  // devUrl: 'http://10.5.154.132:8080/iScreen/',
  // devUrl: 'http://10.46.154.10/gongan-server/index.php/api/iscreen/',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  codeSessionOutdate: 3,
  chartType: [
    { "id": "echarts", "name": "ECharts" },
    { "id": "highcharts", "name": "HighCharts" },
    { "id": "d3", "name": "D3.js" },
    { "id": "chartjs", "name": "Chart.js" }
  ],
  chartCategory: [
    { "id": "line", "name": "折线图" },
    { "id": "bar", "name": "柱状图" },
    { "id": "scatter", "name": "散点图" },
    { "id": "pie", "name": "饼图" },
    { "id": "map", "name": "地图" },
    { "id": "lines", "name": "线图" },
    { "id": "radar", "name": "雷达图" },
    { "id": "candlestick", "name": "k线图" },
    { "id": "boxplot", "name": "箱线图" },
    { "id": "heatmap", "name": "热力图" },
    { "id": "graph", "name": "关系图" },
    { "id": "treemap", "name": "矩形树图" },
    { "id": "parallel", "name": "平行坐标" },
    { "id": "sankey", "name": "桑基图" },
    { "id": "funnel", "name": "漏斗图" },
    { "id": "gauge", "name": "仪表盘" }
  ]
});

export default ConstantsList;