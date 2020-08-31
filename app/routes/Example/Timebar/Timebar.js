import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./components"; // example render components - source below
import { subDays, startOfToday, format } from "date-fns";
import { scaleTime } from "d3-scale";

const sliderStyle = {
  position: "relative",
  width: "100%"
};

function formatTick(ms) {
  return format(new Date(ms), "h:mm a");
}

const halfHour = 1000;

class Timebar extends Component {
  constructor() {
    super();

    const minValue = startOfToday();
    const initValue = new Date();
    const maxValue = subDays(minValue, -1);

    this.state = {
      selected: initValue,
      min: minValue,
      max: maxValue
    };
  }

  onChange = ([ms]) => {
    this.setState({
      selected: new Date(ms)
    });
  };

  renderDateTime(date, header) {
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "Arial",
          margin: 5
        }}
      >
        <b>{header}:</b>
        <div style={{ fontSize: 12 }}>{format(date, "MMM dd h:mm:ss a")}</div>
      </div>
    );
  }

  render() {
    const { min, max, selected } = this.state;

    const dateTicks = scaleTime()
      .domain([min, max])
      .ticks(24)
      .map((d) => +d);

    return (
      <div>
        {this.renderDateTime(selected, "Selected")}
        <div style={{ margin: "5%", height: 120, width: "90%" }}>
          <Slider
            mode={1}
            step={halfHour}
            domain={[+min, +max]}
            rootStyle={sliderStyle}
            onChange={this.onChange}
            values={[+selected]}
          >
            <Rail>
              {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div>
                  {handles.map((handle) => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={[+min, +max]}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks right={false}>
              {({ tracks, getTrackProps }) => (
                <div>
                  {tracks.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>
            <Ticks values={dateTicks}>
              {({ ticks }) => (
                <div>
                  {ticks.map((tick) => (
                    <Tick
                      key={tick.id}
                      tick={tick}
                      count={ticks.length}
                      format={formatTick}
                    />
                  ))}
                </div>
              )}
            </Ticks>
          </Slider>
        </div>
      </div>
    );
  }
}
   
export default Timebar;