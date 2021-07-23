import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts';
// import { maxBy, minBy } from 'lodash'
import './App.css';
import {getStock} from "./api"

const volumeSeries = (chartContainerRef, candlesData, volumeData) => {
  
  const chart = createChart(chartContainerRef.current, { 
    width: 400, height: 300 ,
    layout: {
      backgroundColor: '#131722',
      textColor: '#d1d4dc',
    },
    grid: {
      vertLines: {
        color: 'rgba(42, 46, 57, 0)',
      },
      horzLines: {
        color: 'rgba(42, 46, 57, 0.6)',
      },
    },
  });
  const candlestickSeries = chart.addCandlestickSeries({
    upColor: 'rgb(38,166,154)',
    downColor: 'rgb(255,82,82)',
    wickUpColor: 'rgb(38,166,154)',
    wickDownColor: 'rgb(255,82,82)',
    borderVisible: false,
  });
  candlestickSeries.setData(candlesData);

  // const candleHigh = maxBy(candlesData,'high')
  // const high = candleHigh.high
  // const candleLow = minBy(candlesData,'low')
  // const low = candleLow.low

  var smaData = calculateSMA(candlesData, 10);
  var smaLine = chart.addLineSeries({
    color: 'rgba(4, 111, 232, 1)',
    lineWidth: 2,
  });
  smaLine.setData(smaData);

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


  var volumeSeries = chart.addHistogramSeries({
    color: '#192436',
    lineWidth: 2,
    priceFormat: {
      type: 'volume',
    },
    overlay: true,
    priceScaleId: '',
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  });

  volumeSeries.setData(volumeData);
}

function App() {
  const chartContainerRef = useRef();
  useEffect(() => {
    getStock().then( res =>{
      volumeSeries(chartContainerRef, res.result.candlestickSeries, res.result.volumeSeries)
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
