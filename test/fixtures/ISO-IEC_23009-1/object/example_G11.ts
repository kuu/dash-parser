import * as DASH from '../../../../src/index';

const {
  MPD,
  Period,
  AssetIdentifier,
  AdaptationSet,
  Representation,
  SegmentTemplate,
  AudioChannelConfiguration,
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
  minBufferTime: 1.5,
  type: 'static',
  mediaPresentationDuration: 704,
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
  children: [
    new Period({
      id: '0',
      duration: 250,
      children: [
        new AssetIdentifier({
          schemeIdUri: 'urn:org:dashif:asset-id:2013',
          value: 'md:cid:EIDR:10.5240%2f0EFB-02CD-126E-8092-1E49-W',
        }),
        new AdaptationSet({
          segmentAlignment: true,
          maxWidth: 1280,
          maxHeight: 720,
          maxFrameRate: 24,
          par: [16, 9],
          children: [
            new Representation({
              id: '1',
              mimeType: 'video/mp4',
              codecs: 'avc1.4d401f',
              width: 1280,
              height: 720,
              frameRate: [24, 1],
              sar: [1, 1],
              startWithSAP: 1,
              bandwidth: 980_104,
              children: [
                new SegmentTemplate({
                  timescale: 12_288,
                  presentationTimeOffset: 1024,
                  duration: 24_576,
                  media: 'BBB_720_1M_video_$Number$.mp4',
                  startNumber: 1,
                  initialization: 'BBB_720_1M_video_init.mp4',
                }),
              ],
            }),
            new Representation({
              id: '2',
              mimeType: 'video/mp4',
              codecs: 'avc1.4d401f',
              width: 1280,
              height: 720,
              frameRate: [24, 1],
              sar: [1, 1],
              startWithSAP: 1,
              bandwidth: 1_950_145,
              children:
                [
                  new SegmentTemplate({
                    timescale: 12_288,
                    presentationTimeOffset: 1024,
                    duration: 24_576,
                    media: 'BBB_720_2M_video_$Number$.mp4',
                    startNumber: 1,
                    initialization: 'BBB_720_2M_video_init.mp4',
                  }),
                ],
            }),
            new Representation({
              id: '3',
              mimeType: 'video/mp4',
              codecs: 'avc1.4d401f',
              width: 1280,
              height: 720,
              frameRate: [24, 1],
              sar: [1, 1],
              startWithSAP: 1,
              bandwidth: 3_893_089,
              children:
                [
                  new SegmentTemplate({
                    timescale: 12_288,
                    presentationTimeOffset: 1024,
                    duration: 24_576,
                    media: 'BBB_720_4M_video_$Number$.mp4',
                    startNumber: 1,
                    initialization: 'BBB_720_4M_video_init.mp4',
                  }),
                ],
            }),
          ],
        }),
        new AdaptationSet({
          segmentAlignment: true,
          children: [
            new Representation({
              id: '4',
              mimeType: 'audio/mp4',
              codecs: 'mp4a.40.29',
              audioSamplingRate: 48_000,
              startWithSAP: 1,
              bandwidth: 33_434,
              children: [
                new AudioChannelConfiguration({
                  schemeIdUri: 'urn:mpeg:dash:23003:3:audio_channel_configuration:2011',
                  value: '2',
                }),
                new SegmentTemplate({
                  timescale: 48_000,
                  duration: 94_175,
                  media: 'BBB_32k_$Number$.mp4',
                  startNumber: 1,
                  initialization: 'BBB_32k_init.mp4',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Period({
      xlinkHref: 'example_G11_remote.period.xml',
      xlinkActuate: 'onRequest',
      xmlns: {
        xlink: 'http://www.w3.org/1999/xlink',
      },
    }),
    new Period({
      id: '2',
      duration: 344,
      children: [
        new AssetIdentifier({
          schemeIdUri: 'urn:org:dashif:asset-id:2013',
          value: 'md:cid:EIDR:10.5240%2f0EFB-02CD-126E-8092-1E49-W',
        }),
        new AdaptationSet({
          segmentAlignment: true,
          maxWidth: 1280,
          maxHeight: 720,
          maxFrameRate: 24,
          par: [16, 9],
          children: [
            new Representation({
              id: '1',
              mimeType: 'video/mp4',
              codecs: 'avc1.4d401f',
              width: 1280,
              height: 720,
              frameRate: [24, 1],
              sar: [1, 1],
              startWithSAP: 1,
              bandwidth: 980_104,
              children: [
                new SegmentTemplate({
                  timescale: 12_288,
                  presentationTimeOffset: 3_073_024,
                  duration: 24_576,
                  media: 'BBB_720_1M_video_$Number$.mp4',
                  startNumber: 126,
                  initialization: 'BBB_720_1M_video_init.mp4',
                }),
              ],
            }),
            new Representation({
              id: '2',
              mimeType: 'video/mp4',
              codecs: 'avc1.4d401f',
              width: 1280,
              height: 720,
              frameRate: [24, 1],
              sar: [1, 1],
              startWithSAP: 1,
              bandwidth: 1_950_145,
              children:
                [
                  new SegmentTemplate({
                    timescale: 12_288,
                    presentationTimeOffset: 3_073_024,
                    duration: 24_576,
                    media: 'BBB_720_2M_video_$Number$.mp4',
                    startNumber: 126,
                    initialization: 'BBB_720_2M_video_init.mp4',
                  }),
                ],
            }),
            new Representation({
              id: '3',
              mimeType: 'video/mp4',
              codecs: 'avc1.4d401f',
              width: 1280,
              height: 720,
              frameRate: [24, 1],
              sar: [1, 1],
              startWithSAP: 1,
              bandwidth: 3_893_089,
              children:
                [
                  new SegmentTemplate({
                    timescale: 12_288,
                    presentationTimeOffset: 3_073_024,
                    duration: 24_576,
                    media: 'BBB_720_4M_video_$Number$.mp4',
                    startNumber: 126,
                    initialization: 'BBB_720_4M_video_init.mp4',
                  }),
                ],
            }),
          ],
        }),
        new AdaptationSet({
          segmentAlignment: true,
          children: [
            new Representation({
              id: '4',
              mimeType: 'audio/mp4',
              codecs: 'mp4a.40.29',
              audioSamplingRate: 48_000,
              startWithSAP: 1,
              bandwidth: 33_434,
              children: [
                new AudioChannelConfiguration({
                  schemeIdUri: 'urn:mpeg:dash:23003:3:audio_channel_configuration:2011',
                  value: '2',
                }),
                new SegmentTemplate({
                  timescale: 48_000,
                  presentationTimeOffset: 11_964_416,
                  duration: 94_175,
                  media: 'BBB_32k_$Number$.mp4',
                  startNumber: 126,
                  initialization: 'BBB_32k_init.mp4',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
