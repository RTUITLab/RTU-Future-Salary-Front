import React from 'react'
import Draggable from 'react-draggable';
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
    Label,
    ReferenceDot,
    YAxis,
} from "recharts";
import s from './Graphic.module.scss'

const Graphic = (props) => {

    const color = [
        '#93d67a', '#ffca54', '#69a4db', '#f76085', '#e395ff', '#A6E2EC', '#7851A9', '#00FF00', 'black', 'violet', 'orange',
    ]

    let salary = getSalary(props.salary)
    let unique = getUniqueEvents(props.salary)
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
                        <YAxis />
                        {
                            (!props.isMobile && !props.isTablet && window.innerWidth > 1200) &&
                            <Tooltip />
                        }
                        {/*connectNulls*/}
                        <Area type="linear" name='Зарплата' dot={{r: 0}} activeDot={{r: 5}} dataKey="salary" stroke="#0016FA" fill="url(#colorUv)" />
                        <Area type="linear" name='Отпускные' dot={{r: 0}} activeDot={{r: 5}} dataKey="vacation_salary" fillOpacity={1} stroke="#f66a69" fill="#f66a69" />
                        }
                        {
                            unique.map(
                                (salary, index, arr) => {
                                    return (
                                        <ReferenceDot key={index} r={7.5} x={salary.date} y={salary.salary === 0 ? salary.vacation_salary : salary.salary} strokeWidth={1} stroke={'black'} fill={color[index]} >
                                            <Label content={({ value, viewBox }) => {
                                                        const { x, y } = viewBox;
                                                        return (
                                                                <Draggable>
                                                                    <foreignObject {...viewBox} x={x + 15} y={y - 20} width={100} height={20}>
                                                                            <p className={s.reference}>{salary.salaryLabel === '0' ? (salary.vacation_salary === null ? '' : `${salary.vacation_salaryLabel} ₽`) : `${salary.salaryLabel} ₽`}</p>
                                                                    </foreignObject>
                                                                </Draggable>
                                                        );
                                                    }}
                                                />
                                        </ReferenceDot>
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
                                                        <circle cx="8" cy="8" fill={color[index]} r={'9'} />
                                                    </svg>
                                                </div>
                                                <div className={`${s.td} ${s.date}`}><span>{salary.date.replace(/^\s+/g, '')}</span></div>
                                                <ul className={`${s.td} ${s.event}`}>
                                                    {salary.events.map((e, index) => {

                                                        if(index < salary.events.length - 1) return <li className={s.eventItem} key={index}>{e}</li>
                                                        else return <li key={index}>{e}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        )
                                    }
                                    else return ''
                                }
                            )

                        }
                    </div>

                    <div className={s.table}>
                        <div className={s.legendItem}>
                            <div className={`${s.marker} ${s.tableTitle}`}>Маркер</div>
                            <div className={`${s.tableTitle} ${s.date}`}>Дата</div>
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
                                                        <circle cx="8" cy="8" fill={color[index]} r={'9'} />
                                                    </svg>
                                                </div>
                                                <div className={`${s.td} ${s.date}`}><span>{salary.date.replace(/^\s+/g, '')}</span></div>
                                                <ul className={`${s.td} ${s.event}`}>
                                                    {salary.events.map((e, index) => {

                                                        if(index < salary.events.length - 1) return <li className={s.eventItem} key={index}>{e}</li>
                                                        else return <li key={index}>{e}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        )
                                    }
                                    else return ''
                                }
                            )

                        }
                    </div>
                </div>

                <div className={s.soloTable}>
                    <div className={s.table}>
                        <div className={s.legendItem}>
                            <div className={`${s.marker} ${s.tableTitle}`}>Маркер</div>
                            <div className={`${s.date} ${s.tableTitle}`}>Дата</div>
                            <div className={`${s.event} ${s.tableTitle}`}>События</div>
                        </div>
                        {
                            props.salary.filter(events => events.events.length > 0).map(
                                (salary, index) => {
                                    return (
                                        <div className={s.legendItem} key={color[index]}>

                                            <div className={s.marker}>
                                                <svg  className={s.round}>
                                                    <circle cx="8" cy="8" fill={color[index]} r={'9'} />
                                                </svg>
                                            </div>
                                            <div className={`${s.td} ${s.date}`}><span>{salary.date.replace(/^\s+/g, '')}</span></div>
                                            <ul className={`${s.td} ${s.event}`}>
                                                {salary.events.map((e, index) => {

                                                    if(index < salary.events.length - 1) return <li className={s.eventItem} key={index}>{e}</li>
                                                    else return <li key={index}>{e}</li>
                                                })}
                                            </ul>
                                        </div>
                                    )


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

export const getUniqueEvents = (props) => {

    let events = props.filter(s => s.events.length > 0)

    events = events.map((event, index, arr) => {

        return {
            ...event,
            salary: event.salary,
            salaryLabel: index + 1 !== arr.length ? (event.salary === arr[index+1].salary ? '0' : event.salary.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')) : event.salary.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '),
            date: event.date,
            vacation_salary: event.vacation_salary,
            vacation_salaryLabel: event.vacation_salary !== null ? event.vacation_salary.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : null,
            vacation_status: event.vacation_status,
        }
    })

    return events
}


