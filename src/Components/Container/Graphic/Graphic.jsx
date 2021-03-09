import React from 'react'
import {
    Area,
    AreaChart,
    CartesianGrid,
    // Line,
    // LineChart,
    // ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    ReferenceDot,
    YAxis,
} from "recharts";
import s from './Graphic.module.scss'

const Graphic = (props) => {

    const color = [
        'blue', 'red', 'maroon', 'green', 'black', 'violet', 'orange', '#00FF00', '#7851A9'
    ]

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
                <AreaChart margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 10,
                            }}
                           type="monotone"
                           data={props.salary}
                >
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey={`date`}  height={70} tick={<CustomizedAxisTick />} />
                    {/*<Line type="monotone" name='Зарплата' dot={{r: 0}} activeDot={{r: 5}} dataKey="salary" stroke="#0016FA" fill="#0016FA" />*/}
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" name='Зарплата' dot={{r: 0}} activeDot={{r: 5}} dataKey="salary" stroke="#0016FA" fill="#6673FF" />

                    {/*<ReferenceDot r={5} x={props.salary[0].date} y={props.salary[0].salary} fill={'blue'}  />*/}
                    {/*{*/}
                    {/*    props.salary.filter(s => s.events.length > 0).map(*/}
                    {/*        (s, index) => {*/}
                    {/*            return (*/}
                    {/*                <ReferenceLine key={s.date} stroke={color[index]} isFront={true} segment={[{ x: s.date, y: 0 }, { x: s.date, y: s.salary } ]} />*/}
                    {/*            )*/}
                    {/*        }*/}
                    {/*    )*/}

                    }
                    {
                        props.salary.filter(s => s.events.length > 0).map(
                            (s, index) => {
                                return (
                                    <ReferenceDot key={s.salary} r={5} x={s.date} y={s.salary} fill={color[index]}  />
                                )
                            }
                        )
                    }

                </AreaChart>
            </ResponsiveContainer>

            <div className={s.legend}>
                {
                    props.salary.filter(s => s.events.length > 0).map(
                        (salary, index) => {

                            return (
                                <div className={s.legendItem} key={color[index]}>
                                    <span>{salary.date}&ensp;</span>
                                    <span style={{backgroundColor: color[index]}} className={s.round}>

                                    </span>
                                    {salary.events.map((e, index) => {

                                        if(index < salary.events.length - 1) return <span key={index}>{e}, </span>
                                        else return <span key={index}>{e}</span>
                                    })}
                                </div>
                            )
                        }
                    )

                }
            </div>
        </>
    )
}
export default Graphic

// export const getSalary = (props) => {
//
//     let salary = []
//
//     salary = props.map(s => {
//         return {
//             ...s,
//             salary: s.salary,
//             month: `${getMonth(s.month)} ${s.year}`
//         }
//     })
//
//     return salary
// }

// {/*<Label*/}
// {/*    content={({ value, viewBox }) => {*/}
// {/*        return (*/}
// {/*            <ReferenceDot r={5} x={s.date} y={s.salary} fill="red"  />*/}
// {/*            // <foreignObject {...viewBox} x={x + 10} y={y + 100} width={150}>*/}
// {/*            //     <p className={s.reference}>Старший преподаватель</p>*/}
// {/*            // </foreignObject>*/}
// {/*        );*/}
// {/*    }}*/}
// {/*/>*/}
// {/*<ReferenceDot r={5} x={'Декабрь 2024'} y={96785} fill="red"  />*/}
// {/*<ReferenceLine stroke="red" position={"middle"} isFront={true} segment={[{ x: 'Декабрь 2024', y: 0 }, { x: 'Декабрь 2024', y: 96785 }]} >*/}
// {/*    <Label*/}
// {/*        content={({ value, viewBox }) => {*/}
// {/*            const { x, y } = viewBox;*/}
// {/*            return (*/}
// {/*                <ReferenceDot  r={5} x={s.date} y={s.salary} fill="red"  />*/}
// {/*                // <foreignObject {...viewBox} x={x + 10} y={y + 100} width={150}>*/}
// {/*                //     <p className={s.reference}>Старший преподаватель</p>*/}
// {/*                // </foreignObject>*/}
// {/*            );*/}
// {/*        }}*/}
// {/*    />*/}
// {/*</ReferenceLine>*/}
// {/*<Legend />*/}
