/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import cx from 'classnames';
import warning from 'warning';

export default class GridLines extends React.Component {
  static contextTypes = {
    chart: PropTypes.object.isRequired,
  };

  static propTypes = {
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    style: PropTypes.object,
    containerStyle: PropTypes.object,
    x: PropTypes.func,
    y: PropTypes.func,
    tickCount: PropTypes.number,
  };

  static defaultProps = {
    tickCount: 5,
  };

  componentWillMount() {
    warning(
      this.props.x !== undefined || this.props.y !== undefined,
      'Expected <GridLines> to be called with `x`, `y`, or both `x` and `y`, ' +
        'where `x` and `y` are scales defined through `d3-axis`.',
    );
  }

  componentDidMount() {
    const { x, y, tickCount } = this.props;
    const { chart } = this.context;
    const { xLines, yLines } = this;

    if (x !== undefined) {
      select(xLines).call(
        axisBottom(x)
          .ticks(tickCount)
          .tickSize(-chart.height)
          .tickFormat(''),
      );
    }

    if (y !== undefined) {
      select(yLines).call(
        axisLeft(y)
          .ticks(tickCount)
          .tickSize(-chart.width)
          .tickFormat(''),
      );
    }
  }

  render() {
    const {
      x,
      y,
      className,
      style,
      containerStyle,
      containerClassName,
    } = this.props;
    const { chart } = this.context;
    const lineClassName = cx('GridLine', className);

    return (
      <g className={containerClassName} style={containerStyle}>
        <g
          style={style}
          className={lineClassName}
          ref={el => (this.xLines = el)}
          style={{
            transform: `translateY(${chart.height}px)`,
          }}
        />
        <g
          style={style}
          className={lineClassName}
          ref={el => (this.yLines = el)}
        />
      </g>
    );
  }
}
