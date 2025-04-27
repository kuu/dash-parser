import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet, Representation, SegmentTemplate, SegmentTimeline, S} = DASH;

describe('ISO_IEC-23009-1_2022/5.3.9.6.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('SegmentTimeline.S', () => {
    // S specifies Segment start time and duration for a contiguous sequence of segments of identical durations, referred to as series in the following.
    // NOTE The S elements are ordered in sequence of increasing values of the attribute @t.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 10, r: 2}),
                      ],
                    }),
                  ],
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
  });

  test('S@t', () => {
    // The value of @t minus the value of @presentationTimeOffset specifies the MPD start time, in @timescale units, of the first Segment in the series.
    // The MPD start time is relative to the beginning of the Period.
    // The value of this attribute shall be equal to or greater than the sum of the previous S element earliest presentation time and the sum of the contiguous Segment durations.
    // If the value of the attribute is greater than what is expressed by the previous S element, it expresses discontinuities in the timeline.
    // If not present, then the value shall be assumed to be zero for the first S element and for the subsequent S elements, the value shall be assumed to be
    // the sum of the previous S element's earliest presentation time and contiguous duration [i.e. previous S@t + @d * (@r + 1)].
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate timescale="90000" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" t="5491776169"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  timescale: 90_000,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, t: 5_491_776_169}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate timescale="90000" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" t="-1"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  timescale: 90_000,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, t: -1}),
                      ],
                    }),
                  ],
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
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate timescale="90000" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" t="5491776169"/>
                <S d="180180" t="5495019409"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  timescale: 90_000,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, t: 5_491_776_169}),
                        new S({d: 180_180, t: 5_495_019_409}),
                      ],
                    }),
                  ],
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
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate timescale="90000" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" t="5491776169"/>
                <S d="180180" t="5495379769"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  timescale: 90_000,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, t: 5_491_776_169}),
                        new S({d: 180_180, t: 5_495_379_769}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate timescale="90000" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" t="5491776169"/>
                <S d="180180" t="5494839229"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  timescale: 90_000,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, t: 5_491_776_169}),
                        new S({d: 180_180, t: 5_494_839_229}),
                      ],
                    }),
                  ],
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
  });

  test('S@n', () => {
    // @n specifies the Segment number of the first Segment in the series.
    // The value of this attribute shall be at least one greater than the number of previous S elements plus the @startNumber attribute value, if present.
    // If the value of @n is greater than one plus the previously calculated Segment number, it expresses that one or more prior Segments in the timeline are unavailable.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" n="1"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, n: 1}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" n="-1"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, n: -1}),
                      ],
                    }),
                  ],
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
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" n="2"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, n: 2}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" n="0"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, n: 0}),
                      ],
                    }),
                  ],
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
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate startNumber="5" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" n="5"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  startNumber: 5,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, n: 5}),
                      ],
                    }),
                  ],
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
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate startNumber="5" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" n="6"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  startNumber: 5,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, n: 6}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate startNumber="5" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" n="4"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  startNumber: 5,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, n: 4}),
                      ],
                    }),
                  ],
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
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate startNumber="5" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8"/>
                <S d="180180" n="14"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  startNumber: 5,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8}),
                        new S({d: 180_180, n: 14}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate startNumber="5" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8"/>
                <S d="180180" n="13"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  startNumber: 5,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8}),
                        new S({d: 180_180, n: 13}),
                      ],
                    }),
                  ],
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
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate startNumber="5" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8"/>
                <S d="180180" n="15"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  startNumber: 5,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8}),
                        new S({d: 180_180, n: 15}),
                      ],
                    }),
                  ],
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
  });

  test('S@d', () => {
    // @d specifies the Segment duration or the duration of a Segment sequence, in units of the value of the @timescale.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 10}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="-1"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: -1}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S(),
                      ],
                    }),
                  ],
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
  });

  test('S@k', () => {
    // @k specifies the number of Segments that are included in a Segment Sequence.
    // The attribute shall not be present unless explicitly permitted by the profile.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" k="3"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 10, k: 3}),
                      ],
                    }),
                  ],
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
  });

  test('S@r', () => {
    // @r specifies the repeat count of the number of following contiguous Segments or Segment Sequences with the same duration expressed by the value of @d.
    // This value is zero-based (e.g. a value of three means four Segments or Segment Sequences in the contiguous series).
    // A negative value of the @r attribute of the S element indicates that the duration indicated in @d attribute repeats until the start of the next S element,
    // the end of the Period or until the next MPD update.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate timescale="90000" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" t="5491776169"/>
                <S d="180180" r="-1" t="5495019409"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  timescale: 90_000,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, t: 5_491_776_169}),
                        new S({d: 180_180, r: -1, t: 5_495_019_409}),
                      ],
                    }),
                  ],
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
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate timescale="90000" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" t="5491776169"/>
                <S d="180180" r="-1" t="5495019409"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  timescale: 90_000,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, t: 5_491_776_169}),
                        new S({d: 180_180, r: -1, t: 5_495_019_409}),
                      ],
                    }),
                  ],
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

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate timescale="90000" media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="360360" r="8" t="5491776169"/>
                <S d="180180" r="1.5" t="5495019409"/>
              </SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  timescale: 90_000,
                  media: 'video_$Number$.mp4',
                  children: [
                    new SegmentTimeline({
                      children: [
                        new S({d: 360_360, r: 8, t: 5_491_776_169}),
                        new S({d: 180_180, r: 1.5, t: 5_495_019_409}),
                      ],
                    }),
                  ],
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
  });

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
