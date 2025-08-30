"use client"

import { useEffect, useState } from "react"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"

export default function LinearGauge({ performance, low, actual, high, title = "Performance" }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const horizontalGaugeOptions = {
    chart: {
      type: "bar",
      height: 120,
      backgroundColor: "transparent",
      style: {
        cursor: "pointer",
      },
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: [`${title}<br/>${performance}%`],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: Math.min(low, actual, high) - 100,
      max: Math.max(low, actual, high) + 100,
      title: {
        text: null,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      plotLines: [
        {
          color: "#FFC107",
          width: 3,
          value: low,
          zIndex: 10,
        },
        {
          color: "#2196F3",
          width: 3,
          value: actual,
          zIndex: 10,
        },
        {
          color: "#F44336",
          width: 3,
          value: high,
          zIndex: 10,
        },
      ],
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
        fillOpacity: 0.3,
        cursor: "pointer",
      },
    },
    series: [
      {
        name: "Actual Value",
        data: [{ y: actual, color: "rgba(158, 158, 158, 0.3)" }],
        zIndex: 1,
      },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: () => `
          <div style="padding: 8px; background: white; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <strong>${title} Metrics</strong><br/>
            <span style="color: #FFC107;">● Low: ${low}</span><br/>
            <span style="color: #2196F3;">● Actual: ${actual}</span><br/>
            <span style="color: #F44336;">● High: ${high}</span><br/>
            <strong>Change: ${performance}%</strong>
          </div>
        `,
    },
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  }

  if (!isClient) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading charts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4">
        <HighchartsReact highcharts={Highcharts} options={horizontalGaugeOptions} />

        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-yellow-500 mr-2"></div>
            <span>Low Threshold</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
            <span>Actual Value</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0.5 bg-red-500 mr-2"></div>
            <span>High Threshold</span>
          </div>
        </div>
      </div>
    </div>
  )
}
