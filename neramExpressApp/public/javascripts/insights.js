// Initialize Graph 1 - S&P 500 Performance
function initGraph1() {
    const chart = echarts.init(document.getElementById("graph1"));
    const option = {
      title: { text: "S&P 500 Performance (2023)", left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { 
        type: 'category',
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 
      },
      yAxis: { 
        type: 'value',
        name: "Index Value",
        axisLabel: { formatter: '{value}' }
      },
      series: [
        {
          name: "S&P 500",
          type: "line",
          data: [3950, 4045, 3960, 4100, 4200, 4300, 4450, 4500, 4400, 4300, 4350, 4380],
          smooth: true, 
          lineStyle: { color: '#0071a1', width: 2 },
          areaStyle: { color: 'rgba(0, 113, 161, 0.1)' } // Adds a translucent area below the line
        },
      ],
    };
    chart.setOption(option);
  }
  
  // Initialize Graph 2 - Inflation Rates
  function initGraph2() {
    const chart = echarts.init(document.getElementById("graph2"));
    const option = {
      title: { text: "US Inflation Rate (2023)", left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { 
        type: 'category',
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 
      },
      yAxis: { 
        type: 'value',
        name: "Inflation Rate (%)",
        axisLabel: { formatter: '{value}%' }
      },
      series: [
        {
          name: "Inflation Rate",
          type: "bar",
          data: [6.4, 6.0, 5.8, 5.5, 5.2, 5.0, 4.8, 4.5, 4.3, 4.2, 4.1, 4.0],
          itemStyle: { color: '#ffa726' }
        },
      ],
    };
    chart.setOption(option);
  }
  
  // Initialize Charts on Page Load
  document.addEventListener("DOMContentLoaded", function () {
    initGraph1();
    initGraph2();
  });
  