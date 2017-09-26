/* @noflow */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { timeParse } from 'd3-time-format';
import Chart from './Chart';
import Line from './Line';

storiesOf('Line', module).add('default', () => {
  const tsv = require('./__fixtures__/simple-line.tsv');
  const parseTime = timeParse('%d-%b-%y');
  const data = tsv.map(d => ({
    date: parseTime(d.date),
    close: +d.close,
  }));

  const width = 500;
  const height = 300;
  const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
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
    </Chart>
  );
});
