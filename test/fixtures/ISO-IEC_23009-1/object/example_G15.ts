import * as DASH from '../../../../src/index';

const {AdaptationSet, EssentialProperty, MPD, Period, Representation, Role, S, SegmentTemplate, SegmentTimeline} = DASH;

export const obj = new MPD({
  children: [
    new Period({
      children: [
        new AdaptationSet({
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 12_000,
                      r: 154,
                    }),
                  ],
                }),
              ],
              timescale: 5994,
              media: 'video_$Number$.mp4',
              initialization: 'video.mp4',
            }),
            new Representation({
              id: '1',
              bandwidth: 3_732_256,
              codecs: 'hev1.1.6.L120.90',
              width: 1920,
              height: 1080,
            }),
          ],
          id: 1,
          mimeType: 'video/mp4',
          segmentAlignment: true,
          startWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:preselection:2016',
              value: '1,2 3',
            }),
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:preselection:2016',
              value: '2,2 4',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 90_112,
                      r: 133,
                    }),
                  ],
                }),
              ],
              timescale: 48_000,
              media: 'audio0_$Number$.mp4',
              initialization: 'audio0.mp4',
            }),
            new Representation({
              id: '2',
              bandwidth: 132_669,
              audioSamplingRate: 48_000,
            }),
          ],
          id: 2,
          mimeType: 'audio/mp4',
          codecs: 'mhm2.0x0C',
          segmentAlignment: true,
          startWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:preselection:2016',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 90_112,
                      r: 133,
                    }),
                  ],
                }),
              ],
              timescale: 48_000,
              media: 'audio1_$Number$.mp4',
              initialization: 'audio1.mp4',
            }),
            new Representation({
              id: '3',
              bandwidth: 32_494,
              audioSamplingRate: 48_000,
            }),
          ],
          id: 3,
          mimeType: 'audio/mp4',
          lang: 'en',
          codecs: 'mhm2.0x0C',
          segmentAlignment: true,
          startWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:preselection:2016',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'dub',
            }),
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 90_112,
                      r: 133,
                    }),
                  ],
                }),
              ],
              timescale: 48_000,
              media: 'audio2_$Number$.mp4',
              initialization: 'audio2.mp4',
            }),
            new Representation({
              id: '4',
              bandwidth: 32_494,
              audioSamplingRate: 48_000,
            }),
          ],
          id: 4,
          mimeType: 'audio/mp4',
          lang: 'es',
          codecs: 'mhm2.0x0C',
          segmentAlignment: true,
          startWithSAP: 1,
        }),
      ],
      id: '1',
      start: 0,
    }),
  ],
  type: 'dynamic',
  availabilityStartTime: new Date('2018-12-20T06:04:22.000Z'),
  publishTime: new Date('2018-12-20T06:04:22.000Z'),
  minimumUpdatePeriod: 2,
  mediaPresentationDuration: 249.708,
  minBufferTime: 4,
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
  xmlns: {
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    '': 'urn:mpeg:dash:schema:mpd:2011',
  },
  prefixedAttributes: {
    xsi: {
      schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
    },
  },
});
