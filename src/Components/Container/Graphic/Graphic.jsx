import React from 'react'
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart, ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {getMonth} from "../../../Common/getMonth";
import s from './Graphic.module.scss'

const Graphic = (props) => {

    const salary = getSalary(props.salary)

    const CustomizedAxisTick = (props) => {

        const { x, y, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fontSize='12' fill="#666" transform="rotate(-35)">
                    {payload.value}
                </text>
            </g>
        )
    }

    return (
        <>
            <ResponsiveContainer className={s.gr}>
                <AreaChart
                           // width={'100%'}

                           margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 10,
                            }}
                           // height={'100%'}
                           data={salary}
                >
                    {/*<Line type="monotone" dataKey="salary" stroke="#8884d8" />*/}
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey={`month`} height={70} tick={<CustomizedAxisTick />} />
                    <YAxis />
                    <Tooltip />

                    <Area type="monotone" dataKey="salary" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}
export default Graphic

export const getSalary = (props) => {

    let salary = []

    salary = props.map(s => {
        return {
            ...s,
            salary: s.salary,
            month: `${getMonth(s.month)} ${s.year}`
        }
    })

    return salary
}
