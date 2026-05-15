import * as DASH from '../../../../src/index';

const {AdaptationSet, BaseURL, MPD, Period, Representation, S, SegmentTemplate, SegmentTimeline} = DASH;

export const obj = new MPD({
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
          children: [
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 6_532_028_810,
                      d: 222_222,
                      r: 0,
                    }),
                    new S({
                      t: 6_532_251_032,
                      d: 180_180,
                      r: 420,
                    }),
                    new S({
                      t: 6_534_593_372,
                      d: 135_135,
                      r: 0,
                    }),
                  ],
                }),
              ],
              startNumber: 260_319_075,
              initialization: 'Travel_HD/$RepresentationID$/header.mp4',
              media: 'Travel_HD/$RepresentationID$/$Number$.mp4',
              timescale: 90_000,
              presentationTimeOffset: 6_532_028_810,
            }),
            new Representation({
              id: 'C',
              bandwidth: 828_800,
              codecs: 'avc1.4d401e',
              width: 640,
              height: 360,
            }),
            new Representation({
              id: 'B',
              bandwidth: 2_107_200,
              codecs: 'avc1.4d401f',
              width: 1280,
              height: 720,
            }),
            new Representation({
              children: [
                new SegmentTemplate({}),
              ],
              id: 'A',
              bandwidth: 3_718_000,
              codecs: 'avc1.640020',
              width: 1280,
              height: 720,
            }),
          ],
          mimeType: 'video/mp4',
          codecs: 'avc1.4D401F',
          frameRate: [
            30_000,
            1001,
          ],
          segmentAlignment: true,
          startWithSAP: 1,
        }),
      ],
      id: '42',
    }),
  ],
  type: 'dynamic',
  minimumUpdatePeriod: 2,
  timeShiftBufferDepth: 1800,
  availabilityStartTime: new Date('2020-10-17T17:17:05.000Z'),
  minBufferTime: 4,
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
  publishTime: new Date('2020-10-17T17:17:05.000Z'),
  xmlns: {
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    '': 'urn:mpeg:dash:schema:mpd:2011',
  },
  prefixedAttributes: {
    xsi: {
      schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
    },
  },
});
