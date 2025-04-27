import * as DASH from '../../../../src/index';

const {MPD, BaseURL, Period, AdaptationSet, ContentProtection, Representation, drm} = DASH;

export const obj = new MPD({
  xmlns: {
    '': 'urn:mpeg:dash:schema:mpd:2011',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    drm: 'http://example.net/052011/drm',
  },
  prefixedAttributes: {
    xsi: {
      schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
    },
  },
  type: 'static',
  mediaPresentationDuration: 3256,
  minBufferTime: 10,
  profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
  children: [
    new BaseURL({
      textContent: 'http://cdn.example.com/movie23453235/',
    }),
    new Period({
      children: [
        new AdaptationSet({
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40',
          lang: 'en',
          subsegmentStartsWithSAP: 1,
          subsegmentAlignment: true,
          children: [
            new ContentProtection({
              schemeIdUri: 'http://example.net/052011/drm',
              children: [
                new drm.License({
                  textContent:
                    'http://MoviesSP.example.com/protect?license=kljklsdfiowek',
                }),
                new drm.Content({
                  textContent:
                    'http://MoviesSP.example.com/protect?content=oyfYvpo8yFyvyo8f',
                }),
              ],
            }),
            new Representation({
              id: '1',
              bandwidth: 64_000,
              children: [
                new BaseURL({
                  textContent: 'audio/en/64.mp4',
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40',
          lang: 'fr',
          subsegmentStartsWithSAP: 1,
          subsegmentAlignment: true,
          children: [
            new ContentProtection({
              schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
              value: 'ZZZZ',
            }),
            new Representation({
              id: '3',
              bandwidth: 64_000,
              children: [
                new BaseURL({
                  textContent:
                    'audio/fr/64.mp4',
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'application/ttml+xml',
          lang: 'de',
          children: [
            new Representation({
              id: '5',
              bandwidth: 256,
              children: [
                new BaseURL({
                  textContent: 'subtitles/de.xml',
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'avc1',
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 2,
          children: [
            new ContentProtection({
              schemeIdUri: 'http://example.net/052011/drm',
              children: [
                new drm.License({
                  textContent:
                    'http://MoviesSP.example.com/protect?license=jfjhwlsdkfiowkl',
                }),
                new drm.Content({
                  textContent:
                    'http://MoviesSP.example.com/protect?content=mslkfjsfiowelkfl',
                }),
              ],
            }),
            new BaseURL({
              textContent: 'video/',
            }),
            new Representation({
              id: '6',
              bandwidth: 256_000,
              width: 320,
              height: 240,
              children: [
                new BaseURL({
                  textContent: 'video256.mp4',
                }),
              ],
            }),
            new Representation({
              id: '7',
              bandwidth: 512_000,
              width: 320,
              height: 240,
              children: [
                new BaseURL({
                  textContent: 'video512.mp4',
                }),
              ],
            }),
            new Representation({
              id: '8',
              bandwidth: 1_024_000,
              width: 640,
              height: 480,
              children: [
                new BaseURL({
                  textContent: 'video1024.mp4',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
