import {useState} from 'react'
import { Line } from 'react-chartjs-2'
import { userData } from './data'
import {ChartJS} from 'chart.js/auto'

function LineChart(props) {
    return (
        <div>
            <Line data={props.data} 
            options={{
                scales: {
                    y: {
                    beginAtZero: true,
                    },
                },
            }}
            />
        </div>
    )
}

export default LineChart