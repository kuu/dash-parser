import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.3.4', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('Switching@interval', () => {
    // @interval specifies the interval between two switching points in the scale of the @timescale on Representation level.
    // Any Segment for which the earliest presentation time minus the @t value of the S element describing the segment
    // is an integer multiple of the product of @timescale and @interval is a switch-to opportunity,
    // i.e. it enables to switch to this Representation with the switching strategy as defined by the @type value.
    // The value should be chosen such that the resulting time matches MPD start time of segments, otherwise no switching will be described.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Switching
              interval="10000000"
            />
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Switching({
                  interval: 10_000_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Switching/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Switching(),
              ],
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Switching
              interval="-1"
            />
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Switching({
                  interval: -1,
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('Switching@type', () => {
    // @type specifies the switching strategy for the switch points identified in by the @interval attribute.
    // Switching strategies are:
    // - "media" (Media level switching):
    //   in this case, switching is possible at the switch point by decoding and presenting switch-from Representation
    //   up to switch point t, initializing the switch-to Representation with the associated Initialization Segment
    //   and continue decoding and presenting the switch-to Representation from time t onwards.
    // - "bitstream" (Bitstream switching):
    //   in this case, switching is possible at the switch point by decoding and presenting switch-from Representation
    //   up to switch point t, and continue decoding and presenting the switch-to Representation from time t onwards.
    //   More specifically, the concatenation of two Representations at the switch point results in a "conforming Segment track"
    //   as defined in 4.5.4 with the media format as specified in the @mimeType attribute.
    //   Initialization of the switch-to Representation is not necessary and is not recommended.
    //   In order to enable this feature, it is recommended to use the same Initialization Segment for
    //   all Representations in the Adaptation Set, i.e. the highest profile/level is signalled in the Initialization Segment.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Switching
              interval="10000000"
              type="media"
            />
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Switching({
                  interval: 10_000_000,
                  type: 'media',
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Switching
              interval="10000000"
              type="{}"
            />
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Switching({
                  interval: 10_000_000,
                  type: JSON.stringify({}) as 'media',
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
