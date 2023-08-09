import {useState} from 'react'
import { Bar } from 'react-chartjs-2'
import { userData } from './data'
import {ChartJS} from 'chart.js/auto'

function BarChart() {
    const [data, setData] = useState({
        labels: userData.map(data=>data.year),
        datasets: [
            {
                label: "Users Gained",
                data: userData.map(data=>data.userGain),
            }
        ]
    });

    return (
        <div>
            <Bar data={data}/>
        </div>
    )
}

export default BarChart