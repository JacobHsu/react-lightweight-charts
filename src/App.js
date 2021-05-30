import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts';
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

  var volumeSeries = chart.addHistogramSeries({
    color: '#26a69a',
    priceFormat: {
      type: 'volume',
    },
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
      volumeSeries(chartContainerRef, res.candlestickSeries, res.volumeSeries)
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
