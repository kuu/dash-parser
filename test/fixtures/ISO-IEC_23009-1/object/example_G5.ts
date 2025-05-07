import * as DASH from '../../../../src/index';

const {MPD, Period, SegmentList, Initialization, AdaptationSet, Role, Representation, BaseURL, SegmentBase, SegmentURL} = DASH;

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
  minBufferTime: 1.2,
  profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
  children: [
    new BaseURL({
      textContent: 'http://cdn1.example.com/',
    }),
    new BaseURL({
      textContent: 'http://cdn2.example.com/',
    }),
    // In this Period the SVC stream is split into three representations
    new Period({
      children: [
        new AdaptationSet({
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 2,
          minBandwidth: 512_000,
          maxBandwidth: 1_024_000,
          width: 640,
          height: 480,
          frameRate: [30, 1],
          lang: 'en',
          children: [
            // Independent Representation
            new Representation({
              mimeType: 'video/mp4',
              codecs: 'avc1.4D401E,mp4a.40',
              id: 'tag5',
              bandwidth: 512_000,
              children: [
                new BaseURL({
                  textContent: 'video-512k.mp4',
                }),
                new SegmentBase({
                  indexRange: [0, 4332],
                }),
              ],
            }),
            // Representation dependent on above
            new Representation({
              mimeType: 'video/mp4',
              codecs: 'avc2.56401E',
              id: 'tag6',
              dependencyIds: ['tag5'],
              bandwidth: 768_000,
              children: [
                new BaseURL({
                  textContent: 'video-768k.mp4',
                }),
                new SegmentBase({
                  indexRange: [0, 3752],
                }),
              ],
            }),
            // Representation dependent on both above
            new Representation({
              mimeType: 'video/mp4',
              codecs: 'avc2.56401E',
              id: 'tag7',
              dependencyIds: ['tag5', 'tag6'],
              bandwidth: 1_024_000,
              children: [
                new BaseURL({
                  textContent: 'video-1024k.mp4',
                }),
                new SegmentBase({
                  indexRange: [0, 3752],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
