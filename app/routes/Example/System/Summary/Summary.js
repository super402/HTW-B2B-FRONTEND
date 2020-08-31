import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardDeck, 
  Container,
  Row,
  Col,
  Table
} from './../../../../components'
import { 
  Pie, 
  ResponsiveContainer,
  Cell,
  PieChart,
  PieValueLabel,
  Legend,
  Tooltip,
  LabelList
} from './../../../../components/recharts';
import colors from './../../../../colors';
import {
  TrSystem
} from "./../../../Dashboards/System/components/trSystem"

const camera = [
  {name: 'Camera A', value: 10},
  {name: 'Camera B', value: 20},
  {name: 'Camera C', value: 5},
  {name: 'Camera D', value: 15}
];

const nvr = [
  {name: 'NVR A', value: 10},
  {name: 'NVR B', value: 5},
  {name: 'NVR C', value: 15}
];

const system = [
  {name: 'Camera', value: 50},
  {name: 'NVR', value: 30}
];

const TrColors =  [
  {
      fill: "primary-02",
      stroke: "primary"
  },
  {
      fill: "purple-02",
      stroke: "purple"
  },
  {
      fill: "success-02",
      stroke: "success"
  },
  {
      fill: "yellow-02",
      stroke: "yellow"
  }
]

const COLORS = [ colors['primary'], colors['purple'], colors['success'], colors['yellow']];

function Summary() {
  const [data, setData] = useState(camera);

  function onClick(index, e) {
    e.preventDefault();

    if(index == 0) {
      setData(camera);
    } else {
      setData(nvr);
    }
  }

  return(
    <Container>
      <CardDeck>
          { /* START Card Graph */}
          <Card className="mb-3">
              <CardBody>
                  <ResponsiveContainer width='100%' aspect={6.0/3.0}>
                    <PieChart>
                        <Legend paylodUniqBy />
                        <Tooltip contentStyle={{colors: 'white'}} />
                        <Pie
                            data={system}
                            dataKey="value"
                            stroke={ colors['white'] }
                            labelLine={false}
                            label={<PieValueLabel data={system} />}
                            outerRadius={80} 
                            fill="#8884d8"
                        >
                            {
                                system.map((entry, index) => <Cell key={ index } fill={COLORS[index % COLORS.length]} onClick={(e) => onClick(index, e)} cursor="pointer" />)
                            }
                            <LabelList dataKey="name" position="inside" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
              </CardBody>
          </Card>
          { /* START Card Graph */}
          <Card className="mb-3">
              <CardBody>
                  <ResponsiveContainer width='100%' aspect={6.0/3.0}>
                    <PieChart>
                        <Legend paylodUniqBy />
                        <Tooltip contentStyle={{colors: 'white'}} />
                        <Pie
                            data={data}
                            dataKey="value"
                            stroke={ colors['white'] }
                            labelLine={false}
                            label={<PieValueLabel data={data} />}
                            outerRadius={80} 
                            fill="#8884d8"
                        >
                            {
                                data.map((entry, index) => <Cell key={ index } fill={COLORS[index % COLORS.length]}/>)
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
              </CardBody>
          </Card>
        </CardDeck>
        <Row className="mb-5">
        <Col lg={ 12 }>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Memory</th>
                        <th>CPU</th>
                        <th>Traffic</th>
                        <th>Disk I/O</th>
                    </tr>
                </thead>
                <tbody>
                    <TrSystem 
                        colors={TrColors}
                    />
                    <TrSystem 
                        colors={TrColors}
                    />
                    <TrSystem 
                        colors={TrColors}
                    />
                    <TrSystem 
                        colors={TrColors}
                    />
                    <TrSystem 
                        colors={TrColors}
                    />
                </tbody>
            </Table>
        </Col>
        </Row>
    </Container>
  );
}

export default Summary;