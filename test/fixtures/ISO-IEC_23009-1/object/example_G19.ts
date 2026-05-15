import * as DASH from '../../../../src/index';

const {AdaptationSet, MPD, Period, Representation, S, SegmentTemplate, SegmentTimeline} = DASH;

export const obj = new MPD({
  children: [
    new Period({
      children: [
        new AdaptationSet({
          children: [
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 120,
                      r: 5,
                    }),
                  ],
                }),
              ],
              timescale: 30,
              initialization: '$RepresentationID$/0',
              media: '$RepresentationID$/$Number$',
            }),
            new Representation({
              id: 'video1/1',
              bandwidth: 250_000,
            }),
            new Representation({
              id: 'video1/2',
              bandwidth: 500_000,
            }),
            new Representation({
              id: 'video1/3',
              bandwidth: 1_000_000,
            }),
          ],
          contentType: 'video',
          id: 1,
          mimeType: 'video/mp4 profiles=\'cmfc\'',
          codecs: 'avc1.4D401F',
          maxWidth: 1080,
          maxHeight: 720,
          maxFrameRate: 30,
          segmentProfiles: [
            'cmfs',
            'cmff',
          ],
          segmentAlignment: true,
          startWithSAP: 1,
        }),
        new AdaptationSet({
          children: [
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      t: 0,
                      d: 120,
                      r: 5,
                    }),
                  ],
                }),
              ],
              timescale: 48,
              initialization: '$RepresentationID$/0',
              media: '$RepresentationID$/$Number$',
            }),
            new Representation({
              id: 'audio1/1',
              bandwidth: 2500,
            }),
            new Representation({
              id: 'audio1/2',
              bandwidth: 500_000,
            }),
          ],
          contentType: 'audio',
          id: 1,
          mimeType: 'audio/mp4 profiles=\'cmfc\'',
          codecs: 'mp4a.40.5',
          segmentProfiles: [
            'cmfs',
            'cmff',
          ],
          segmentAlignment: true,
          startWithSAP: 1,
        }),
      ],
      id: '1',
    }),
  ],
  type: 'static',
  mediaPresentationDuration: 24,
  availabilityStartTime: new Date('2014-10-17T17:17:05.000Z'),
  minBufferTime: 4,
  profiles: [
    'urn:mpeg:dash:profile:cmaf:2019',
    'urn:mpeg:dash:profile:isoff-live:2011',
  ],
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
