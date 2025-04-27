import * as DASH from '../../../../src/index';

const {MPD, Period, SegmentList, Initialization, AdaptationSet, Role, Representation, BaseURL, SegmentURL} = DASH;

export const obj = new MPD({
  xmlns: {
    '': 'urn:mpeg:dash:schema:mpd:2011',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  },
  xsi: {
    schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
  },
  type: 'static',
  mediaPresentationDuration: 3256,
  minBufferTime: 10,
  profiles: 'urn:mpeg:dash:profile:isoff-main:2011',
  children: [
    new BaseURL({
      textContent: 'http://www.example.com/',
    }),
    new Period({
      start: 0,
      duration: 2000,
      children: [
        new SegmentList({
          children: [
            new Initialization({
              sourceURL: 'seg-m-init.mp4',
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'avc1.640828',
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:stereoid:2011',
              value: 'l1 r0',
            }),
            new Representation({
              id: 'C2',
              bandwidth: 128_000,
              children: [
                new SegmentList({
                  duration: 10,
                  children: [
                    new SegmentURL({
                      media: 'seg-m1-C2view-1.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C2view-2.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C2view-3.mp4',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'avc1.640828',
          children: [
            new Representation({
              id: 'C2',
              bandwidth: 128_000,
              children: [
                new SegmentList({
                  duration: 10,
                  children: [
                    new SegmentURL({
                      media: 'seg-m1-C2view-1.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C2view-2.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C2view-3.mp4',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'mvc1.760028',
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:stereoid:2011',
              value: 'l0',
            }),
            new Representation({
              id: 'C1',
              dependencyIds: ['C2'],
              bandwidth: 192_000,
              children: [
                new SegmentList({
                  duration: 10,
                  children: [
                    new SegmentURL({
                      media: 'seg-m1-C1view-1.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C1view-2.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C1view-3.mp4',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'mvc1.760028',
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:stereoid:2011',
              value: 'r1',
            }),
            new Representation({
              id: 'C3',
              dependencyIds: ['C2'],
              bandwidth: 192_000,
              children: [
                new SegmentList({
                  duration: 10,
                  children: [
                    new SegmentURL({
                      media: 'seg-m1-C3view-1.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C3view-2.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C3view-3.mp4',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Period({
      duration: 1256,
      children: [
        new SegmentList({
          children: [
            new Initialization({
              sourceURL: 'seg-m-init-2.mp4',
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'avc1.640828',
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:stereoid:2011',
              value: 'r0',
            }),
            new Representation({
              id: 'C2',
              bandwidth: 128_000,
              children: [
                new SegmentList({
                  duration: 10,
                  children: [
                    new SegmentURL({
                      media: 'seg-m1-C2view-201.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C2view-202.mp4',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'mvc1.760028',
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:stereoid:2011',
              value: 'l0',
            }),
            new Representation({
              id: 'C1',
              dependencyIds: ['C2'],
              bandwidth: 192_000,
              children: [
                new SegmentList({
                  duration: 10,
                  children: [
                    new SegmentURL({
                      media: 'seg-m1-C1view-201.mp4',
                    }),
                    new SegmentURL({
                      media: 'seg-m1-C1view-202.mp4',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
