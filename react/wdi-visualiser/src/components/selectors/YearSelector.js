import React, {Component} from 'react'
import { connect } from 'react-redux';

// actions
import { updateMLParams } from '../../actions/modelActions';

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

const sliderStyle = {  // Give the slider some width
    position: 'relative',
    width: '100%',
    height: 80,
    border: '1px solid steelblue',
  }
  
const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#8B9CB6',
  }

export function Handle({
    handle: { id, value, percent },
    getHandleProps
  }) {
    return (
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          marginLeft: -15,
          marginTop: 25,
          zIndex: 2,
          width: 30,
          height: 30,
          border: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backgroundColor: '#2C4870',
          color: '#333',
        }}
        {...getHandleProps(id)}
      >
        <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -20 }}>
          {value}
        </div>
      </div>
    )
  }
  
function Track({ source, target, getTrackProps }) {
    return (
      <div
        style={{
          position: 'absolute',
          height: 10,
          zIndex: 1,
          marginTop: 35,
          backgroundColor: '#546C91',
          borderRadius: 5,
          cursor: 'pointer',
          left: `${source.percent}%`,
          width: `${target.percent - source.percent}%`,
        }}
        {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
      />
    )
}

function Tick({ tick, count }) {
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            marginTop: 52,
            marginLeft: -0.5,
            width: 1,
            height: 8,
            backgroundColor: 'silver',
            left: `${tick.percent}%`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            marginTop: 60,
            fontSize: 10,
            textAlign: 'center',
            marginLeft: `${-(100 / count) / 2}%`,
            width: `${100 / count}%`,
            left: `${tick.percent}%`,
          }}
        >
          {tick.value}
        </div>
      </div>
    )
  }

class YearSelector extends Component {

    onChange = years => {
        this.props.updateMLParams("start_year", years[0])
        this.props.updateMLParams("end_year", years[1])
    }

    render() {    
        return (
        <div id='main-area'>
            <div className="header">Select the years of data</div>
            <Slider
                rootStyle={sliderStyle}
                domain={[1960, 2020]}
                step={1}
                mode={2}
                values={[1980, 2010]}
                onChange={this.onChange}
            >
                <Rail>
                {({ getRailProps }) => (
                    <div style={railStyle} {...getRailProps()} />
                )}
                </Rail>
                <Handles>
                {({ handles, getHandleProps }) => (
                    <div className="slider-handles">
                    {handles.map(handle => (
                        <Handle
                        key={handle.id}
                        handle={handle}
                        getHandleProps={getHandleProps}
                        />
                    ))}
                    </div>  
                )}
                
                </Handles>
                <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                    <div className="slider-tracks">
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
                <Ticks count={5 /* generate approximately 15 ticks within the domain */}>
                {({ ticks }) => (
                    <div className="slider-ticks">
                    {ticks.map(tick => (
                        <Tick key={tick.id} tick={tick} count={ticks.length} />
                    ))}
                    </div>
                )}
                </Ticks>
            </Slider>
        </div>
        );
    }

}

// dont think we actually need this at all
const mapStateToProps = (state) => {
  return {
    years: [1960,2020]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMLParams: (target, value) => dispatch(updateMLParams(target, value)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);