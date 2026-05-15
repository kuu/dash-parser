import * as DASH from '../../../../src/index';

const {MPD, BaseURL, Period, AdaptationSet, EventStream, Event, Representation, SegmentTemplate, SegmentTimeline, S, InbandEventStream} = DASH;

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
  minimumUpdatePeriod: 2,
  timeShiftBufferDepth: 30 * 60,
  availabilityStartTime: new Date('2011-12-25T12:30:00'),
  minBufferTime: 4,
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
  publishTime: new Date('2011-12-25T12:30:00'),
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
        new EventStream({
          schemeIdUri: 'urn:uuid:XYZY',
          timescale: 1000,
          value: 'call',
          children: [
            new Event({
              presentationTime: 0,
              duration: 10_000,
              id: 0,
              messageData: '+ 1 800 10101010',
            }),
            new Event({
              presentationTime: 20_000,
              duration: 10_000,
              id: 1,
              messageData: '+ 1 800 10101011',
            }),
            new Event({
              presentationTime: 40_000,
              duration: 10_000,
              id: 2,
              messageData: '+ 1 800 10101012',
            }),
            new Event({
              presentationTime: 60_000,
              duration: 10_000,
              id: 3,
              messageData: '+ 1 800 10101013',
            }),
          ],
        }),
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
              children: [
                new InbandEventStream({
                  schemeIdUri: 'urn:mpeg:dash:event:2012',
                  value: '1',
                }),
                new InbandEventStream({
                  schemeIdUri: 'urn:org:example:event',
                  value: 'avail',
                }),
              ],
            }),
          ],
        }),
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
