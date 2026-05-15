import * as DASH from '../../../../src/index';

const {AdaptationSet, BaseURL, EssentialProperty, MPD, Period, Representation, SupplementalProperty} = DASH;

export const obj = new MPD({
  children: [
    new Period({
      children: [
        new AdaptationSet({
          children: [
            new SupplementalProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2014',
              value: '1, 0, 0, 1920, 1080, 3840, 1080, 0',
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'left_panorama.mp4',
                }),
              ],
              id: 'left_panorama',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c01e',
              bandwidth: 5_000_000,
              width: 1920,
              height: 1080,
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
              value: '1, 1920, 0, 1920, 1080, 3840, 1080, 0',
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'right_panorama.mp4',
                }),
              ],
              id: 'right_panorama',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c01e',
              bandwidth: 5_000_000,
              width: 1920,
              height: 1080,
            }),
          ],
          segmentAlignment: true,
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new EssentialProperty({
              schemeIdUri: 'urn:mpeg:dash:srd:2016',
              value: '1, roi-coordinates',
            }),
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'zoomed_part.mp4',
                }),
              ],
              id: 'zoomed',
              mimeType: 'video/mp4',
              codecs: 'avc1.42c01e',
              bandwidth: 5_000_000,
              width: 1920,
              height: 1080,
            }),
          ],
          segmentAlignment: true,
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new Representation({
              children: [
                new BaseURL({
                  textContent: 'roi_coordinates.mp4',
                }),
              ],
              id: 'roi-coordinates',
              codecs: '2dcc',
              bandwidth: 100,
              associationIds: [
                'zoomed',
              ],
              associationTypes: [
                'cdsc',
              ],
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
