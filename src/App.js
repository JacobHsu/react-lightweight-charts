import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts';
import './App.css';
import {getStock} from "./api"

const volumeSeries = (chartContainerRef) => {
  
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
  candlestickSeries.setData([
    { time: '2018-10-19', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
    { time: '2018-10-20', open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
    { time: '2018-10-21', open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
    { time: '2018-10-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    { time: '2018-10-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
    { time: '2018-10-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    { time: '2018-10-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
    { time: '2018-10-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
    { time: '2018-10-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
    { time: '2018-10-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
    { time: '2018-10-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
    { time: '2018-10-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
    { time: '2018-10-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
  ]);

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

  volumeSeries.setData([
    { time: '2018-10-19', value: 19103293.00, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2018-10-22', value: 21737523.00, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2018-10-23', value: 29328713.00, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2018-10-24', value: 37435638.00, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2018-10-25', value: 25269995.00, color: 'rgba(255,82,82, 0.8)' },
    { time: '2018-10-26', value: 24973311.00, color: 'rgba(255,82,82, 0.8)' },
    { time: '2018-10-29', value: 22103692.00, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2018-10-30', value: 25231199.00, color: 'rgba(0, 150, 136, 0.8)' },
    { time: '2018-10-31', value: 24214427.00, color: 'rgba(255,82,82, 0.8)' },
  ]);
}

function App() {
  const chartContainerRef = useRef();
  useEffect(() => {
    volumeSeries(chartContainerRef)

    getStock().then( res =>{
      // kline(chartContainerRef, res.etf)
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
