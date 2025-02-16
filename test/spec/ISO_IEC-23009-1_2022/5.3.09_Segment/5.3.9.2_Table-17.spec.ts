import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.9.2_Table-17', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('MultipleSegmentBase@duration', () => {
    // If present, specifies the constant approximate Segment duration.
    // All Segments within this Representation element have the same duration unless it is the last Segment within the Period, which can be significantly shorter.
    // The value of the duration in seconds is the division of the value of this attribute and the value of the @timescale attribute associated to the containing Representation.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate duration="2"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  duration: 2,
                }),
                new DASH.Representation({
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
            <SegmentTemplate timescale="90000" duration="180000"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  timescale: 90_000,
                  duration: 180_000,
                }),
                new DASH.Representation({
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
            <SegmentTemplate duration="-2"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  duration: -2,
                }),
                new DASH.Representation({
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

  test('MultipleSegmentBase@startNumber', () => {
    // @startNumber specifies the number of the first Media Segment in this Representation in the Period.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate startNumber="3"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  startNumber: 3,
                }),
                new DASH.Representation({
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
            <SegmentTemplate startNumber="3.5"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  startNumber: 3.5,
                }),
                new DASH.Representation({
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
            <SegmentTemplate startNumber="-1"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  startNumber: -1,
                }),
                new DASH.Representation({
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

  test('MultipleSegmentBase@endNumber', () => {
    // @endNumber specifies the number of the last Media Segment in this Representation in the Period.
    // If not present, the number is inferred from the duration of the Period.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate endNumber="127"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  endNumber: 127,
                }),
                new DASH.Representation({
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
            <SegmentTemplate endNumber="127.5"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  endNumber: 127.5,
                }),
                new DASH.Representation({
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
            <SegmentTemplate endNumber="-1"/>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  endNumber: -1,
                }),
                new DASH.Representation({
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

  test('MultipleSegmentBase.SegmentTimeline', () => {
    // SegmentTimeline (0...1) specifies the timeline of arbitrary Segment durations.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate>
              <SegmentTimeline><S d="2"/></SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  children: [
                    new DASH.SegmentTimeline({children: [new DASH.S({d: 2})]}),
                  ],
                }),
                new DASH.Representation({
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
            <SegmentTemplate>
              <SegmentTimeline><S d="2"/></SegmentTimeline>
              <SegmentTimeline><S d="2"/></SegmentTimeline>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  children: [
                    new DASH.SegmentTimeline({children: [new DASH.S({d: 2})]}),
                    new DASH.SegmentTimeline({children: [new DASH.S({d: 2})]}),
                  ],
                }),
                new DASH.Representation({
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

  test('MultipleSegmentBase.BitstreamSwitching', () => {
    // BitstreamSwitching (0...1) specifies the URL including a possible byte range for the Bitstream Switching Segment.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate>
              <BitstreamSwitching sourceURL="http://example.com/switching.mp4"/>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  children: [
                    new DASH.BitstreamSwitching({sourceURL: 'http://example.com/switching.mp4'}),
                  ],
                }),
                new DASH.Representation({
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
            <SegmentTemplate>
              <BitstreamSwitching sourceURL="http://example.com/switching.mp4"/>
              <BitstreamSwitching sourceURL="http://example.com/switching.mp4"/>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new DASH.SegmentTemplate({
                  children: [
                    new DASH.BitstreamSwitching({sourceURL: 'http://example.com/switching.mp4'}),
                    new DASH.BitstreamSwitching({sourceURL: 'http://example.com/switching.mp4'}),
                  ],
                }),
                new DASH.Representation({
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
