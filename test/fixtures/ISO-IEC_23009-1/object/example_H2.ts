import * as DASH from '../../../../src/index';

const {AdaptationSet, BaseURL, MPD, Period, ProgramInformation, Representation, Role, SegmentBase, SupplementalProperty, Title} = DASH;

export const obj = new MPD({
  children: [
    new ProgramInformation({
      children: [
        new Title({
          textContent: 'Example of a DASH Media Presentation Description using Spatial Relationship Description to indicate tiles of a video',
        }),
      ],
    }),
    new Period({
      children: [
        new AdaptationSet({
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,0,0,2,2,2,2',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'full_video_small.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [
                    837,
                    988,
                  ],
                }),
              ],
              id: '1',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c01e',
              width: 640,
              height: 360,
              bandwidth: 226_597,
              startWithSAP: 1,
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'full_video_hd.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [
                    838,
                    989,
                  ],
                }),
              ],
              id: '2',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c01f',
              width: 1280,
              height: 720,
              bandwidth: 553_833,
              startWithSAP: 1,
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'full_video_4k.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [
                    839,
                    990,
                  ],
                }),
              ],
              id: '3',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c033',
              width: 3840,
              height: 2160,
              bandwidth: 1_055_223,
              startWithSAP: 1,
            }),
          ],
          segmentAlignment: true,
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,0,0,1,1,2,2',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'supplementary',
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'tile1_video_small.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [
                    837,
                    988,
                  ],
                }),
              ],
              id: '4',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c00d',
              width: 640,
              height: 360,
              bandwidth: 218_284,
              startWithSAP: 1,
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'tile1_video_hd.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [
                    838,
                    989,
                  ],
                }),
              ],
              id: '5',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c01f',
              width: 1280,
              height: 720,
              bandwidth: 525_609,
              startWithSAP: 1,
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'tile1_video_fullhd.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [
                    839,
                    990,
                  ],
                }),
              ],
              id: '6',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c028',
              width: 1920,
              height: 1080,
              bandwidth: 769_514,
              startWithSAP: 1,
            }),
          ],
          segmentAlignment: true,
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,1,0,1,1,2,2',
            }),
          ],
          segmentAlignment: true,
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,1,1,1,1,2,2',
            }),
          ],
          segmentAlignment: true,
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,0,1,1,1,2,2',
            }),
          ],
          segmentAlignment: true,
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
        }),
      ],
    }),
  ],
  type: 'static',
  mediaPresentationDuration: 10,
  minBufferTime: 1,
  profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
  xmlns: {
    '': 'urn:mpeg:dash:schema:mpd:2011',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  },
  prefixedAttributes: {
    xsi: {
      schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
    },
  },
});
