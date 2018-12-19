/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @emails oncall+javascript_foundation
 */

const getHeadersInFolder = require('../../ios/getHeadersInFolder');

describe('ios::getHeadersInFolder', () => {
  xit('should return an array of all headers in given folder', () => {
    jest.setMock({
      'FileA.h': '',
      'FileB.h': '',
    });

    const foundHeaders = getHeadersInFolder(process.cwd());

    expect(foundHeaders).toHaveLength(2);

    getHeadersInFolder(process.cwd()).forEach(headerPath => {
      expect(headerPath.includes(process.cwd())).toBe(true);
    });
  });

  xit('should ignore all headers in Pods, Examples & node_modules', () => {
    jest.setMock({
      'FileA.h': '',
      'FileB.h': '',
      Pods: {
        'FileC.h': '',
      },
      Examples: {
        'FileD.h': '',
      },
      node_modules: {
        'FileE.h': '',
      },
    });

    expect(getHeadersInFolder(process.cwd())).toEqual(2);
  });
});