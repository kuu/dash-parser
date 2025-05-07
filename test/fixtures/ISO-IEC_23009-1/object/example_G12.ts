import * as DASH from '../../../../src/index';

const {
  MPD,
  Period,
  BaseURL,
  AdaptationSet,
  Representation,
  SegmentTemplate,
  SupplementalProperty,
} = DASH;

export const obj = new MPD({
  xmlns: {
    '': 'urn:mpeg:dash:schema:mpd:2011',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  },
  prefixedAttributes: {
    xsi: {
      schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
    },
  },
  type: 'dynamic',
  minimumUpdatePeriod: 10,
  timeShiftBufferDepth: 600,
  minBufferTime: 2,
  profiles: 'urn:mpeg:dash:profile:isoff-main:2011',
  publishTime: new Date('2014-10-17T17:17:05Z'),
  availabilityStartTime: new Date('2014-10-17T17:17:05Z'),
  children: [
    new Period({
      id: '1',
      start: 0,
      children: [
        new BaseURL({
          textContent: 'http://example.com/1/',
        }),
        new SegmentTemplate({
          media: './$RepresentationID$/$Number$.m4s',
          initialization: '$RepresentationID$-init.mp4',
        }),
        new AdaptationSet({
          id: 1,
          mimeType: 'video/mp4',
          codecs: 'hev1.A1.80.L93.B0',
          segmentAlignment: true,
          startWithSAP: 1,
          children: [
            new SegmentTemplate({
              timescale: 25,
              duration: 25,
            }),
            new Representation({
              id: 'v2048',
              bandwidth: 2_048_000,
            }),
            new Representation({
              id: 'v1024',
              bandwidth: 1_024_000,
            }),
            new Representation({
              id: 'v512',
              bandwidth: 512_000,
            }),
            new Representation({
              id: 'v128',
              bandwidth: 128_000,
            }),
          ],
        }),
        new AdaptationSet({
          id: 2,
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40.2',
          segmentAlignment: true,
          startWithSAP: 1,
          bitstreamSwitching: true,
          children: [
            new SegmentTemplate({
              timescale: 20,
              duration: 20,
            }),
            new Representation({
              id: 'a128',
              bandwidth: 128_000,
            }),
            new Representation({
              id: 'a64',
              bandwidth: 64_000,
            }),
          ],
        }),
      ],
    }),
    new Period({
      id: '2',
      start: 1000,
      children: [
        new BaseURL({
          textContent: 'http://example.com/2/',
        }),
        new SegmentTemplate({
          media: './$RepresentationID$/$Number$.m4s',
          initialization: '$RepresentationID$-init.mp4',
        }),
        new AdaptationSet({
          id: 1,
          mimeType: 'video/mp4',
          codecs: 'hev1.A1.80.L93.B0',
          segmentAlignment: true,
          startWithSAP: 1,
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:period-continuity:2015',
              value: '1',
            }),
            new SegmentTemplate({
              timescale: 25,
              duration: 25,
              presentationTimeOffset: 25_000,
            }),
            new Representation({
              id: 'v2048',
              bandwidth: 2_048_000,
            }),
            new Representation({
              id: 'v1024',
              bandwidth: 1_024_000,
            }),
            new Representation({
              id: 'v512',
              bandwidth: 512_000,
            }),
            new Representation({
              id: 'v128',
              bandwidth: 128_000,
            }),
          ],
        }),
        new AdaptationSet({
          id: 2,
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40.2',
          segmentAlignment: true,
          startWithSAP: 1,
          bitstreamSwitching: true,
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:period-continuity:2015',
              value: '1',
            }),
            new SegmentTemplate({
              timescale: 20,
              duration: 20,
              presentationTimeOffset: 20_000,
            }),
            new Representation({
              id: 'a128',
              bandwidth: 128_000,
            }),
            new Representation({
              id: 'a64',
              bandwidth: 64_000,
            }),
          ],
        }),
      ],
    }),
  ],
});
