import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet, Representation, SegmentBase, BaseURL, Initialization, RepresentationIndex} = DASH;

describe('ISO_IEC-23009-1_2022/5.3.9.2_Table-16', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('SegmentBase@timescale', () => {
    // @timescale specifies the timescale in units per seconds to be used for the derivation of different real-time duration values in the Segment Information.
    // If not present on any level, it shall be set to 1.
    // NOTE This can be any frequency but typically is the media clock frequency of one of the media streams (or a positive integer multiple thereof).
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase timescale="90000"/>
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
                    new SegmentBase({timescale: 90_000}),
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
              <SegmentBase timescale="-1"/>
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
                    new SegmentBase({timescale: -1}),
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
              <SegmentBase timescale="20.5"/>
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
                    new SegmentBase({timescale: 20.5}),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('SegmentBase@presentationTimeOffset', () => {
    // @presentationTimeOffset specifies the presentation time offset of the Representation relative to the start of the Period,
    // i.e. the presentation time value of the media stream that shall be presented at the start of this Period.
    // The value of the presentation time offset in seconds is the division of the value of this attribute and the value of the @timescale attribute.
    // If not present on any level, the value of the presentation time offset is 0.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                timescale="90000"
                presentationTimeOffset="200000"
              />
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
                    new SegmentBase({
                      timescale: 90_000,
                      presentationTimeOffset: 200_000,
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
              <SegmentBase
                timescale="90000"
                presentationTimeOffset="-1"
              />
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
                    new SegmentBase({
                      timescale: 90_000,
                      presentationTimeOffset: -1,
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
              <SegmentBase
                presentationTimeOffset="2.222"
              />
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
                    new SegmentBase({
                      presentationTimeOffset: 2.222,
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

  test('SegmentBase@eptDelta', () => {
    // @eptDelta specifies the difference between the earliest presentation time in the Representation and the value of the @presentationTimeOffset.
    // The value of the earliest presentation time of the first Media Segment in this Representation in seconds is computed as the sum of the value of this attribute
    // and the value of the @presentationTimeOffset in units of the @timescale attribute.
    // If the media is contained in a Self-Initializing Media Segment, the value of @presentationTimeOffset is used to identify the Sub-Segment,
    // that is the first one of the Representation. In this case, the value of @eptDelta shall be set to the difference of the @presentationTimeOffset
    // and the earliest presentation time of the Subsegment containing the media time provided by the value of @presentationTimeOffset.
    // If not present, the value is unknown, but specific profiles may require it to be zero, if not signalled.
    // NOTE If the value of @eptDelta is smaller than zero then this results in an overlap prior to the Period. If the value is positive, it results in a gap.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                timescale="90000"
                presentationTimeOffset="200000"
                eptDelta="100000"
              />
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
                    new SegmentBase({
                      timescale: 90_000,
                      presentationTimeOffset: 200_000,
                      eptDelta: 100_000,
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
              <SegmentBase
                timescale="90000"
                presentationTimeOffset="200000"
                eptDelta="-150000"
              />
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
                    new SegmentBase({
                      timescale: 90_000,
                      presentationTimeOffset: 200_000,
                      eptDelta: -150_000,
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

  test('SegmentBase@pdDelta', () => {
    // @pdDelta specifies the difference between the presentation duration of this Representation in units of @timescale and the Period duration.
    // If the media is contained in a Self-Initializing Media Segment, the sum of the value of @presentationTimeOffset and the Period duration is used to identify the Subsegment,
    // that is the last one of the Representation. In this case, @pdDelta shall be set according to the presentation duration of this last Subsegment.
    // If not present, the value is unknown.
    // NOTE If the value of @pdDelta is smaller than zero then this results in a gap at the end of the Period. If the value is positive, it results in an overlap.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                timescale="90000"
                pdDelta="10000"
              />
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
                    new SegmentBase({
                      timescale: 90_000,
                      pdDelta: 10_000,
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
              <SegmentBase
                timescale="90000"
                pdDelta="-10000"
              />
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
                    new SegmentBase({
                      timescale: 90_000,
                      pdDelta: -10_000,
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

  test('SegmentBase@presentationDuration', () => {
    // @presentationDuration specifies the presentation duration of the Representation in the Period.
    // The value of the presentation duration in seconds is the division of the value of this attribute and the value of the @timescale attribute.
    // Specifically, the sum of the value of the @presentationTimeOffset, if present, or 0 otherwise and the value of this attribute is the last presentation time to be presented for this Representation.
    // If not present on any level, the value of this attribute is unknown and the Representation should be presented until the end of the Period,
    // i.e. until the presentation is terminated or until the next Period starts.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                timescale="90000"
                presentationDuration="2700000"
              />
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
                    new SegmentBase({
                      timescale: 90_000,
                      presentationDuration: 2_700_000,
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
              <SegmentBase
                timescale="90000"
                presentationDuration="-1"
              />
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
                    new SegmentBase({
                      timescale: 90_000,
                      presentationDuration: -1,
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
              <SegmentBase
                presentationDuration="29.99"
              />
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
                    new SegmentBase({
                      presentationDuration: 29.99,
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

  test('SegmentBase@timeShiftBufferDepth', () => {
    // @timeShiftBufferDepth specifies the duration of the time shifting buffer
    // for this Representation that is guaranteed to be available for a Media Presentation with type 'dynamic'.
    // When not present, the value is of the @timeShiftBufferDepth on MPD level applies.
    // If present, this value shall be not smaller than the value on MPD level.
    // This value of the attribute is undefined if the @type attribute is equal to 'static'.
    // NOTE When operating in a time-shift buffer on a Representation with value larger than the time-shift buffer signalled on MPD level,
    // not all Representations are necessarily available for switching.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                timeShiftBufferDepth="PT12S"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      timeShiftBufferDepth: 12,
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        timeShiftBufferDepth="PT11.9S">
        <Period duration="PT15S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                timeShiftBufferDepth="PT12S"
              />
            </Representation>
          </AdaptationSet>
            <AdaptationSet mimeType="audio/mp4">
            <Representation id="2" bandwidth="48000">
              <SegmentBase
                timeShiftBufferDepth="PT11.9S"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      timeShiftBufferDepth: 11.9,
      children: [
        new Period({
          duration: 15,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      timeShiftBufferDepth: 12,
                    }),
                  ],
                }),
              ],
            }),
            new AdaptationSet({
              mimeType: 'audio/mp4',
              children: [
                new Representation({
                  id: '2',
                  bandwidth: 48_000,
                  children: [
                    new SegmentBase({
                      timeShiftBufferDepth: 11.9,
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        timeShiftBufferDepth="PT12S">
        <Period duration="PT15S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                timeShiftBufferDepth="PT12S"
              />
            </Representation>
          </AdaptationSet>
            <AdaptationSet mimeType="audio/mp4">
            <Representation id="2" bandwidth="48000">
              <SegmentBase
                timeShiftBufferDepth="PT11.9S"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      timeShiftBufferDepth: 12,
      children: [
        new Period({
          duration: 15,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      timeShiftBufferDepth: 12,
                    }),
                  ],
                }),
              ],
            }),
            new AdaptationSet({
              mimeType: 'audio/mp4',
              children: [
                new Representation({
                  id: '2',
                  bandwidth: 48_000,
                  children: [
                    new SegmentBase({
                      timeShiftBufferDepth: 11.9,
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
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                timeShiftBufferDepth="PT12S"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      timeShiftBufferDepth: 12,
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

  test('SegmentBase@indexRange', () => {
    // @indexRange specifies the byte range that contains the Segment Index in all Media Segments of the Representation.
    // The byte range shall be expressed and formatted as a byte-range-spec as defined in IETF RFC 7233:2014, subclause 2.1.
    // It is restricted to a single expression identifying a contiguous range of bytes.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                indexRange="512-1023"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      indexRange: [512, 1023],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    expect(DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                indexRange="512-1023,2048-2511"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      indexRange: [512, 1023],
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

  test('SegmentBase@indexRangeExact', () => {
    // When set to 'true' specifies that for all Segments in the Representation, the data outside the prefix defined by @indexRange
    // contains the data needed to access all access units of all media streams syntactically and semantically.
    // This attribute shall not be present if @indexRange is absent.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                indexRange="512-1023"
                indexRangeExact="true"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      indexRange: [512, 1023],
                      indexRangeExact: true,
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                indexRangeExact="true"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      indexRangeExact: true,
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

  test('SegmentBase@availabilityTimeOffset', () => {
    // @availabilityTimeOffset specifies an offset to define the adjusted segment availability time.
    // The value is specified in seconds, possibly with arbitrary precision.
    // The offset provides the time how much earlier these segments are available compared to their computed availability start time for all Segments of all associated Representation.
    // The segment availability start time defined by this value is referred to as adjusted segment availability start time.
    // For details on computing the adjusted segment availability start time, refer to subclause 5.3.9.5.
    // If not present, no adjusted segment availability start time is defined.
    // NOTE The value of "INF" implies availability of all segments starts at MPD@availabilityStartTime.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                availabilityTimeOffset="5.23"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      availabilityTimeOffset: 5.23,
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                availabilityTimeOffset="INF"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      availabilityTimeOffset: 'INF',
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

  test('SegmentBase@availabilityTimeComplete', () => {
    // @availabilityTimeComplete specifies if all Segments of all associated Representation are complete at the adjusted availability start time.
    // The attribute shall be ignored if @availabilityTimeOffset is not present on any level.
    // If not present on any level, the value is inferred to true.
    // NOTE If the value is set to false, then it can be inferred by the client that the Segment is available at its announced location prior being complete.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                availabilityTimeOffset="5.23"
                availabilityTimeComplete="false"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      availabilityTimeOffset: 5.23,
                      availabilityTimeComplete: false,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    expect(DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                availabilityTimeComplete="false"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase(),
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <BaseURL availabilityTimeOffset="5.23">
                http://example.com/video.mp4
              </BaseURL>
              <SegmentBase
                availabilityTimeComplete="false"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new BaseURL({
                      availabilityTimeOffset: 5.23,
                      textContent: 'http://example.com/video.mp4',
                    }),
                    new SegmentBase({
                      availabilityTimeComplete: false,
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <BaseURL availabilityTimeOffset="5.23">
              http://example.com/video.mp4
            </BaseURL>
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                availabilityTimeComplete="false"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new BaseURL({
                  availabilityTimeOffset: 5.23,
                  textContent: 'http://example.com/video.mp4',
                }),
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      availabilityTimeComplete: false,
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <BaseURL availabilityTimeOffset="5.23">
            http://example.com/video.mp4
          </BaseURL>
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                availabilityTimeComplete="false"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new BaseURL({
              availabilityTimeOffset: 5.23,
              textContent: 'http://example.com/video.mp4',
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      availabilityTimeComplete: false,
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <BaseURL availabilityTimeOffset="5.23">
          http://example.com/video.mp4
        </BaseURL>
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                availabilityTimeComplete="false"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new BaseURL({
          availabilityTimeOffset: 5.23,
          textContent: 'http://example.com/video.mp4',
        }),
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      availabilityTimeComplete: false,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    expect(DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentBase
              availabilityTimeComplete="false"
            />
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new SegmentBase(),
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <BaseURL availabilityTimeOffset="5.23">
              http://example.com/video.mp4
            </BaseURL>
            <SegmentBase
              availabilityTimeComplete="false"
            />
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new BaseURL({
                  availabilityTimeOffset: 5.23,
                  textContent: 'http://example.com/video.mp4',
                }),
                new SegmentBase({
                  availabilityTimeComplete: false,
                }),
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <BaseURL availabilityTimeOffset="5.23">
            http://example.com/video.mp4
          </BaseURL>
          <AdaptationSet mimeType="video/mp4">
            <SegmentBase
              availabilityTimeComplete="false"
            />
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new BaseURL({
              availabilityTimeOffset: 5.23,
              textContent: 'http://example.com/video.mp4',
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new SegmentBase({
                  availabilityTimeComplete: false,
                }),
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <BaseURL availabilityTimeOffset="5.23">
          http://example.com/video.mp4
        </BaseURL>
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentBase
              availabilityTimeComplete="false"
            />
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new BaseURL({
          availabilityTimeOffset: 5.23,
          textContent: 'http://example.com/video.mp4',
        }),
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new SegmentBase({
                  availabilityTimeComplete: false,
                }),
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    expect(DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <SegmentBase
            availabilityTimeComplete="false"
          />
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new SegmentBase(),
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <BaseURL availabilityTimeOffset="5.23">
            http://example.com/video.mp4
          </BaseURL>
          <SegmentBase
            availabilityTimeComplete="false"
          />
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new BaseURL({
              availabilityTimeOffset: 5.23,
              textContent: 'http://example.com/video.mp4',
            }),
            new SegmentBase({
              availabilityTimeComplete: false,
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <BaseURL availabilityTimeOffset="5.23">
          http://example.com/video.mp4
        </BaseURL>
        <Period duration="PT12S">
          <SegmentBase
            availabilityTimeComplete="false"
          />
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new BaseURL({
          availabilityTimeOffset: 5.23,
          textContent: 'http://example.com/video.mp4',
        }),
        new Period({
          duration: 12,
          children: [
            new SegmentBase({
              availabilityTimeComplete: false,
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('SegmentBase.Initialization', () => {
    // Initialization (0...1) specifies the URL including a possible byte range for the Initialization Segment.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase>
                <Initialization sourceURL="init.mp4"/>
              </SegmentBase>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      children: [
                        new Initialization({sourceURL: 'init.mp4'}),
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase>
                <Initialization sourceURL="init.mp4"/>
                <Initialization sourceURL="init-2.mp4"/>
              </SegmentBase>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      children: [
                        new Initialization({sourceURL: 'init.mp4'}),
                        new Initialization({sourceURL: 'init-2.mp4'}),
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

  test('SegmentBase.RepresentationIndex', () => {
    // RepresentationIndex (0...1) specifies the URL including a possible byte range for the Representation Index Segment.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase>
                <RepresentationIndex sourceURL="init.mp4"/>
              </SegmentBase>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      children: [
                        new RepresentationIndex({sourceURL: 'init.mp4'}),
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentBase>
                <RepresentationIndex sourceURL="init.mp4"/>
                <RepresentationIndex sourceURL="init-2.mp4"/>
              </SegmentBase>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new Period({
          duration: 12,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new SegmentBase({
                      children: [
                        new RepresentationIndex({sourceURL: 'init.mp4'}),
                        new RepresentationIndex({sourceURL: 'init-2.mp4'}),
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

  test('SegmentBase.FailoverContent', () => {
    // TODO: FailoverContent (0...1) specifies times where the content has been replaced by failover content,
    // for example because of an encoder error.
  });

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
