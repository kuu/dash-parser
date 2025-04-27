import * as DASH from '../../../../src/index';

const {MPD, Period, AdaptationSet, Representation, BaseURL, SegmentTemplate, SegmentTimeline, S} = DASH;

export const obj = new MPD({
  xmlns: {
    '': 'urn:mpeg:dash:schema:mpd:2011',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  },
  xsi: {
    schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
  },
  type: 'dynamic',
  minimumUpdatePeriod: 2,
  timeShiftBufferDepth: 1800,
  availabilityStartTime: new Date('2014-10-17T17:17:05Z'),
  minBufferTime: 4,
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
  publishTime: new Date('2014-10-17T17:17:05Z'),
  children: [
    new BaseURL({
      textContent: 'http://cdn1.example.com/',
    }),
    new BaseURL({
      textContent: 'http://cdn2.example.com/',
    }),
    new Period({
      id: '1',
      children: [
        // Video
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'avc1.4D401F',
          frameRate: [30_000, 1001],
          segmentAlignment: true,
          startWithSAP: 1,
          children: [
            new BaseURL({
              textContent: 'video/',
            }),
            new SegmentTemplate({
              timescale: 90_000,
              initialization: '$Bandwidth%/init.mp4v',
              media: '$Bandwidth%/$Time$.mp4v',
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 180_180,
                      r: 432,
                    }),
                  ],
                }),
              ],
            }),
            new Representation({
              id: 'v0',
              width: 320,
              height: 240,
              bandwidth: 250_000,
            }),
            new Representation({
              id: 'v1',
              width: 640,
              height: 480,
              bandwidth: 500_000,
            }),
            new Representation({
              id: 'v2',
              width: 960,
              height: 720,
              bandwidth: 1_000_000,
            }),
          ],
        }),
        // English Audio
        new AdaptationSet({
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40',
          lang: 'en',
          segmentAlignment: false,
          startWithSAP: 1,
          children: [
            new SegmentTemplate({
              timescale: 48_000,
              initialization: 'audio/en/init.mp4a',
              media: 'audio/en/$Time$.mp4a',
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 96_000,
                      r: 432,
                    }),
                  ],
                }),
              ],
            }),
            new Representation({
              id: 'a0',
              bandwidth: 64_000,
            }),
          ],
        }),
        // French Audio
        new AdaptationSet({
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40',
          lang: 'fr',
          segmentAlignment: false,
          startWithSAP: 1,
          children: [
            new SegmentTemplate({
              timescale: 48_000,
              initialization: 'audio/fr/init.mp4a',
              media: 'audio/fr/$Time$.mp4a',
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 96_000,
                      r: 432,
                    }),
                  ],
                }),
              ],
            }),
            new Representation({
              id: 'b0',
              bandwidth: 64_000,
            }),
          ],
        }),
      ],
    }),
  ],
});
