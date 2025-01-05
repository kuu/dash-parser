import * as DASH from '../../src/index';

describe('API check', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: false,
    });
  });

  test('Set global options', () => {
    expect(DASH.getOptions().strictMode).toBeFalsy();
    DASH.setOptions({strictMode: true});
    expect(DASH.getOptions().strictMode).toBe(true);

    expect(DASH.getOptions().silent).toBeFalsy();
    DASH.setOptions({silent: true});
    expect(DASH.getOptions().strictMode).toBe(true);
    expect(DASH.getOptions().silent).toBe(true);
  });

  test('Prase manifest', () => {
    expect(typeof DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="0"/>
      </MPD>
    `)).toBe('object');
  });

  test('Convert object to string', () => {
    expect(typeof DASH.stringify(
      new DASH.MPD({
        minBufferTime: 2,
        profiles: ['urn:mpeg:dash:profile:isoff-on-demand:2011'],
        children: [new DASH.Period({duration: 0})],
      }),
    )).toBe('string');
  });

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
