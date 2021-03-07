import React from 'react'
import {Area, AreaChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const Graphic = (props) => {

    const CustomizedAxisTick = (props) => {

        const { x, y, stroke, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                    {payload.value}
                </text>
            </g>
        )

    }

    return (
        <>
            {
                props.salary.length > 0 &&
                <div>
                    <AreaChart width={1000} height={500} data={props.salary}>
                        {/*<Line type="monotone" dataKey="salary" stroke="#8884d8" />*/}
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey={`month`} tick={<CustomizedAxisTick />} />
                        <YAxis />
                        <Area type="monotone" dataKey="salary" stroke="#8884d8" fill="#8884d8" />
                        <Tooltip />
                    </AreaChart>
                </div>
            }
        </>
    )
}
export default Graphic
