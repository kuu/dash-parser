import * as DASH from '../../../../src/index';

const {MPD, Period, AdaptationSet, Representation, BaseURL, SegmentTemplate, ContentComponent} = DASH;

export const obj = new MPD({
  xmlns: {
    '': 'urn:mpeg:dash:schema:mpd:2011',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  },
  xsi: {
    schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
  },
  type: 'static',
  mediaPresentationDuration: 6158,
  availabilityStartTime: new Date('2011-05-10T06:16:42'),
  minBufferTime: 1.4,
  profiles: 'urn:mpeg:dash:profile:mp2t-simple:2011',
  maxSegmentDuration: 4,
  children: [
    new BaseURL({
      textContent: 'http://cdn1.example.com/',
    }),
    new BaseURL({
      textContent: 'http://cdn2.example.com/',
    }),
    new Period({
      id: '42',
      duration: 6158,
      children: [
        new AdaptationSet({
          mimeType: 'video/mp2t',
          codecs: 'avc1.4D401F,mp4a',
          frameRate: [24_000, 1001],
          segmentAlignment: true,
          subsegmentAlignment: true,
          bitstreamSwitching: true,
          startWithSAP: 2,
          subsegmentStartsWithSAP: 2,
          children: [
            new ContentComponent({
              contentType: 'video',
              id: '481',
            }),
            new ContentComponent({
              contentType: 'audio',
              id: '482',
              lang: 'en',
            }),
            new ContentComponent({
              contentType: 'audio',
              id: '483',
              lang: 'es',
            }),
            new BaseURL({
              textContent: 'SomeMovie/',
            }),
            new SegmentTemplate({
              media: '$RepresentationID$_$Number%05d$.ts',
              index: '$RepresentationID$.sidx',
              initialization: '$RepresentationID$-init.ts',
              bitstreamSwitching: '$RepresentationID$-bssw.ts',
              duration: 4,
            }),
            new Representation({
              id: '720kbps',
              bandwidth: 792_000,
              width: 640,
              height: 368,
            }),
            new Representation({
              id: '1130kbps',
              bandwidth: 1_243_000,
              width: 704,
              height: 400,
            }),
            new Representation({
              id: '1400kbps',
              bandwidth: 1_540_000,
              width: 960,
              height: 544,
            }),
            new Representation({
              id: '2100kbps',
              bandwidth: 2_310_000,
              width: 1120,
              height: 640,
            }),
            new Representation({
              id: '2700kbps',
              bandwidth: 2_970_000,
              width: 1280,
              height: 720,
            }),
            new Representation({
              id: '3400kbps',
              bandwidth: 3_740_000,
              width: 1280,
              height: 720,
            }),
          ],
        }),
      ],
    }),
  ],
});
