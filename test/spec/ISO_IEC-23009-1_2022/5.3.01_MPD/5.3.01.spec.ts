import {expect} from '@jest/globals';
import * as DASH from '../../../../src/index';
import {stripCommentsAndLineBreaks} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.1.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('mandatory props/children: success', () => {
    // @profiles
    // @minBufferTime
    // Period 1..N
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand"
        minBufferTime="PT2S"
      >
        <Period/>
      </MPD>
    `;
    const expected = new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand',
      minBufferTime: 2,
    });
    expected.addElement(new DASH.Period());
    expect(DASH.parse(xml)).toEqual(expected);
    expect(stripCommentsAndLineBreaks(DASH.stringify(expected) ?? '')).toEqual(stripCommentsAndLineBreaks(xml));
  });

  test('mandatory props/children: failure-01', () => {
    // - @profiles
    // @minBufferTime
    // Period 1..N
    expect(() => DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        minBufferTime="PT2S"
      >
        <Period />
      </MPD>
    `)).toThrow();
  });

  test('mandatory props/children: failure-02', () => {
    // @profiles
    // - @minBufferTime
    // Period 1..N
    expect(() => DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand"
      >
        <Period />
      </MPD>
    `)).toThrow();
  });

  test('mandatory props/children: failure-03', () => {
    // @profiles
    // @minBufferTime
    // - Period 1..N
    expect(() => DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand"
        minBufferTime="PT2S"
      />
    `)).toThrow();
  });

  test('@id: success', () => {
    /*
     @id specifies an identifier for the Media Presentation.
     It is recommended to use an identifier that is unique within the scope in which the Media Presentation is published.
     If not specified, no MPD-internal identifier is provided.
     However, for example the URL to the MPD may be used as an identifier for the Media Presentation.
     */
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand"
        minBufferTime="PT2S"
        id="1234567890"
      >
        <Period/>
      </MPD>
    `;
    const expected = new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand',
      minBufferTime: 2,
      id: '1234567890',
    });
    expected.addElement(new DASH.Period());
    expect(DASH.parse(xml)).toEqual(expected);
    expect(stripCommentsAndLineBreaks(DASH.stringify(expected) ?? '')).toEqual(stripCommentsAndLineBreaks(xml));
  });

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});

/*
describe('ISO_IEC-23009-1_2022/5.3.01_MPD', () => {
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <MPD
        xmlns="urn:mpeg:dash:schema:mpd:2011"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd"
        profiles="urn:mpeg:dash:profile:isoff-on-demand"
        type="static"
        mediaPresentationDuration="PT0H0M30.0S"
        minBufferTime="PT2S"
        availabilityStartTime="2022-01-01T00:00:00Z"
        publishTime="2022-01-01T00:00:00Z"
        minimumUpdatePeriod="PT1S"
        timeShiftBufferDepth="PT0H0M30.0S"
        suggestedPresentationDelay="PT0S"
        maxSegmentDuration="PT0H0M10.0S"
        maxSubsegmentDuration="PT0H0M2.0S"
    >
        <Period id="1" start="PT0S" duration="PT0H0M30.0S">
        <AdaptationSet id="1" contentType="video" mimeType="video/mp4" codecs="avc1.4d401f" frameRate="24" width="1280" height="720" sar="1:1" startWithSAP="1" bandwidth="1000000">
            <SegmentTemplate media="video-$Number$.mp4" initialization="video-init.mp4" startNumber="1" timescale="90000" duration="900000" />
            <Representation id="1" bandwidth="1000000" />
        </AdaptationSet>
        <AdaptationSet id="2" contentType="audio" mimeType="audio/mp4" codecs="mp4a.40.2" startWithSAP="1" bandwidth="128000">
            <SegmentTemplate media="audio-$Number$.mp4" initialization="audio-init.mp4" startNumber="1" timescale="44100" duration="441000" />
            <Representation id="1" bandwidth="128000" />
        </AdaptationSet>
        </Period>
    </MPD>
  `;
  const expected = {
    MPD: {
      '@': {
        xmlns: 'urn:mpeg:dash:schema:mpd:2011',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
        profiles: 'urn:mpeg:dash:profile:isoff-on-demand',
        type: 'static',
        mediaPresentationDuration: 'PT0H0M30.0S',
        minBufferTime: 'PT2S',
        availabilityStartTime: '2022-01-01T00:00:00Z',
        publishTime: '2022-01-01T00:00:00Z',
        minimumUpdatePeriod: 'PT1S',
        timeShiftBufferDepth: 'PT0H0M30.0S',
        suggestedPresentationDelay: 'PT0S',
        maxSegmentDuration: 'PT0H0M10.0S',
        maxSubsegmentDuration: 'PT0H0M2.0S',
      },
      Period: {
        '@': {
          id: 1,
          start: 'PT0S',
          duration: 'PT0H0M30.0S',
        },
        AdaptationSet: [
          {
            '@': {
              id: 1,
              contentType: 'video',
              mimeType: 'video/mp4',
              codecs: 'avc1.4d401f',
              frameRate: 24,
              width: 1280,
              height: 720,
              sar: '1:1',
              startWithSAP: 1,
              bandwidth: 1_000_000,
            },
            SegmentTemplate: {
              '@': {
                media: 'video-$Number$.mp4',
                initialization: 'video-init.mp4',
                startNumber: 1,
                timescale: 90_000,
                duration: 900_000,
              },
            },
            Representation: {
              '@': {
                id: 1,
                bandwidth: 1_000_000,
              },
            },
          },
          {
            '@': {
              id: 2,
              contentType: 'audio',
              mimeType: 'audio/mp4',
              codecs: 'mp4a.40.2',
              startWithSAP: 1,
              bandwidth: 128_000,
            },
            SegmentTemplate: {
              '@': {
                media: 'audio-$Number$.mp4',
                initialization: 'audio-init.mp4',
                startNumber: 1,
                timescale: 44_100,
                duration: 441_000,
              },
            },
            Representation: {
              '@': {
                id: 1,
                bandwidth: 128_000,
              },
            },
          },
        ],
      },
    },
  };
  test('MPD', () => {
    expect(DASH.parse(xml)).toEqual(expected);
    expect(DASH.stringify(expected)).toBe(xml);
  });
});
*/
