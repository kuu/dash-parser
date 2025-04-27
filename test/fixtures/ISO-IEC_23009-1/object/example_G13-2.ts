import * as DASH from '../../../../src/index';

const {
  MPD,
  Period,
  AdaptationSet,
  InbandEventStream,
  Role,
  BaseURL,
  SegmentTemplate,
  Representation,
} = DASH;

export const obj = new MPD({
  xmlns: {
    '': 'urn:mpeg:dash:schema:mpd:2011',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  },
  prefixedAttributes: {
    xsi: {
      schemaLocation: 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
    },
  },
  mediaPresentationDuration: 3256,
  minBufferTime: 1.5,
  profiles: 'urn:mpeg:dash:profile:isoff-ext-live:2014',
  children: [
    new Period({
      children: [
        new AdaptationSet({
          startWithSAP: 2,
          segmentAlignment: true,
          id: 1,
          sar: [1, 1],
          mimeType: 'video/mp4',
          maxPlayoutRate: 1,
          children: [
            new InbandEventStream({
              schemeIdUri: 'tag:rdmedia.bbc.co.uk,2014:events/ballposition',
              value: '1',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new BaseURL({
              textContent: 'avc3-events/',
            }),
            new SegmentTemplate({
              startNumber: 1,
              timescale: 1000,
              duration: 3840,
              media: '$RepresentationID$/$Number%06d$.m4s',
            }),
            new Representation({
              id: '960x540p50',
              codecs: 'avc3.64001f',
              height: 540,
              width: 960,
              frameRate: [50, 1],
              scanType: 'progressive',
              bandwidth: 2_814_440,
              maxPlayoutRate: 1,
              children: [
                new SegmentTemplate({
                  initialization: 'data:video/mp4;base64,AAAAHGZ0eXBpc282AAAAAWF2YzFpc29tZGFzaAAAAldtb292...AAAAAAAAAAAAAAAQc3RjbwAAAAAAAAAA',
                }),
              ],
            }),
            new Representation({
              id: '192x108p6_25',
              codecs: 'avc3.42c015',
              height: 108,
              width: 192,
              frameRate: [25, 1],
              scanType: 'progressive',
              bandwidth: 31_368,
              maxPlayoutRate: 1,
              children: [
                new SegmentTemplate({
                  initialization: 'data:video/mp4;base64,AAAAHGZ0eXBpc282AAAAAWF2YzFpc29tZGFzaAAAAlNtb292...AAAAAAAAABBzdHNjAAAAAAAAAAAAAAAUc3RzegAAAAAAAAAAAAAAAAAAABBzdGNvAAAAAAAAAAA=',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
