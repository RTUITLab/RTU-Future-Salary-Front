import React from 'react'
import {
    Area,
    AreaChart,
    CartesianGrid,
    // Line,
    // LineChart,
    // ReferenceLine,
    // ResponsiveContainer,
    Tooltip,
    XAxis,
    ReferenceDot,
    YAxis,
} from "recharts";
import s from './Graphic.module.scss'

const Graphic = (props) => {

    const color = [
        '#93d67a', '#ffca54', '#69a4db', '#f76085', '#e395ff', '#A6E2EC', '#7851A9', '#00FF00', 'black', 'violet', 'orange',
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
            <div className={s.graphicContainer}>
                {/*<ResponsiveContainer className={s.gr}>*/}
                    <AreaChart margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 10,
                               }}
                               width={1200}
                               height={500}
                               // maxWidth={1200}
                               type="monotone"
                               data={salary}
                               className={s.gr}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E3F3FF" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#FAFDFF" stopOpacity={1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                        <XAxis dataKey={`date`}  height={50} tick={<CustomizedAxisTick />} />
                        {/*<Line type="monotone" name='Зарплата' dot={{r: 0}} activeDot={{r: 5}} dataKey="salary" stroke="#0016FA" fill="#0016FA" />*/}
                        <YAxis />
                        <Tooltip />
                        {/*connectNulls*/}
                        <Area type="linear" name='Зарплата' dot={{r: 0}} activeDot={{r: 5}} dataKey="salary" stroke="#0016FA" fill="url(#colorUv)" />
                        <Area type="linear" name='Отпускные' dot={{r: 0}} activeDot={{r: 5}} dataKey="vacation_salary" fillOpacity={1} stroke="#f66a69" fill="#f66a69" />
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
                {/*</ResponsiveContainer>*/}
            </div>

            <div className={s.information}>
                <h2 className={`${s.title} ${s.informationTitle}`}>Пояснительная информация</h2>

                {
                    props.salary.filter(s => s.vacation_status).length > 0 &&
                    <div className={s.vacation}>
                        — оплачиваемый отпуск
                    </div>
                }
                <div className={s.tableContainer}>
                    <div className={s.table}>
                        <div className={s.legendItem}>
                            <div className={`${s.marker} ${s.tableTitle}`}>Маркер</div>
                            <div className={`${s.date} ${s.tableTitle}`}>Дата</div>
                            <div className={`${s.event} ${s.tableTitle}`}>События</div>
                        </div>
                        {
                            props.salary.filter(events => events.events.length > 0).map(
                                (salary, index, events) => {

                                    if(index <= (events.length - 1)/2) {

                                        return (
                                            <div className={s.legendItem} key={color[index]}>

                                                <div className={s.marker}>
                                                    <svg  className={s.round}>
                                                        <circle cx="9" cy="9" fill={color[index]} r={'9'} />
                                                    </svg>
                                                </div>
                                                <div className={`${s.td} ${s.date}`}>{salary.date}&ensp;</div>
                                                <ul className={`${s.td} ${s.event}`}>
                                                    {salary.events.map((e, index) => {

                                                        if(index < salary.events.length - 1) return <li className={s.eventItem} key={index}>{e}</li>
                                                        else return <li key={index}>{e}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        )
                                    }
                                    else return
                                }
                            )

                        }
                    </div>

                    <div className={s.table}>
                        <div className={s.legendItem}>
                            <div className={`${s.marker} ${s.tableTitle}`}>Маркер</div>
                            <div className={`${s.date} ${s.tableTitle}`}>Дата</div>
                            <div className={`${s.event} ${s.tableTitle}`}>События</div>
                        </div>
                        {
                            props.salary.filter(events => events.events.length > 0).map(
                                (salary, index, events) => {

                                    if(index > (events.length - 1)/2) {
                                        return (
                                            <div className={s.legendItem} key={color[index]}>

                                                <div className={s.marker}>
                                                    <svg  className={s.round}>
                                                        <circle cx="9" cy="9" fill={color[index]} r={'9'} />
                                                    </svg>
                                                </div>
                                                <div className={`${s.td} ${s.date}`}>{salary.date}&ensp;</div>
                                                <ul className={`${s.td} ${s.event}`}>
                                                    {salary.events.map((e, index) => {

                                                        if(index < salary.events.length - 1) return <li className={s.eventItem} key={index}>{e}</li>
                                                        else return <li key={index}>{e}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        )
                                    }
                                    else return
                                }
                            )

                        }
                    </div>
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

export const getEvents = (props) => {

    let event = []

    event = props.filter(s => s.events.length > 0)

    return event
}
