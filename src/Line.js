/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { line } from 'd3-shape';

type Props = {
  d: Array<any>,
  x: () => mixed,
  y: () => mixed,
  className?: string,
  style?: { [key: string]: any },
};

const Line = ({ d, x, y, className, style }: Props) => {
  const l = line()
    .x(x)
    .y(y);

  return <path d={l(d)} className={className} style={style} />;
};

Line.propTypes = {
  d: PropTypes.array,
  x: PropTypes.func,
  y: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Line;
