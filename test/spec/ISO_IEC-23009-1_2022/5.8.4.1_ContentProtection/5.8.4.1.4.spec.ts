import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.8.4.1.4', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('ContentProtection@schemeIdUri', () => {
    // @schemeIdUri identifies a content protection or encryption scheme.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <ContentProtection schemeIdUri="urn:mpeg:dash:mp4protection:2011"/>
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
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
                new DASH.ContentProtection({
                  schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
                }),
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
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
            <Representation id="1" bandwidth="1250000">
              <ContentProtection schemeIdUri="urn:mpeg:dash:mp4protection:2011"/>
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
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
                  ],
                }),
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new DASH.ContentProtection({
                      schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
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
            <ContentProtection/>
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
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
                new DASH.ContentProtection({}),
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
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

  test('ContentProtection@value', () => {
    // @value provides additional information specific to the content protection or encryption scheme.
    // For example, it may provide information such as DRM version, encryption mode, etc.
    // For details, refer to subclause 5.8.4.1.6.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <ContentProtection schemeIdUri="urn:mpeg:dash:mp4protection:2011" value="cenc"/>
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
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
                new DASH.ContentProtection({
                  schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
                  value: 'cenc',
                }),
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
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

  test('ContentProtection@ref', () => {
    // If present, @ref makes this a referencing content protection descriptor that inherits from a “source” content protection descriptor
    // which is identified by the equivalent value of @refId attribute.
    // For details, refer to subclause 5.8.4.1.3.
    // The attribute shall not be present if the @refId attribute is present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <ContentProtection ref="1"/>
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
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
                new DASH.ContentProtection({
                  ref: '1',
                }),
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
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
            <ContentProtection ref="1" refId="2"/>
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
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
                new DASH.ContentProtection({
                  ref: '1',
                  refId: '2',
                }),
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
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

  test('ContentProtection@refId', () => {
    // @refId makes specifies an identifier of this descriptor. The identifier shall be unique within an MPD.
    // The attribute shall not be present if the @ref attribute is present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <ContentProtection schemeIdUri="urn:mpeg:dash:mp4protection:2011" value="cenc" refId="1"/>
          <AdaptationSet mimeType="video/mp4">
            <ContentProtection ref="1"/>
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
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
            new DASH.ContentProtection({
              schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
              value: 'cenc',
              refId: '1',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.ContentProtection({
                  ref: '1',
                }),
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
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

  test('ContentProtection@robustness', () => {
    // @robustness specifies the robustness level required for this content protection scheme
    // for accessing content represented by the associated Representation(s).
    // For more details refer to subclause 5.8.4.1.2 and 5.8.4.1.6.
    // If not present, then the lowest robustness level for the identified content protection scheme applies.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <ContentProtection schemeIdUri="urn:mpeg:dash:mp4protection:2011" robustness="level-1"/>
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
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
                new DASH.ContentProtection({
                  schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
                  robustness: 'level-1',
                }),
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
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

  test('ContentProtection@robustness - invalid value', () => {
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <ContentProtection
              schemeIdUri="urn:mpeg:dash:mp4protection:2011"
              value="cenc"
              cenc:default_KID="c291313f-0ce9-38df-b909-52a4afbb0c84"
              xmlns:cenc="urn:mpeg:cenc:2013"/>
            <SegmentTemplate media="video_$Number$.mp4">
              <SegmentTimeline>
                <S d="10" r="2"/>
              </SegmentTimeline>
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
                new DASH.ContentProtection({
                  schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
                  value: 'cenc',
                  cenc: {
                    defaultKid: 'c291313f-0ce9-38df-b909-52a4afbb0c84',
                  },
                }),
                new DASH.SegmentTemplate({
                  media: 'video_$Number$.mp4',
                  children: [
                    new DASH.SegmentTimeline({
                      children: [
                        new DASH.S({d: 10, r: 2}),
                      ],
                    }),
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
