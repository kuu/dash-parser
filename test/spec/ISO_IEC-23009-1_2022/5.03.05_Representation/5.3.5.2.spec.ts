import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.5.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('Representation@id', () => {
    // @id specifies an identifier for this Representation.
    // The identifier shall be unique within a Period unless the Representation is functionally identical to another Representation in the same Period.
    // The identifier shall not contain whitespace characters.
    // If used in the template-based URL construction as defined in subclause 5.3.9.4.4,
    // the string shall only contain characters that are permitted within an HTTP-URL according to IETF RFC 3986.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="0" bandwidth="2500000"/> 
          </AdaptationSet>
          <AdaptationSet mimeType="audio/mp4">
            <Representation id="1" bandwidth="2500000"/> 
          </AdaptationSet>
          <AdaptationSet mimeType="audio/mp4">
            <Representation id="2" bandwidth="2500000"/> 
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
                new DASH.Representation({id: '0', bandwidth: 2_500_000}),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'audio/mp4',
              children: [
                new DASH.Representation({id: '1', bandwidth: 2_500_000}),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'audio/mp4',
              children: [
                new DASH.Representation({id: '2', bandwidth: 2_500_000}),
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
            <Representation bandwidth="2500000"/> 
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
                new DASH.Representation({bandwidth: 2_500_000}),
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
            <Representation id="0" bandwidth="2500000"/> 
          </AdaptationSet>
          <AdaptationSet mimeType="audio/mp4">
            <Representation id="1" bandwidth="2500000"/> 
          </AdaptationSet>
          <AdaptationSet mimeType="audio/mp4">
            <Representation id="1" bandwidth="2500000"/> 
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
                new DASH.Representation({id: '0', bandwidth: 2_500_000}),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'audio/mp4',
              children: [
                new DASH.Representation({id: '1', bandwidth: 2_500_000}),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'audio/mp4',
              children: [
                new DASH.Representation({id: '1', bandwidth: 2_500_000}),
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
            <Representation id="a b c" bandwidth="2500000"/> 
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
                new DASH.Representation({id: 'a b c', bandwidth: 2_500_000}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('Representation@bandwidth', () => {
    // Consider a hypothetical constant bitrate channel of bandwidth with the value of this attribute in bits per second (bps).
    // Then, if the Representation is continuously delivered at this bitrate, starting at any SAP that is indicated either by @startWithSAP
    // or by any Segment Index box, a client can be assured of having enough data for continuous playout providing playout begins after
    // @minBufferTime * @bandwidth bits have been received (i.e. at time @minBufferTime after the first bit is received).
    // For dependent Representations, this value specifies the bandwidth according to the above definition for the aggregation of
    // this Representation and all complementary Representations.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="2500000"/> 
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
                  bandwidth: 2_500_000,
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
            <Representation id="1"/> 
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
            <Representation id="1" bandwidth="-1"/> 
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
                  bandwidth: -1,
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('Representation@qualityRanking', () => {
    // @qualityRanking specifies a quality ranking of the Representation relative to other Representations in the same Adaptation Set.
    // Lower values represent higher quality content. If not present, then no ranking is defined.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000" qualityRanking="100"/> 
            <Representation id="2" bandwidth="2500000" qualityRanking="200"/> 
            <Representation id="3" bandwidth="5000000" qualityRanking="300"/> 
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
                new DASH.Representation({id: '1', bandwidth: 1_250_000, qualityRanking: 100}),
                new DASH.Representation({id: '2', bandwidth: 2_500_000, qualityRanking: 200}),
                new DASH.Representation({id: '3', bandwidth: 5_000_000, qualityRanking: 300}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('Representation@dependencyId', () => {
    // @dependencyId specifies all complementary Representations the Representation depends on in the decoding
    // and/or presentation process as a whitespace-separated list of values of @id attributes.
    // If not present, the Representation can be decoded and presented independently of any other Representation.
    // This attribute shall not be present where there are no dependencies.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="2500000" dependencyId="2"/> 
            <Representation id="2" bandwidth="2500000"/>
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
                new DASH.Representation({id: '1', bandwidth: 2_500_000, dependencyIds: ['2']}),
                new DASH.Representation({id: '2', bandwidth: 2_500_000}),
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
            <Representation id="primary" bandwidth="2500000" dependencyId="secondary"/> 
            <Representation id="secondary" bandwidth="2500000"/>
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
                new DASH.Representation({id: 'primary', bandwidth: 2_500_000, dependencyIds: ['secondary']}),
                new DASH.Representation({id: 'secondary', bandwidth: 2_500_000}),
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
            <Representation id="primary" bandwidth="2500000" dependencyId="secondary tertiary"/> 
            <Representation id="secondary" bandwidth="2500000"/>
            <Representation id="tertiary" bandwidth="2500000"/>
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
                new DASH.Representation({id: 'primary', bandwidth: 2_500_000, dependencyIds: ['secondary', 'tertiary']}),
                new DASH.Representation({id: 'secondary', bandwidth: 2_500_000}),
                new DASH.Representation({id: 'tertiary', bandwidth: 2_500_000}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('Representation@associationId', () => {
    // @associationId specifies all Representations the Representation is associated with in the decoding and/or presentation process
    // as a whitespace-separated list of values of Representation@id attributes.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="2500000" associationId="2"/>
            <Representation id="2" bandwidth="2500000"/>
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
                new DASH.Representation({id: '1', bandwidth: 2_500_000, associationIds: ['2']}),
                new DASH.Representation({id: '2', bandwidth: 2_500_000}),
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
            <Representation id="camera-1" bandwidth="2500000" associationId="camera-2"/>
            <Representation id="camera-2" bandwidth="2500000"/>
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
                new DASH.Representation({id: 'camera-1', bandwidth: 2_500_000, associationIds: ['camera-2']}),
                new DASH.Representation({id: 'camera-2', bandwidth: 2_500_000}),
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
            <Representation id="camera-1" bandwidth="2500000" associationId="camera-2 camera-3"/>
            <Representation id="camera-2" bandwidth="2500000"/>
            <Representation id="camera-3" bandwidth="2500000"/>
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
                new DASH.Representation({id: 'camera-1', bandwidth: 2_500_000, associationIds: ['camera-2', 'camera-3']}),
                new DASH.Representation({id: 'camera-2', bandwidth: 2_500_000}),
                new DASH.Representation({id: 'camera-3', bandwidth: 2_500_000}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('Representation@associationType', () => {
    // @associationType specifies, as a whitespace-separated list of values, the kind of association for each Representation
    // the Representation has been associated with through the @associationId attribute.
    // Values taken by this attribute are 4 character codes (4CCs) for track reference types registered in MP4 registration authority.
    // This attribute shall not be present when @associationId is not present.
    // When present, this attribute shall have as many values as the number of identifiers declared in the @associationId attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="camera-1" bandwidth="2500000" associationId="camera-2" associationType="cdsc"/>
            <Representation id="camera-2" bandwidth="2500000"/>
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
                  id: 'camera-1', bandwidth: 2_500_000,
                  associationIds: ['camera-2'],
                  associationTypes: ['cdsc'],
                }),
                new DASH.Representation({id: 'camera-2', bandwidth: 2_500_000}),
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
            <Representation id="camera-1" bandwidth="2500000" associationId="camera-2" associationType="cdsc vdep"/>
            <Representation id="camera-2" bandwidth="2500000"/>
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
                  id: 'camera-1',
                  bandwidth: 2_500_000,
                  associationIds: ['camera-2'],
                  associationTypes: ['cdsc', 'vdep'],
                }),
                new DASH.Representation({id: 'camera-2', bandwidth: 2_500_000}),
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
            <Representation id="camera-1" bandwidth="2500000" associationId="camera-2" associationType="cdsc vdepn"/>
            <Representation id="camera-2" bandwidth="2500000"/>
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
                  id: 'camera-1', bandwidth: 2_500_000,
                  associationIds: ['camera-2'],
                  associationTypes: ['cdsc', 'vdepn'],
                }),
                new DASH.Representation({id: 'camera-2', bandwidth: 2_500_000}),
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
            <Representation id="camera-1" bandwidth="2500000" associationType="cdsc vdep"/>
            <Representation id="camera-2" bandwidth="2500000"/>
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
                new DASH.Representation({id: 'camera-1', bandwidth: 2_500_000, associationTypes: ['cdsc', 'vdep']}),
                new DASH.Representation({id: 'camera-2', bandwidth: 2_500_000}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('Representation@mediaStreamStructureId', () => {
    // @mediaStreamStructureId may be present for Representations containing video and its semantics are unspecified for any other type of Representations.
    // If present, the attribute @mediaStreamStructureId specifies a whitespace-separated list of media stream structure identifier values.
    // If media streams share the same media stream structure identifier value, the media streams shall have the following characteristics:
    // — The media streams have the same number of stream access points of type 1 to 3.
    // — The values of TSAP, TDEC, TEPT, and TPTF of the i-th SAP of type 1 to 3 in one media stream are identical to the values of
    //   TSAP, TDEC, TEPT, and TPTF, respectively, of the i-th SAP of type 1 to 3 in the other media streams for any value of i from 1 to
    //   the number of SAPs of type 1 to 3 in any of the media streams.
    // — A media stream formed by concatenating the media stream of a first Representation until ISAU (exclusive) of the i-th SAP of
    //   type 1 to 3 and the media stream of a second Representation (having the same media stream structure identifier value as for
    //   the first Representation) starting from the ISAU (inclusive) of the i-th SAP of type 1 to 3 conforms to the specification
    //   in which the media stream format is specified for any value of i from 1 to the number of SAPs of type 1 to 3 in either media stream.
    //   Furthermore, the decoded pictures have an acceptable quality regardless of type of the stream access point access unit used.
    // All media stream structure identifier values for one Adaptation Set shall differ from those of another Adaptation Set.
    // If not present, then for this Representation no similarities to other Representations are known.
    // Indicating multiple media stream structure identifier values for a Representation can be useful in cases where
    // switching between Representations A and B as well as between Representations B and C is allowed at non-IDR intra pictures,
    // but switching between Representations A and C would cause too severe a degradation in the quality of the leading pictures and is hence not allowed.
    // To indicate these permissions and restrictions, Representation A would contain @mediaStreamStructureId equal to “1”,
    // Representation B would contain @mediaStreamStructureId equal to “1 2”, and Representation C would contain @mediaStreamStructureId equal to “2”
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation
              id="camera-1"
              bandwidth="2500000"
              mediaStreamStructureId="1"
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
                new DASH.Representation({
                  id: 'camera-1',
                  bandwidth: 2_500_000,
                  mediaStreamStructureIds: ['1'],
                }),
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
            <Representation
              id="camera-1"
              bandwidth="2500000"
              mediaStreamStructureId="1 2"
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
                new DASH.Representation({
                  id: 'camera-1',
                  bandwidth: 2_500_000,
                  mediaStreamStructureIds: ['1', '2'],
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
