/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import * as axis from 'd3-axis';
import { select } from 'd3-selection';

type Direction = 'left' | 'right' | 'top' | 'bottom';

const directions = {
  left: axis.axisLeft,
  right: axis.axisRight,
  top: axis.axisTop,
  bottom: axis.axisBottom,
};

export default class Axis extends React.Component {
  static contextTypes = {
    chart: PropTypes.object,
  };

  static propTypes = {
    align: PropTypes.oneOf(Object.keys(directions)),
  };

  componentDidMount() {
    const { align, scale } = this.props;
    const { chart } = this.context;

    select(this.node).call(directions[align](scale));
  }

  render() {
    const { align } = this.props;
    const { chart } = this.context;
    let transform = null;

    if (align === 'bottom') {
      transform = `translate(0,${chart.height}px)`;
    }

    if (align === 'right') {
      transform = `translate(${chart.width}px,0)`;
    }

    return <g ref={el => (this.node = el)} style={{ transform }} />;
  }
}
