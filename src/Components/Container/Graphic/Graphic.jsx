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
        '#93d67a', '#ffca54', '#69a4db', '#f76085', '#e395ff', 'black', 'violet', 'orange', '#00FF00', '#7851A9', '#A6E2EC'
    ]

    let salary = getSalary(props.salary)

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
            <h2 className={s.title}>График зарплат</h2>
            <ResponsiveContainer className={s.gr}>
                <AreaChart margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 10,
                            }}
                           type="monotone"
                           data={salary}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E3F3FF" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#FAFDFF" stopOpacity={1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey={`date`}  height={70} tick={<CustomizedAxisTick />} />
                    {/*<Line type="monotone" name='Зарплата' dot={{r: 0}} activeDot={{r: 5}} dataKey="salary" stroke="#0016FA" fill="#0016FA" />*/}
                    <YAxis />
                    <Tooltip />
                    {/*connectNulls*/}
                    <Area type="linear" name='Зарплата' dot={{r: 0}} activeDot={{r: 5}} dataKey="salary" stroke="#0016FA" fill="url(#colorUv)" />
                    <Area type="linear" name='Отпускные' dot={{r: 0}} activeDot={{r: 5}} dataKey="vacation_salary" fillOpacity={1} stroke="#f66a69" fill="#f66a69" />

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
                                    <ReferenceDot key={s.salary} r={7.5} x={s.date} y={s.salary} strokeWidth={1} stroke={'black'} fill={color[index]}  />
                                )
                            }
                        )
                    }

                </AreaChart>
            </ResponsiveContainer>

            <div className={s.information}>
                <h2 className={`${s.title} ${s.informationTitle}`}>Пояснительная информация</h2>

                <div className={s.vacation}>
                    — оплачиваемый отпуск
                </div>
                <div className={s.table}>
                    <div className={s.legendItem}>
                        <div className={`${s.marker} ${s.tableTitle}`}>Маркер</div>
                        <div className={`${s.date} ${s.tableTitle}`}>Дата</div>
                        <div className={`${s.event} ${s.tableTitle}`}>События</div>
                    </div>
                    {
                        props.salary.filter(s => s.events.length > 0).map(
                            (salary, index) => {

                                return (
                                    <div className={s.legendItem} key={color[index]}>

                                        <div className={s.marker}>
                                            <div style={{backgroundColor: color[index]}} className={s.round}>

                                            </div>
                                        </div>
                                        <div className={`${s.td} ${s.date}`}>{salary.date}&ensp;</div>
                                        <div className={`${s.td} ${s.event}`}>
                                            {salary.events.map((e, index) => {

                                                if(index < salary.events.length - 1) return <div className={s.eventItem} key={index}>{e}</div>
                                                else return <div key={index}>{e}</div>
                                            })}
                                        </div>
                                    </div>
                                )
                            }
                        )

                    }
                </div>
            </div>
        </>
    )
}
export default Graphic

export const getSalary = (props) => {

    let salary = []

    salary = props.map(s => {
         return {
            ...s,
            salary: s.vacation_status === true ? null : s.salary,
            date: s.date,
            vacation_salary: s.vacation_salary,
            vacation_status: s.vacation_status,
        }
    })

    return salary
}

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
