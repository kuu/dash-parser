import * as DASH from '../../../../src/index';

const {MPD, BaseURL, Period, AdaptationSet, ContentComponent, Representation, SubRepresentation, SegmentBase} = DASH;

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
          mimeType: 'video/mp4',
          codecs: 'avc2.4D401E,avc1.4D401E,mp4a.40',
          width: 640,
          height: 480,
          frameRate: [30, 1],
          lang: 'en',
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 2,
          children: [
            new ContentComponent({
              id: '0',
              contentType: 'video',
            }),
            new ContentComponent({
              id: '1',
              contentType: 'audio',
            }),
            new Representation({
              id: 'tag0',
              bandwidth: 512_000,
              children: [
                new BaseURL({
                  textContent: 'video-512k.mp4',
                }),
                new SubRepresentation({
                  level: 0,
                  contentComponents: ['0'],
                  bandwidth: 128_000,
                  codecs: 'avc1.4D401E',
                  maxPlayoutRate: 4,
                }),
                new SubRepresentation({
                  level: 1,
                  dependencyLevels: [0],
                  contentComponents: ['0'],
                  bandwidth: 320_000,
                  codecs: 'avc2.4D401E',
                }),
                new SubRepresentation({
                  level: 2,
                  contentComponents: ['1'],
                  bandwidth: 64_000,
                  codecs: 'mp4a.40',
                }),
                new SegmentBase({
                  indexRange: [7632, 7632],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
