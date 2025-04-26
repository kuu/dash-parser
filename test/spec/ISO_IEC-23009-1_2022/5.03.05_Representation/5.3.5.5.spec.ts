import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.5.5', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('RandomAccess@interval', () => {
    // @interval specifies the position of the random access points in the Representations.
    // The information is specified in the scale of the @timescale on Representation level.
    // Any Segment for which the MPD start time minus the @t value of the S element describing the segment
    // is an integer multiple of the product of @timescale and @interval is a random access opportunity,
    // i.e. it enables randomly access to this Representation with the random access strategy as defined by the @type value.
    // The value should be chosen such that the resulting time matches MPD start time of segments,
    // otherwise no random access will be described.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"/>
            <RandomAccess interval="3000"/>
            <SegmentTemplate timescale="90000"/>
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
                new DASH.Representation({id: '1', bandwidth: 1_250_000}),
                new DASH.RandomAccess({interval: 3000}),
                new DASH.SegmentTemplate({timescale: 90_000}),
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
            <Representation id="1" bandwidth="1250000"/>
            <RandomAccess/>
            <SegmentTemplate timescale="90000"/>
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
                new DASH.Representation({id: '1', bandwidth: 1_250_000}),
                new DASH.RandomAccess(),
                new DASH.SegmentTemplate({timescale: 90_000}),
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
            <Representation id="1" bandwidth="1250000"/>
            <RandomAccess interval="3000"/>
            <SegmentTemplate/>
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
                new DASH.Representation({id: '1', bandwidth: 1_250_000}),
                new DASH.RandomAccess({interval: 3000}),
                new DASH.SegmentTemplate(),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('RandomAccess@type', () => {
    // @type specifies the random access strategy for the random access points in by the @interval attribute.
    // The value shall be:
    // - closed: Closed GOP random access. This implies that the segment is a Random Access Segment as well as
    //     the segment starts with a SAP type of 1 or 2. SAP type 1 or 2 is a necessary condition, but not sufficient.
    //     In addition, all requirements of a Random Access Segment need to be fulfilled.
    // - open: Open GOP random access. This implies that the segment is a Random Access Segment as well as
    //     the segment starts with a SAP type of 1, 2 or 3. SAP type 1, 2 or 3 is a necessary condition, but not sufficient.
    //     In addition, all requirements of a Random Access Segment need to be fulfilled.
    // - gradual: Gradual decoder refresh random access. This implies that the segment is a Random Access Segment as well as
    //     the segment starts with a SAP type of 1, 2, 3 or 4. SAP type 1, 2, 3 or 4 is a necessary condition, but not sufficient.
    //     In addition, all requirements of a Random Access Segment need to be fulfilled.
    // If the value of the type is unknown, the DASH Client is expected to ignore the containing Random Access element.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"/>
            <RandomAccess interval="3000" type="open"/>
            <SegmentTemplate timescale="90000"/>
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
                new DASH.Representation({id: '1', bandwidth: 1_250_000}),
                new DASH.RandomAccess({interval: 3000, type: 'open'}),
                new DASH.SegmentTemplate({timescale: 90_000}),
              ],
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <RandomAccess interval="3000" type="open"/>
              <SegmentTemplate timescale="90000"/>
            </Representation>
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
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new DASH.RandomAccess({interval: 3000, type: 'open'}),
                    new DASH.SegmentTemplate({timescale: 90_000}),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('RandomAccess@minBufferTime', () => {
    // @minBufferTime specifies a common duration used in the definition of the Representation data rate
    // (see @bandwidth attribute in subclauses 0 and 5.3.5.4).
    // If not present, then the value of the MPD level is inherited.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"/>
            <RandomAccess interval="3000" minBufferTime="PT6S"/>
            <SegmentTemplate timescale="90000"/>
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
                new DASH.Representation({id: '1', bandwidth: 1_250_000}),
                new DASH.RandomAccess({interval: 3000, minBufferTime: 6}),
                new DASH.SegmentTemplate({timescale: 90_000}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('RandomAccess@bandwidth', () => {
    // Consider a hypothetical constant bitrate channel of bandwidth with the value of this attribute in bits per second (bps).
    // Then, if the Representation is continuously delivered at this bitrate, starting at any RAP indicated in this element a client
    // can be assured of having enough data for continuous playout providing playout begins after @minBufferTime * @bandwidth bits have been received
    // (i.e. at time @minBufferTime after the first bit is received).
    // For dependent Representations, this value specifies the bandwidth according to the above definition for the aggregation of this Representation
    // and all complementary Representations. For details, see subclause 5.3.5.4.
    // If not present, the value of the Representation is inherited.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"/>
            <RandomAccess interval="3000" bandwidth="2500000"/>
            <SegmentTemplate timescale="90000"/>
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
                new DASH.Representation({id: '1', bandwidth: 1_250_000}),
                new DASH.RandomAccess({interval: 3000, bandwidth: 2_500_000}),
                new DASH.SegmentTemplate({timescale: 90_000}),
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
