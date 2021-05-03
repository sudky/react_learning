import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ExpenseTypeCount(props) {
    const igeData = props.igeData
    
    const expenseTypes = []
    for(var i = 0; i < igeData.length; i++){
        if(! expenseTypes.includes(igeData[i].expense_type)){
            expenseTypes.push(igeData[i].expense_type)
        }
    }
    console.log(expenseTypes)

    const gift_direction = []
    for(var j = 0; j < igeData.length; j++){
        if(! gift_direction.includes(igeData[j].direction)){
            gift_direction.push(igeData[j].direction)
        }
    }
    console.log(gift_direction)

    const barData = []

    for(var k = 0; k < expenseTypes.length; k++){
        const et = expenseTypes[k]
        const temp = {
            name: et
        }
        for(var l = 0; l < gift_direction.length; l++){
            const dir = gift_direction[l]
            temp[gift_direction[l]] = igeData.filter(r => r.direction === dir && r.expense_type === et).length
        }
        barData.push(temp)
    }

    console.log(barData)
    return (
        <div>
            <BarChart
                width={500}
                height={400}
                data={barData}
                margin={{
                    top: 100,
                    right: 20,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="given" fill="#8884d8" />
                <Bar dataKey="received" fill="#82ca9d" />
            </BarChart>
        </div>
    )
}