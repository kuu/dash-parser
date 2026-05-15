import * as DASH from '../../../../src/index';

const {AdaptationSet, AudioChannelConfiguration, InbandEventStream, LeapSecondInformation, MPD, Period, Representation, Role, SegmentTemplate, UTCTiming} = DASH;

export const obj = new MPD({
  children: [
    new Period({
      children: [
        new AdaptationSet({
          children: [
            new InbandEventStream({
              schemeIdUri: 'urn:mpeg:dash:event:2012',
              value: '1',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new SegmentTemplate({
              startNumber: 404_547_501,
              presentationTimeOffset: 310_692_480_000,
              timescale: 200,
              duration: 768,
              media: '$RepresentationID$/$Number%06d$.m4s',
              initialization: '$RepresentationID$/IS.mp4',
            }),
            new Representation({
              id: '1280x720p50',
              codecs: 'avc3.640020',
              height: 720,
              width: 1280,
              frameRate: [
                50,
                1,
              ],
              bandwidth: 5_447_392,
              scanType: 'progressive',
            }),
          ],
          startWithSAP: 2,
          segmentAlignment: true,
          par: [
            16,
            9,
          ],
          id: 1,
          contentType: 'video',
          mimeType: 'video/mp4',
        }),
        new AdaptationSet({
          children: [
            new AudioChannelConfiguration({
              schemeIdUri: 'urn:mpeg:dash:23003:3:audio_channel_configuration:2011',
              value: '6',
            }),
            new InbandEventStream({
              schemeIdUri: 'urn:mpeg:dash:event:2012',
              value: '1',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new SegmentTemplate({
              startNumber: 404_547_501,
              presentationTimeOffset: 74_566_195_200_000,
              timescale: 48_000,
              duration: 184_320,
              media: '$RepresentationID$/$Number%06d$.m4s',
              initialization: '$RepresentationID$/IS.mp4',
            }),
            new Representation({
              id: '320kbps-5_1',
              bandwidth: 319_520,
            }),
          ],
          startWithSAP: 2,
          segmentAlignment: true,
          id: 6,
          codecs: 'mp4a.40.2',
          audioSamplingRate: 48_000,
          contentType: 'audio',
          lang: 'eng',
          mimeType: 'audio/mp4',
        }),
      ],
      id: 'first',
      start: 0,
    }),
    new UTCTiming({
      schemeIdUri: 'urn:mpeg:dash:utc:http-xsdate:2014',
      value: 'https://example.com/iso',
    }),
    new LeapSecondInformation({
      availabilityStartLeapOffset: 0,
      nextAvailabilityStartLeapOffset: 1,
      nextLeapChangeTime: new Date('2020-01-01T00:00:00Z'),
    }),
  ],
  type: 'dynamic',
  profiles: 'urn:mpeg:dash:profile:isoff-ext-live:2014',
  minBufferTime: 1.143,
  maxSegmentDuration: 3.84,
  minimumUpdatePeriod: 3600,
  timeShiftBufferDepth: 120,
  availabilityStartTime: new Date('2019-03-24T21:20:00.000Z'),
  publishTime: new Date('2019-03-24T20:44:33.540Z'),
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
