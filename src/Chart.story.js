/* @noflow */

import React from 'react';
import { storiesOf } from '@storybook/react';
import Chart from './Chart';

storiesOf('Chart', module)
  .add('default', () => (
    <Chart width={400} height={300} />
  ));
