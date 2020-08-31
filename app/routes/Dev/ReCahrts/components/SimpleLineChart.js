import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { 
    Line, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Legend, 
    LineChart,
    Dot
} from './../../../../components/recharts';

import colors from './../../../../colors';

// eslint-disable-next-line react/prop-types
const generateDot = ({stroke, ...other}) => (
    <Dot
        { ...other }
        r={ 5 }
        fill={ stroke }
        stroke={ colors['white'] }
        strokeWidth={ 3 }
    />
);

const generateActiveDot = (props) => (
    <Dot
        { ...props }
        stroke={ colors['white'] }
        r={ 5 }
    />
);

function SimpleLineChart({height, className, data}) {
    return (
    <ResponsiveContainer
        width='100%'
        className={ className }
        {...(!_.isUndefined(height) ? {
            height
        } : {
            aspect: 2 / 1
        })}
    >
        <LineChart data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Line dataKey="CPUUtilization" stroke={ colors['purple'] } dot={generateDot} activeDot={generateActiveDot} />
      </LineChart>
    </ResponsiveContainer>
    );
}
SimpleLineChart.propTypes = {
    height: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.array
}

export { SimpleLineChart };
