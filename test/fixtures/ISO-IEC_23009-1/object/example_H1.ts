import * as DASH from '../../../../src/index';

const {AdaptationSet, BaseURL, MPD, Period, ProgramInformation, Representation, Role, SegmentBase, SupplementalProperty, Title} = DASH;

export const obj = new MPD({
  children: [
    new ProgramInformation({
      children: [
        new Title({
          textContent: 'Example of a DASH Media Presentation Description using Spatial Relationship Description to indicate that a video is a zoomed part of another',
        }),
      ],
    }),
    new Period({
      children: [
        new AdaptationSet({
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '0,0,0,3,3,3,3',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'panorama_video.mp4',
                }),
                new SegmentBase({
                  indexRangeExact: true,
                  indexRange: [
                    839,
                    990,
                  ],
                }),
              ],
              id: '1',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c033',
              width: 1920,
              height: 1080,
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
              value: '0,1,1,1,1,3,3',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'supplementary',
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'zoomed_video.mp4',
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
              codecs: 'avc1.42c028',
              width: 1920,
              height: 1080,
              bandwidth: 769_458,
              startWithSAP: 1,
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
