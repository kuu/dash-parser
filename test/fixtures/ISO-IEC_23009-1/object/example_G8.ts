import * as DASH from '../../../../src/index';

const {MPD, Period, AdaptationSet, Role, Viewpoint, Representation} = DASH;

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
  type: 'static',
  mediaPresentationDuration: 3256,
  minBufferTime: 10,
  profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
  children: [
    new Period({
      children: [
        new AdaptationSet({
          mimeType: 'video/mp4',
          group: 1,
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new Viewpoint({
              schemeIdUri: 'urn:mpeg:dash:viewpoint:2011',
              value: 'vp1',
            }),
            new Representation({
              id: '11',
              bandwidth: 1_024_000,
            }),
            new Representation({
              id: '12',
              bandwidth: 512_000,
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'video/mp4',
          group: 1,
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new Viewpoint({
              schemeIdUri: 'urn:mpeg:dash:viewpoint:2011',
              value: 'vp2',
            }),
            new Representation({
              id: '11',
              bandwidth: 1_024_000,
            }),
            new Representation({
              id: '12',
              bandwidth: 512_000,
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'audio/mp4',
          group: 1,
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'supplementary',
            }),
            new Viewpoint({
              schemeIdUri: 'urn:mpeg:dash:viewpoint:2011',
              value: 'vp1',
            }),
            new Representation({
              id: '11',
              bandwidth: 1_024_000,
            }),
            new Representation({
              id: '12',
              bandwidth: 512_000,
            }),
          ],
        }),
        new AdaptationSet({
          mimeType: 'audio/mp4',
          group: 1,
          children: [
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'main',
            }),
            new Role({
              schemeIdUri: 'urn:mpeg:dash:role:2011',
              value: 'supplementary',
            }),
            new Viewpoint({
              schemeIdUri: 'urn:mpeg:dash:viewpoint:2011',
              value: 'vp2',
            }),
            new Representation({
              id: '11',
              bandwidth: 1_024_000,
            }),
            new Representation({
              id: '12',
              bandwidth: 512_000,
            }),
          ],
        }),
      ],
    }),
  ],
});
