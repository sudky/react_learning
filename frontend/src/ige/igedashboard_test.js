import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { apicall } from '../apicall';
import ExpenseTypeCount from './bar_chart'

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function IGEDashboard() {
    const [igeData, setIGEData] = useState([])
    const [pieData, setPieData] = useState([{name: 'given', value: 23}, {name: 'recieved', value: 50}])

    useEffect(()=> {
        apicall('GET', '/ige/', (response, status) => {
            if(status === 200){
                console.log(response)
                setIGEData(response)
                var gift_direction = []
                for(var i = 0; i < response.length; i++){
                   //console.log(response[i].direction)
                   if(! gift_direction.includes(response[i].direction)){
                       gift_direction.push(response[i].direction)
                   }
                }
                console.log(gift_direction)

                var temp_pie = []

                for(var j = 0; j < gift_direction.length; j++){
                    const dir = gift_direction[j]
                    temp_pie.push({
                        name: dir, value: response.filter(r => r.direction === dir).length
                    })
                }
                console.log(temp_pie)
                setPieData(temp_pie)
            }
            else{
                alert(response.message)
            }
        })
    }, [])

    return (
        <div className="container">
            <h1>Auditor Dashboard</h1>
            <div className="row">
                <div className="col border mx-2">
                    <h5>Distribution of Violations by Gifts Given and Received</h5>
                        <PieChart width={400} height={400} verticalAlign="center">
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom"/>
                            <Tooltip />
                        </PieChart>
                </div>
                <div className="col border">
                    <ExpenseTypeCount igeData={igeData} />
                </div>
            </div>
        </div>
    )
}