import * as DASH from '../../../../src/index';

const {
  MPD,
  BaseURL,
  Period,
  AdaptationSet,
  Representation,
  SegmentBase,
  ProgramInformation,
  Title,
  EmptyAdaptationSet,
  EssentialProperty,
  SupplementalProperty,
  Role,
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
  availabilityStartTime: new Date('2015-05-30T09:30:10Z'),
  minimumUpdatePeriod: 10,
  minBufferTime: 1,
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
  publishTime: new Date('2015-05-30T09:30:10Z'),
  children: [
    new ProgramInformation({
      children: [
        new Title({
          textContent: 'Example of a DASH Media Presentation Description using Spatial Relationships Description to indicate tiles of a video',
        }),
      ],
    }),
    new Period({
      id: '1',
      children: [
        new AdaptationSet({
          segmentAlignment: true,
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,0,0,2,2,2,2',
            }),
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:sai:2014',
              value: '1',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new Representation({
              id: '1',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c01e',
              width: 640,
              height: 360,
              bandwidth: 226_597,
              startWithSAP: 1,
              children: [
                new BaseURL({
                  textContent: 'full_video_small.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [837, 988],
                }),
              ],
            }),
            new Representation({
              id: '2',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c01f',
              width: 1280,
              height: 720,
              bandwidth: 553_833,
              startWithSAP: 1,
              children: [
                new BaseURL({
                  textContent: 'full_video_hd.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [838, 989],
                }),
              ],
            }),
            new Representation({
              id: '3',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c033',
              width: 3840,
              height: 2160,
              bandwidth: 1_055_223,
              startWithSAP: 1,
              children: [
                new BaseURL({
                  textContent: 'full_video_4k.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [839, 990],
                }),
              ],
            }),
          ],
        }),
        new EmptyAdaptationSet({
          children: [
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:mpd-as-linking:2015',
              value: 'http://example.com/service1/my.mpd#period=1&as=video',
            }),
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,0,0,1,1,2,2',
            }),
          ],
        }),
        new EmptyAdaptationSet({
          children: [
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:mpd-as-linking:2015',
              value: 'http://example.com/service2/my.mpd#period=1&as=video timeOffset=70000',
            }),
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,1,0,1,1',
            }),
          ],
        }),
        new EmptyAdaptationSet({
          children: [
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:mpd-as-linking:2015',
              value: 'http://example.com/service3/my.mpd#period=1&as=video timeOffset=100000',
            }),
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,0,1,1,1',
            }),
          ],
        }),
        new EmptyAdaptationSet({
          children: [
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:mpd-as-linking:2015',
              value: 'http://example.com/service4/my.mpd#period=1&as=video timeOffset=120000',
            }),
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,1,1,1,1',
            }),
          ],
        }),
      ],
    }),
  ],
});
