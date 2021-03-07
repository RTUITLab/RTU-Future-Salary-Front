import Slider, {Handle, Range, SliderTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';

const Test = (props) => {

    const style = { width: 1140, margin: 30 };

    const marks = {
        1: 'Январь',
        2: 'Февраль',
        3: 'Март',
        4: 'Апрель',
        5: 'Май',
        6: 'Июнь',
        7: 'Июль',
        8: 'Август',
        9: 'Сентябрь',
        10: 'Октябрь',
        11: 'Ноябрь',
        12: 'Декабрь',
    };
    const handle = props => {
        const { value, dragging, index, ...restProps } = props;


        return (
            <SliderTooltip
                prefixCls="rc-slider-tooltip"
                overlay={getMonth(value)}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </SliderTooltip>
        );
    };

    return (
       <div style={style}>
           <Slider min={1}
                   step={1}
                   max={12}
                   marks={marks}
                   handle={handle}
           />
       </div>
    )

}

export default Test

const getMonth = (month) => {
    const monthArr = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',

    ]
    return (monthArr[month-1])
}
