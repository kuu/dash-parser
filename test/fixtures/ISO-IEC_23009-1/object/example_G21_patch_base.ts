import * as DASH from '../../../../src/index';

const {Accessibility, AdaptationSet, AudioChannelConfiguration, MPD, PatchLocation, Period, Representation, S, SegmentTemplate, SegmentTimeline} = DASH;

export const obj = new MPD({
  children: [
    new PatchLocation({
      ttl: 60,
      textContent: 'example_G21_patch.mpp?publishTime=2020-05-13T05%3A34%3A06%2B00%3A00',
    }),
    new Period({
      children: [
        new AdaptationSet({
          children: [
            new Accessibility({
              schemeIdUri: 'urn:scte:dash:cc:cea-608:2015',
              value: 'CC1=eng',
            }),
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      d: 360_360,
                      r: 8,
                      t: 5_491_776_169,
                    }),
                  ],
                }),
              ],
              timescale: 90_000,
              presentationTimeOffset: 5_491_773_166,
              initialization: 'live-stream/$RepresentationID$/init.mp4',
              media: 'live-stream/$RepresentationID$/$Time$.m4s',
            }),
            new Representation({
              id: 'video-0',
              codecs: 'avc1.4d4015',
              bandwidth: 1_070_676,
              frameRate: [
                30,
                1,
              ],
              height: 270,
              width: 480,
              startWithSAP: 1,
            }),
            new Representation({
              id: 'video-1',
              codecs: 'avc1.4d401e',
              bandwidth: 2_035_716,
              frameRate: [
                30,
                1,
              ],
              height: 432,
              width: 768,
              startWithSAP: 1,
            }),
            new Representation({
              id: 'video-2',
              codecs: 'avc1.64001f',
              bandwidth: 31_690_038,
              frameRate: [
                30,
                1,
              ],
              height: 576,
              width: 1024,
              startWithSAP: 1,
            }),
            new Representation({
              id: 'video-3',
              codecs: 'avc1.64001f',
              bandwidth: 4_532_135,
              frameRate: [
                30,
                1,
              ],
              height: 720,
              width: 1280,
              startWithSAP: 1,
            }),
            new Representation({
              id: 'video-4',
              codecs: 'avc1.640020',
              bandwidth: 6_728_694,
              frameRate: [
                60,
                1,
              ],
              height: 720,
              width: 1280,
              startWithSAP: 1,
            }),
            new Representation({
              id: 'video-5',
              codecs: 'avc1.64002a',
              bandwidth: 10_923_530,
              frameRate: [
                60,
                1,
              ],
              height: 1080,
              width: 1920,
              startWithSAP: 1,
            }),
          ],
          id: 1,
          contentType: 'video',
          mimeType: 'video/mp4',
          maxFrameRate: 60,
          maxHeight: 1080,
          maxWidth: 1920,
          bitstreamSwitching: true,
          segmentAlignment: true,
        }),
        new AdaptationSet({
          children: [
            new SegmentTemplate({
              children: [
                new SegmentTimeline({
                  children: [
                    new S({
                      d: 360_960,
                      r: 1,
                      t: 5_491_776_448,
                    }),
                    new S({
                      d: 359_040,
                    }),
                    new S({
                      d: 360_960,
                      r: 1,
                    }),
                    new S({
                      d: 359_040,
                    }),
                    new S({
                      d: 360_960,
                      r: 1,
                    }),
                    new S({
                      d: 359_040,
                    }),
                    new S({
                      d: 360_960,
                      r: 2,
                    }),
                  ],
                }),
              ],
              timescale: 90_000,
              presentationTimeOffset: 5_491_773_166,
              initialization: 'live-stream/$RepresentationID$/init.mp4',
              media: 'live-stream/$RepresentationID$/$Time$.m4s',
            }),
            new Representation({
              children: [
                new AudioChannelConfiguration({
                  schemeIdUri: 'urn:mpeg:dash:23003:3:audio_channel_configuration:2011',
                  value: '2',
                }),
              ],
              id: 'audio-0',
              codecs: 'mp4a.40.2',
              bandwidth: 96_000,
              audioSamplingRate: 48_000,
              startWithSAP: 1,
            }),
          ],
          id: 2,
          contentType: 'audio',
          mimeType: 'audio/mp4',
          bitstreamSwitching: true,
          segmentAlignment: true,
        }),
      ],
      id: '1588435200',
      start: 95_725_984.571,
    }),
  ],
  id: 'live-stream',
  type: 'dynamic',
  minimumUpdatePeriod: 3,
  publishTime: '2020-05-13T05:34:06.000Z',
  availabilityStartTime: '2017-05-01T07:00:00.000Z',
  minBufferTime: 1,
  profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
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
