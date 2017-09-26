/* @noflow */

'use strict';

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsv$/,
        use: ['dsv-loader?delimiter=\t'],
      },
    ],
  },
};
