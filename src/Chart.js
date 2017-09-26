/* @flow */

import React from 'react';
import PropTypes from 'prop-types';

export default class Chart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
  };

  static defaultProps = {
    width: 960,
    height: 500,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    },
  };

  static childContextTypes = {
    chart: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      chartRef: PropTypes.any,
      margin: PropTypes.object,
    }),
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      ref: null,
    };
  }

  getChildContext() {
    const { margin, width, height } = this.props;

    return {
      chart: {
        margin,
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom,
        ref: this.state.ref,
      },
    };
  }

  handleRef = el => {
    if (this.chart !== undefined) {
      return;
    }
    this.setState({ ref: el }, () => (this.chart = el));
  };

  render() {
    const { margin, width, height } = this.props;
    const transform = `translate(${margin.left}px,${margin.top}px)`;

    return (
      <svg width={width} height={height} ref={this.handleRef}>
        <g transform={transform}>{this.props.children}</g>
      </svg>
    );
  }
}
