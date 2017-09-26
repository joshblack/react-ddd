/* @noflow */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { timeParse } from 'd3-time-format';
import Axis from './Axis';
import Chart from './Chart';
import Line from './Line';

storiesOf('Axis', module)
  .add('default', () => {
    const tsv = require('./__fixtures__/simple-line.tsv');
    const parseTime = timeParse('%d-%b-%y');
    const data = tsv.map(d => ({
      date: parseTime(d.date),
      close: +d.close,
    }));

    const width = 400;
    const height = 300;
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const x = scaleTime()
      .rangeRound([0, width - margin.left - margin.right])
      .domain(extent(data, d => d.date));

    const y = scaleLinear()
      .rangeRound([height - margin.top - margin.bottom, 0])
      .domain(extent(data, d => d.close));

    return (
      <Chart width={width} height={height} margin={margin}>
        <Line
          d={data}
          x={d => x(d.date)}
          y={d => y(d.close)}
          style={{
            fill: 'none',
            stroke: 'steelblue',
            strokeLinejoin: 'round',
            strokeLinecap: 'round',
            strokeWidth: 1.5,
          }}
        />
        <Axis align="left" scale={y} />
        <Axis align="bottom" scale={x} />
      </Chart>
    );
  })
