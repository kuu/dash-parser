import * as DASH from '../../src/index';
import {
  print,
  printError,
} from '../../src/utils';

describe('Logging', () => {
  beforeAll(() => {
    DASH.setOptions({silent: false});
  });

  test('Print on/off', () => {
    const logSpy = jest.spyOn(console, 'log');
    DASH.setOptions({silent: false});
    print('test-1');
    expect(logSpy).toHaveBeenCalledWith('test-1');
    DASH.setOptions({silent: true});
    print('test-2');
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test('Print error on/off', () => {
    const errorSpy = jest.spyOn(console, 'error');
    DASH.setOptions({silent: false});
    printError('error-1');
    expect(errorSpy).toHaveBeenCalledWith('error-1');
    DASH.setOptions({silent: true});
    printError('error-2');
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  afterAll(() => {
    DASH.setOptions({silent: true});
  });
});
