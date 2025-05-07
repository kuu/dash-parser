import * as DASH from '../../../../src/index';

const {MPD, Period, AdaptationSet, Representation, BaseURL, ContentProtection, Role} = DASH;

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
    new Period({
      children: [
        new AdaptationSet({
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40',
          lang: 'en',
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
          children: [
            new ContentProtection({
              schemeIdUri: 'urn:uuid:706D6953-656C-5244-4D48-656164657221',
            }),
            new Representation({
              id: '1',
              bandwidth: 64_000,
              children: [
                new BaseURL({
                  textContent: '7657412348.mp4',
                }),
              ],
            }),
            new Representation({
              id: '2',
              bandwidth: 32_000,
              children: [
                new BaseURL({
                  textContent: '3463646346.mp4',
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40.2',
          lang: 'fr',
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 1,
          children: [
            new ContentProtection({
              schemeIdUri: 'urn:uuid:706D6953-656C-5244-4D48-656164657221',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'dub',
            }),
            new Representation({
              id: '3',
              bandwidth: 64_000,
              children: [
                new BaseURL({
                  textContent: '3463275477.mp4',
                }),
              ],
            }),
            new Representation({
              id: '4',
              bandwidth: 32_000,
              children: [
                new BaseURL({
                  textContent: '5685763463.mp4',
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'application/ttml+xml',
          lang: 'de',
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role',
              value: 'subtitle',
            }),
            new Representation({
              id: '5',
              bandwidth: 256,
              children: [
                new BaseURL({
                  textContent: '796735657.xml',
                }),
              ],
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          codecs: 'avc1.4d0228',
          subsegmentAlignment: true,
          subsegmentStartsWithSAP: 2,
          children: [
            new ContentProtection({
              schemeIdUri: 'urn:uuid:706D6953-656C-5244-4D48-656164657221',
            }),
            new Representation({
              id: '6',
              bandwidth: 256_000,
              width: 320,
              height: 240,
              children: [
                new BaseURL({
                  textContent: '8563456473.mp4',
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
                  textContent: '56363634.mp4',
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
                  textContent: '562465736.mp4',
                }),
              ],
            }),
            new Representation({
              id: '9',
              bandwidth: 1_384_000,
              width: 640,
              height: 480,
              children: [
                new BaseURL({
                  textContent: '41325645.mp4',
                }),
              ],
            }),
            new Representation({
              id: 'A',
              bandwidth: 1_536_000,
              width: 1280,
              height: 720,
              children: [
                new BaseURL({
                  textContent: '89045625.mp4',
                }),
              ],
            }),
            new Representation({
              id: 'B',
              bandwidth: 2_048_000,
              width: 1280,
              height: 720,
              children: [
                new BaseURL({
                  textContent: '23536745734.mp4',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
