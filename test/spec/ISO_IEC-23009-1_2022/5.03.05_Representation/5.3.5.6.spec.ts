import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet, Representation, ExtendedBandwidth, ModelPair} = DASH;

describe('ISO_IEC-23009-1_2022/5.3.5.6', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('ExtendedBandwidth@vbr', () => {
    // If set to true, the content is encoded to primarily have a constant or consistent quality,
    // while at the same time when the signal restrictions on MPD@minBufferTime and Representation@bandwidth attributes are reached,
    // the quality of the content may drop. In cases where is cap is not reached, the quality of the content is expected to be consistent.
    // If set to false or not present, no information on the nature of the encoding is present.
    // NOTE The signalling set to true implies that the actual instantaneous bitrate can frequently be below the maximum.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <ExtendedBandwidth vbr="true"/>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new ExtendedBandwidth({vbr: true}),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('ModelPair@bufferTime,@bandwidth', () => {
    // @bufferTime specifies a duration used in the definition of the Representation data rate together with @bandwidth attribute within the same element.
    // NOTE There are cases for which a real or expected long-term average bitrate may be usefully signaled.
    // Examples include
    //   (i) the signaling of the average bitrate of a Representation in On-Demand case.
    //       In this case the @buffer may be set to the duration of the Period and the @bandwidth may be set to the size of the Representation.
    //   (ii) the signaling of the maximum expected long-term bitrate in Live-Edge Periods:
    //       In this case the @buffer is set to a large value, for example 1 hour, or 24 hours and the bandwidth expresses the maximum amount of bytes over this period.
    //
    // @bandwidth Consider a hypothetical constant bitrate channel of bandwidth with the value of this attribute in bits per second (bps).
    // Then, if the Representation is continuously delivered at this bitrate, starting at any signalled SAP of type 1 or 2 included in this Representation element,
    // a client can be assured of having enough data for continuous playout providing playout begins after @bufferTime * @bandwidth bits have been received
    // (i.e. at time @bufferTime after the first bit is received).
    // For dependent Representations, this value specifies the bandwidth according to the above definition for the aggregation of this Representation and all complementary Representations.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <ExtendedBandwidth vbr="true">
                <ModelPair bufferTime="PT30S" bandwidth="2000000"/>
              </ExtendedBandwidth>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new ExtendedBandwidth({
                      vbr: true,
                      children: [
                        new ModelPair({
                          bufferTime: 30,
                          bandwidth: 2_000_000,
                        }),
                      ],
                    }),
                  ],
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
            <Representation id="1" bandwidth="1250000">
              <ExtendedBandwidth vbr="true">
                <ModelPair bandwidth="2000000"/>
              </ExtendedBandwidth>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new ExtendedBandwidth({
                      vbr: true,
                      children: [
                        new ModelPair({
                          bandwidth: 2_000_000,
                        }),
                      ],
                    }),
                  ],
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
            <Representation id="1" bandwidth="1250000">
              <ExtendedBandwidth vbr="true">
                <ModelPair bufferTime="PT30S"/>
              </ExtendedBandwidth>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new ExtendedBandwidth({
                      vbr: true,
                      children: [
                        new ModelPair({
                          bufferTime: 30,
                        }),
                      ],
                    }),
                  ],
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
            <Representation id="1" bandwidth="1250000">
              <ExtendedBandwidth vbr="true">
                <ModelPair bufferTime="PT10S" bandwidth="1000000"/>
                <ModelPair bufferTime="PT10S" bandwidth="1250000"/>
                <ModelPair bufferTime="PT10S" bandwidth="1500000"/>
              </ExtendedBandwidth>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new ExtendedBandwidth({
                      vbr: true,
                      children: [
                        new ModelPair({bufferTime: 10, bandwidth: 1_000_000}),
                        new ModelPair({bufferTime: 10, bandwidth: 1_250_000}),
                        new ModelPair({bufferTime: 10, bandwidth: 1_500_000}),
                      ],
                    }),
                  ],
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
