import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardDeck, 
    Button
} from './../../../components'
import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";

import { SimpleBarChart } from "./components/SimpleBarChart";
import { StackedBarChart } from "./components/StackedBarChart";
import { MixBarChart } from "./components/MixBarChart";
import { PositiveAndNegativeBarChart } from "./components/PositiveAndNegativeBarChart";
import { BarChartStackedBySign } from "./components/BarChartStackedBySign";
import { BarChartHasBackground } from "./components/BarChartHasBackground";
import { SimpleLineChart } from "./components/SimpleLineChart";
import { DashedLineChart } from "./components/DashedLineChart";
import { VerticalLineChart } from "./components/VerticalLineChart";
import { CustomizedLabelLineChart } from './components/CustomizedLabelLineChart';
import { SimpleAreaChart } from "./components/SimpleAreaChart";
import { StackedAreaChart } from "./components/StackedAreaChart";
import { PercentAreaChart } from "./components/PercentAreaChart";
import { AreaChartFillByValue } from "./components/AreaChartFillByValue";
import { TwoLevelPieChart } from "./components/TwoLevelPieChart";
import { StraightAnglePieChart } from "./components/StraightAnglePieChart";
import { PieChartWithCustomizedLabel } from "./components/PieChartWithCustomizedLabel";
import { PieChartWithPaddingAngle } from "./components/PieChartWithPaddingAngle";
import { PieChartWithPaddingAngleHalf } from "./components/PieChartWithPaddingAngleHalf";
import { SpecifiedDomainRadarChart } from "./components/SpecifiedDomainRadarChart";
import { SimpleRadialBarChart } from './components/SimpleRadialBarChart';
import { LineBarAreaComposedChart } from "./components/LineBarAreaComposedChart";
import { TinyLineChart } from "./components/TinyLineChart";
import { TinyAreaChart } from "./components/TinyAreaChart";
import { TinyBarChart } from './components/TinyBarChart';
import { TinyPieChart } from './components/TinyPieChart';
import { TinyDonutChart } from './components/TinyDonutChart';
import { VerticalComposedChart } from './components/VerticalComposedChart';

export const ReCharts = () => {
    const [Chart, setChart] = useState([]);
    const [ChartTitle, setChartTitle] = useState(['CPUUtilization', 'NetworkPacketsIn']);


    const getCloudWatchMetric = () => {
        axios.get("http://sqe.samsungsmartcam.com/rest/v1.0/admin/cloudwatch")
            .then(response => {

                    const resultCpuUtilization = Array.of();
                    response.data.item.CPUUtilization.forEach(element => {
                        resultCpuUtilization.push({name:element.timestamp.substring(5), CPUUtilization:element.value});
                    });

                    const resultNetworkPacketsIn = Array.of();
                    response.data.item.NetworkPacketsIn.forEach(element => {
                        resultNetworkPacketsIn.push({name:element.timestamp.substring(5), NetworkPacketsIn:element.value});
                    });

                    const Simple = <SimpleLineChart data={resultCpuUtilization} />;
                    const Dash = <DashedLineChart data={resultNetworkPacketsIn} />;
                    
                    setChart([Simple, Dash]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCloudWatchMetric();
    }, []);
/*
    useEffect(() => {
        const interval = setInterval(() => {
            getCloudWatchMetric();
        }, 1000 * 5);
 
        return () => clearInterval(interval);
    }, []);
*/

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }
        
        const charts = reorder(Chart, result.source.index, result.destination.index);
        const chartTitles = reorder(ChartTitle, result.source.index, result.destination.index);

        setChart(charts);
        setChartTitle(chartTitles);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
    

    

    return (
    <Container>
        <HeaderMain 
            title="CloudWatch"
            className="mb-4 mt-4"
        />
        { /* START Header 2 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={1} 
                    title="Line Charts" 
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 2 */}
        { /* START Section 2 */}
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`card-deck`}
                    >
                    <Draggable draggableId="drag1" index={0}>
                        {(provided) => (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className={`mb-3 card card-body`}
                            >
                                <div className="d-flex">
                                    <div>
                                        <h6 className="card-title mb-1">
                                            {ChartTitle[0]}
                                            <span className="small ml-1 text-muted">
                                                #1.01
                                            </span>
                                        </h6>
                                        <p>Line Charts</p>
                                    </div>
                                    <span className="ml-auto">
                                        <Button color="link" href="https://jsfiddle.net/alidingling/xqjtetw0/" target="_blank">
                                            <i className="fa fa-external-link"></i>
                                        </Button>
                                    </span>
                                </div>
                                {Chart[0]}
                        </div>
                        )}
                    </Draggable>
                    <Draggable draggableId="drag2" index={1}>
                    {(provided) => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={`mb-3 card card-body`}
                        >
                            <div className="d-flex">
                                <div>
                                    <h6 className="card-title mb-1">
                                        {ChartTitle[1]}
                                        <span className="small ml-1 text-muted">
                                            #1.02
                                        </span>
                                    </h6>
                                    <p>Line Charts</p>
                                </div>
                                <span className="ml-auto">
                                    <Button color="link" href="https://jsfiddle.net/alidingling/nptzh7ez/" target="_blank">
                                        <i className="fa fa-external-link"></i>
                                    </Button>
                                </span>
                            </div>
                            {Chart[1]}
                    </div>
                    )}
                    </Draggable>
                    {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                VerticalLineChart
                                <span className="small ml-1 text-muted">
                                    #2.03
                                </span>
                            </h6>
                            <p>Line Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/rrr9q7x5/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <VerticalLineChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                CustomizedLabelLineChart
                                <span className="small ml-1 text-muted">
                                    #2.04
                                </span>
                            </h6>
                            <p>Line Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/9y9zrpjp/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <CustomizedLabelLineChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        { /* START Section 2 */}

        { /* START Header 1 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={2} 
                    title="Bar Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 1 */}
        { /* START Section 1 */}
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                SimpleBarChart
                                <span className="small ml-1 text-muted">
                                    #1.01
                                </span>
                            </h6>
                            <p>Bar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/30763kr7/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <SimpleBarChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                StackedBarChart
                                <span className="small ml-1 text-muted">
                                    #1.02
                                </span>
                            </h6>
                            <p>Bar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/90v76x08/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <StackedBarChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                MixBarChart
                                <span className="small ml-1 text-muted">
                                    #1.03
                                </span>
                            </h6>
                            <p>Bar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/9hjfkp73/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <MixBarChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                PositiveAndNegativeBarChart
                                <span className="small ml-1 text-muted">
                                    #1.04
                                </span>
                            </h6>
                            <p>Bar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/q68cz43w/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <PositiveAndNegativeBarChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                BarChartStackedBySign
                                <span className="small ml-1 text-muted">
                                    #1.05
                                </span>
                            </h6>
                            <p>Bar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/p82xhe2a/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <BarChartStackedBySign />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                BarChartHasBackground
                                <span className="small ml-1 text-muted">
                                    #1.06
                                </span>
                            </h6>
                            <p>Bar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/q4eonc12/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <BarChartHasBackground />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        { /* START Section 1 */}

        { /* START Header 3 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={3} 
                    title="Area Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 3 */}
        { /* START Section 3 */}
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                SimpleAreaChart
                                <span className="small ml-1 text-muted">
                                    #3.01
                                </span>
                            </h6>
                            <p>Area Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/Lrffmzfc/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <SimpleAreaChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                StackedAreaChart
                                <span className="small ml-1 text-muted">
                                    #3.02
                                </span>
                            </h6>
                            <p>Area Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/c1rLyqj1/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <StackedAreaChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                PercentAreaChart
                                <span className="small ml-1 text-muted">
                                    #3.03
                                </span>
                            </h6>
                            <p>Area Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/zsax2hyq/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <PercentAreaChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                AreaChartFillByValue
                                <span className="small ml-1 text-muted">
                                    #3.04
                                </span>
                            </h6>
                            <p>Area Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/64v6ocdx/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <AreaChartFillByValue />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        { /* START Section 3 */}

        { /* START Header 4 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={4} 
                    title="Pie Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 4 */}
        { /* START Section 4 */}
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                TwoLevelPieChart
                                <span className="small ml-1 text-muted">
                                    #4.01
                                </span>
                            </h6>
                            <p>Pie Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/w6wsrc52/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <TwoLevelPieChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                StraightAnglePieChart
                                <span className="small ml-1 text-muted">
                                    #4.02
                                </span>
                            </h6>
                            <p>Pie Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/pb1jwdt1/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <StraightAnglePieChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex align-items-center mb-3">
                        <h6 className="card-title mb-1">
                            PieChartWithPaddingAngle
                            <span className="small ml-1 text-muted">
                                #4.03
                            </span>
                        </h6>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/3Leoa7f4/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <PieChartWithPaddingAngle />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex align-items-center mb-3">
                        <h6 className="card-title mb-1">
                            PieChartWithPaddingAngleHalf
                            <span className="small ml-1 text-muted">
                                #4.04
                            </span>
                        </h6>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/3Leoa7f4/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <PieChartWithPaddingAngleHalf />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                PieChartWithCustomizedLabel
                                <span className="small ml-1 text-muted">
                                    #4.05
                                </span>
                            </h6>
                            <p>Pie Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/c9pL8k61/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <PieChartWithCustomizedLabel />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        { /* START Section 4 */}

        { /* START Header 5 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={5} 
                    title="Radar Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 5 */}
        { /* START Section 5 */}
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                SpecifiedDomainRadarChart
                                <span className="small ml-1 text-muted">
                                    #5.01
                                </span>
                            </h6>
                            <p>Radar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/dpgb3xjq/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <SpecifiedDomainRadarChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                SimpleRadialBarChart
                                <span className="small ml-1 text-muted">
                                    #5.02
                                </span>
                            </h6>
                            <p>Radar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/9km41z5z/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <SimpleRadialBarChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        { /* START Section 5 */}

        { /* START Header 6 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={6} 
                    title="Composed Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 6 */}
        { /* START Section 6 */}
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex align-items-center mb-3">
                        <h6 className="card-title mb-1">
                            LineBarAreaComposedChart
                            <span className="small ml-1 text-muted">
                                #6.01
                            </span>
                        </h6>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/9xopwa9v/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <LineBarAreaComposedChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                VerticalComposedChart
                                <span className="small ml-1 text-muted">
                                    #6.02
                                </span>
                            </h6>
                            <p>Composed Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/shjsn5su/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <VerticalComposedChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        { /* START Section 6 */}

        { /* START Header 7 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={7} 
                    title="Tiny Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 7 */}
        { /* START Section 7 */}
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex align-items-center mb-3">
                        <h6 className="card-title mb-1">
                            TinyLineChart
                            <span className="small ml-1 text-muted">
                                #7.01
                            </span>
                        </h6>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/exh283uh/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <TinyLineChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex align-items-center mb-3">
                        <h6 className="card-title mb-1">
                            TinyAreaChart
                            <span className="small ml-1 text-muted">
                                #7.02
                            </span>
                        </h6>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/tv8zfzxo/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <TinyAreaChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex align-items-center mb-3">
                        <h6 className="card-title mb-1">
                            TinyBarChart
                            <span className="small ml-1 text-muted">
                                #7.03
                            </span>
                        </h6>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/9kd8rssL/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <TinyBarChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        <Row>
            <Col lg={ 3 }>
                { /* START Card Graph */}
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex align-items-center mb-3">
                            <h6 className="card-title mb-1">
                                TinyDonutChart
                                <span className="small ml-1 text-muted">
                                    #7.05
                                </span>
                            </h6>
                            <span className="ml-auto">
                                <Button color="link" href="https://jsfiddle.net/alidingling/9kd8rssL/" target="_blank">
                                    <i className="fa fa-external-link"></i>
                                </Button>
                            </span>
                        </div>
                        <TinyDonutChart />
                    </CardBody>
                </Card>
                { /* START Card Graph */}
            </Col>
            <Col lg={ 3 }>
                { /* START Card Graph */}
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex align-items-center mb-3">
                            <h6 className="card-title mb-1">
                                TinyPieChart
                                <span className="small ml-1 text-muted">
                                    #7.06
                                </span>
                            </h6>
                            <span className="ml-auto">
                                <Button color="link" href="https://jsfiddle.net/alidingling/9kd8rssL/" target="_blank">
                                    <i className="fa fa-external-link"></i>
                                </Button>
                            </span>
                        </div>
                        <TinyPieChart />
                    </CardBody>
                </Card>
                { /* START Card Graph */}
            </Col>
        </Row>
        { /* START Section 7 */}
    </Container>
);
};

export default ReCharts;
