import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts';
import './App.css';
import {getStock} from "./api"

const kline = ( chartContainerRef, kdata ) => {
  var chart = createChart(chartContainerRef.current, {
    width: 600,
    height: 300,
    timeScale: {
        timeVisible: true,
        borderColor: '#D1D4DC',
      },
    rightPriceScale: {
      borderColor: '#D1D4DC',
    },
    layout: {
      backgroundColor: '#ffffff',
      textColor: '#000',
    },
    grid: {
      horzLines: {
        color: '#F0F3FA',
      },
      vertLines: {
        color: '#F0F3FA',
      },
    },
  });
  
  var series = chart.addCandlestickSeries({
      upColor: 'rgb(38,166,154)',
      downColor: 'rgb(255,82,82)',
      wickUpColor: 'rgb(38,166,154)',
      wickDownColor: 'rgb(255,82,82)',
      borderVisible: false,
    });

  // var data = [
  //   {open: 101.300003, high: 101.919998, low: 100.720001, close: 101.910004, time: "2021-05-06"},
  //   { open: 102.18, high: 102.989998, low: 102.019997, close: 102.870003, time: "2021-05-07"},
  // ];

  series.setData(kdata);

  let data = kdata
  var smaData = calculateSMA(data, 10);
  var smaLine = chart.addLineSeries({
    color: 'rgba(4, 111, 232, 1)',
    lineWidth: 2,
  });
  smaLine.setData(smaData);


  var container = document.createElement('div');
  document.body.appendChild(container);
  var legend = document.createElement('div');
  legend.className = 'sma-legend';
  container.appendChild(legend);
  legend.style.display = 'block';
  legend.style.left = '28%'; // 660 + 'px';
  legend.style.top = '16%'; // 250 + 'px';
  function setLegendText(priceValue) {
    let val = 'n/a';
    if (priceValue !== undefined) {
      val = (Math.round(priceValue * 100) / 100).toFixed(2);
    }
    legend.innerHTML = 'MA10 <span style="color:rgba(4, 111, 232, 1)">' + val + '</span>';
  }
  setLegendText(smaData[smaData.length - 1].value);

  chart.subscribeCrosshairMove((param) => {
    setLegendText(param.seriesPrices.get(smaLine));
  });

  function calculateSMA(data, count){
    var avg = function(data) {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
         sum += data[i].close;
      }
      return sum / data.length;
    };
    var result = [];
    for (var i=count - 1, len=data.length; i < len; i++){
      var val = avg(data.slice(i - count + 1, i));
      result.push({ time: data[i].time, value: val});
    }
    return result;
  }

  
  var datesForMarkers = [kdata[kdata.length - 10], kdata[kdata.length - 31]];
  var indexOfMinPrice = 0;
  for (var i = 1; i < datesForMarkers.length; i++) {
    if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
      indexOfMinPrice = i;
    }
  }
  var markers = [];
  for (var i = 0; i < datesForMarkers.length; i++) {
    if (i !== indexOfMinPrice) {
      markers.push({ time: datesForMarkers[i].time, position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: 'Sell @ ' + Math.floor(datesForMarkers[i].high + 2) });
    } else {
      markers.push({ time: datesForMarkers[i].time, position: 'belowBar', color: '#2196F3', shape: 'arrowUp', text: 'Buy @ ' + Math.floor(datesForMarkers[i].low - 2) });
    }
  }
  markers.push({ time: kdata[kdata.length - 48].time, position: 'aboveBar', color: '#f68410', shape: 'circle', text: 'D' });
  series.setMarkers(markers);
}

function App() {
  const chartContainerRef = useRef();
  useEffect(() => {
    getStock().then( res =>{
      kline(chartContainerRef, res.etf)
    })

  })

  return (
    <div className="App">      
      <header className="App-header">

        <div ref={chartContainerRef} className="chart-container"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
