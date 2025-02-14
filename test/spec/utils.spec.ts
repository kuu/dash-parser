import * as DASH from '../../src/index';
import {
  print,
  printError,
  fromTemporalDurationString,
  toTemporalDurationString,
  fromByteRangeString,
  toByteRangeString,
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

  test('fromTemporalDurationString', () => {
    expect(fromTemporalDurationString('P1DT1H1M1.1001S')).toBe(90_061.1001); // One day, one hour, one minute, one second, and 100 milliseconds
    expect(fromTemporalDurationString('P40D')).toBe(3_456_000); // Forty days
    expect(fromTemporalDurationString('P3DT4H59M')).toBe(277_140); // Three days, four hours and 59 minutes
    expect(fromTemporalDurationString('PT2H30M')).toBe(9000); // Two and a half hours
    expect(fromTemporalDurationString('PT1M')).toBe(60); // One minute
    expect(fromTemporalDurationString('PT2.0021S')).toBe(2.0021); // Two seconds, 2.1 milliseconds
    expect(fromTemporalDurationString('PT0S')).toBe(0); // Zero
    expect(fromTemporalDurationString('P0D')).toBe(0); // Zero
  });

  test('toTemporalDurationString', () => {
    expect(toTemporalDurationString(90_061.1001)).toBe('P1DT1H1M1.1001S');
    expect(toTemporalDurationString(3_456_000)).toBe('P40D');
    expect(toTemporalDurationString(277_140)).toBe('P3DT4H59M');
    expect(toTemporalDurationString(9000)).toBe('PT2H30M');
    expect(toTemporalDurationString(60)).toBe('PT1M');
    expect(toTemporalDurationString(2.0021)).toBe('PT2.0021S');
    expect(toTemporalDurationString(0)).toBe('PT0S');
  });

  test('fromByteRangeString', () => {
    expect(fromByteRangeString('')).toBeUndefined();
    expect(fromByteRangeString('a-b')).toBeUndefined();
    expect(fromByteRangeString('-100')).toBeUndefined();
    expect(fromByteRangeString('-100', 99)).toBeUndefined();
    expect(fromByteRangeString('-100', 100)).toEqual([0, 99]);
    expect(fromByteRangeString('-100', 101)).toEqual([1, 100]);
    expect(fromByteRangeString('100-')).toBeUndefined();
    expect(fromByteRangeString('100-', 100)).toBeUndefined();
    expect(fromByteRangeString('100-', 101)).toEqual([100, 100]);
    expect(fromByteRangeString('100-', 102)).toEqual([100, 101]);
    expect(fromByteRangeString('0-99')).toEqual([0, 99]);
    expect(fromByteRangeString('0-99', -1)).toEqual([0, 99]);
    expect(fromByteRangeString('100-200')).toEqual([100, 200]);
    expect(fromByteRangeString('200-100')).toBeUndefined();
  });

  test('toByteRangeString', () => {
    expect(toByteRangeString([0, 99])).toBe('0-99');
    expect(toByteRangeString([100, 200])).toBe('100-200');
  });

  afterAll(() => {
    DASH.setOptions({silent: true});
  });
});
