import React from 'react';
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


const generateDot = ({stroke, ...other}) => (
    <Dot
        { ...other }
        r={ 5 }
        fill={ stroke }
        stroke={ colors['white'] }
        strokeWidth={ 3 }
        strokeDasharray={ 0 }
    />
);

const DashedLineChart = ({data}) => (
    <ResponsiveContainer width='100%' aspect={6.0/3.0}>
        <LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis/>
           <Tooltip/>
           <Legend />
           <Line dataKey="NetworkPacketsIn" stroke={ colors['primary'] } activeDot={{r: 5}} dot={generateDot} strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>

)
DashedLineChart.propTypes = {
    data: PropTypes.array
}

export { DashedLineChart };
