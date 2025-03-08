import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.6.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('BaseURL@serviceLocation', () => {
    // This attribute specifies a relationship between Base URLs such that BaseURL elements with the same @serviceLocation value
    // are likely to have their URLs resolve to services at a common network location, for example a common Content Delivery Network.
    // If not present, no relationship to any other Base URL is known.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <BaseURL serviceLocation="cdn-1">https://example.com/</BaseURL>
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
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.BaseURL({
          serviceLocation: 'cdn-1',
          textContent: 'https://example.com/',
        }),
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
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('BaseURL@byteRange', () => {
    // If present, @byteRange specifies HTTP partial GET requests may alternatively be issued by adding the byte range into a regular HTTP-URL
    // based on the value of this attribute and the construction rules in E.2.
    // If not present, HTTP partial GET requests may not be converted into regular GET requests.
    // NOTE Such alternative requests are expected to not be used unless the DASH application requires this. For more details, refer to Annex E.
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
              <BaseURL byteRange="$base$?$query$&amp;range=$first$-$last$">
                https://example.com/path/to/
              </BaseURL>
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
                    new DASH.BaseURL({
                      byteRange: '$base$?$query$&range=$first$-$last$',
                      textContent: 'https://example.com/path/to/',
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

  test('BaseURL@availabilityTimeOffset', () => {
    // @availabilityTimeOffset specifies an offset to define the adjusted segment availability time. For semantics, refer to Table 14.
    // If the value is present in SegmentBase then this attribute is additive to the one in SegmentBase.
    // For details on processing, refer to 5.3.9.5.3.
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
              <BaseURL availabilityTimeOffset="0.1">
                https://example.com/path/to/video.mp4
              </BaseURL>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new DASH.SegmentBase({
                      availabilityTimeOffset: 5.23,
                    }),
                    new DASH.BaseURL({
                      availabilityTimeOffset: 0.1,
                      textContent: 'https://example.com/path/to/video.mp4',
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
                availabilityTimeOffset="5.23"
              />
              <BaseURL availabilityTimeOffset="INF">
                https://example.com/path/to/video.mp4
              </BaseURL>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new DASH.SegmentBase({
                      availabilityTimeOffset: 5.23,
                    }),
                    new DASH.BaseURL({
                      availabilityTimeOffset: 'INF',
                      textContent: 'https://example.com/path/to/video.mp4',
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

  test('BaseURL@availabilityTimeComplete', () => {
    // @availabilityTimeComplete specifies if all Segments of all associated Representation are complete at the adjusted availability start time.
    // For semantics, refer to Table 14.
    // If the value is present in SegmentBase then this attribute should not be present.
    // If present in SegmentBase and BaseURL, the value in BaseURL shall be ignored.
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
              <BaseURL
                availabilityTimeOffset="0.1"
                availabilityTimeComplete="false">
                https://example.com/path/to/video.mp4
              </BaseURL>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new DASH.SegmentBase({
                      availabilityTimeOffset: 5.23,
                    }),
                    new DASH.BaseURL({
                      availabilityTimeOffset: 0.1,
                      availabilityTimeComplete: false,
                      textContent: 'https://example.com/path/to/video.mp4',
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
                availabilityTimeOffset="5.23"
                availabilityTimeComplete="false"
              />
              <BaseURL
                availabilityTimeOffset="0.1"
                availabilityTimeComplete="true">
                https://example.com/path/to/video.mp4
              </BaseURL>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new DASH.SegmentBase({
                      availabilityTimeOffset: 5.23,
                      availabilityTimeComplete: false,
                    }),
                    new DASH.BaseURL({
                      availabilityTimeOffset: 0.1,
                      textContent: 'https://example.com/path/to/video.mp4',
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
            <BaseURL
              availabilityTimeOffset="0.1"
              availabilityTimeComplete="false">
              https://example.com/path/to/video.mp4
            </BaseURL>
            <Representation id="1" bandwidth="1250000">
              <SegmentBase
                availabilityTimeOffset="5.23"
                availabilityTimeComplete="true"
              />
            </Representation>
            <Representation id="2" bandwidth="2500000">
              <SegmentBase
                availabilityTimeOffset="5.23"
              />
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.BaseURL({
                  availabilityTimeOffset: 0.1,
                  availabilityTimeComplete: false,
                  textContent: 'https://example.com/path/to/video.mp4',
                }),
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                  children: [
                    new DASH.SegmentBase({
                      availabilityTimeOffset: 5.23,
                      availabilityTimeComplete: true,
                    }),
                  ],
                }),
                new DASH.Representation({
                  id: '2',
                  bandwidth: 2_500_000,
                  children: [
                    new DASH.SegmentBase({
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
              availabilityTimeOffset="5.23"
              availabilityTimeComplete="false"
            />
            <BaseURL
              availabilityTimeOffset="0.1"
              availabilityTimeComplete="true">
              https://example.com/path/to/video.mp4
            </BaseURL>
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.SegmentBase({
                  availabilityTimeOffset: 5.23,
                  availabilityTimeComplete: false,
                }),
                new DASH.BaseURL({
                  availabilityTimeOffset: 0.1,
                  textContent: 'https://example.com/path/to/video.mp4',
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT12S">
          <BaseURL
            availabilityTimeOffset="0.1"
            availabilityTimeComplete="false">
            https://example.com/path/to/video.mp4
          </BaseURL>
          <AdaptationSet mimeType="video/mp4">
            <SegmentBase
              availabilityTimeOffset="5.23"
              availabilityTimeComplete="true"
            />
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
          <AdaptationSet mimeType="audio/mp4">
            <SegmentBase
              availabilityTimeOffset="5.23"
            />
            <Representation id="2" bandwidth="2500000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.BaseURL({
              availabilityTimeOffset: 0.1,
              availabilityTimeComplete: false,
              textContent: 'https://example.com/path/to/video.mp4',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.SegmentBase({
                  availabilityTimeOffset: 5.23,
                  availabilityTimeComplete: true,
                }),
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'audio/mp4',
              children: [
                new DASH.SegmentBase({
                  availabilityTimeOffset: 5.23,
                }),
                new DASH.Representation({
                  id: '2',
                  bandwidth: 2_500_000,
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
          <BaseURL
            availabilityTimeOffset="0.1"
            availabilityTimeComplete="true">
            https://example.com/path/to/video.mp4
          </BaseURL>
          <SegmentBase
            availabilityTimeOffset="5.23"
            availabilityTimeComplete="false"
          />
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.BaseURL({
              availabilityTimeOffset: 0.1,
              textContent: 'https://example.com/path/to/video.mp4',
            }),
            new DASH.SegmentBase({
              availabilityTimeOffset: 5.23,
              availabilityTimeComplete: false,
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
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
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <BaseURL
          availabilityTimeOffset="0.1"
          availabilityTimeComplete="false">
          https://example.com/path/to/video.mp4
        </BaseURL>
        <Period duration="PT12S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentBase
              availabilityTimeOffset="5.23"
              availabilityTimeComplete="true"
            />
            <Representation id="1" bandwidth="1250000"/>
          </AdaptationSet>
          <AdaptationSet mimeType="audio/mp4">
            <SegmentBase
              availabilityTimeOffset="5.23"
            />
            <Representation id="2" bandwidth="2500000"/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.BaseURL({
          availabilityTimeOffset: 0.1,
          availabilityTimeComplete: false,
          textContent: 'https://example.com/path/to/video.mp4',
        }),
        new DASH.Period({
          duration: 12,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.SegmentBase({
                  availabilityTimeOffset: 5.23,
                  availabilityTimeComplete: true,
                }),
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_250_000,
                }),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'audio/mp4',
              children: [
                new DASH.SegmentBase({
                  availabilityTimeOffset: 5.23,
                }),
                new DASH.Representation({
                  id: '2',
                  bandwidth: 2_500_000,
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('BaseURL@timeShiftBufferDepth', () => {
    // @timeShiftBufferDepth specifies the duration of the smallest time shifting buffer
    // for any Representation in the MPD that is guaranteed to be available for a Media Presentation with type 'dynamic'.
    // This value overrides MPD@timeShiftBufferDepth for the resources that use this BaseURL.
    // This value of the attribute is undefined if the MPD@type attribute is equal to 'static'.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z">
        <Period duration="PT30S">
          <BaseURL timeShiftBufferDepth="PT30S">https://example.com/</BaseURL>
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
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.BaseURL({
              timeShiftBufferDepth: 30,
              textContent: 'https://example.com/',
            }),
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
          <BaseURL timeShiftBufferDepth="PT30S">https://example.com/</BaseURL>
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
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.BaseURL({
              timeShiftBufferDepth: 30,
              textContent: 'https://example.com/',
            }),
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
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('BaseURL@rangeAccess', () => {
    // If set to true, partially available Segments may be accessed with byte range request.
    // If a client is making a byte-range request against a partially available Segment
    // and the first-byte position of that range request is non-zero and the client is expecting an aggregating response,
    // then the client should signal that expectation which shall follow the convention of IETF RFC 8673.
    // Specifically, it should use a last-byte value of 9007199254740991.
    // This will signal the server to respond with a 206 aggregating response instead of waiting for the end of the Segment
    // and responding with a 200 response code and a content-length response header.
    // If set to false, the client should not expect a response corresponding to the requested byte range.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <BaseURL rangeAccess="true">https://example.com/</BaseURL>
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
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.BaseURL({
          rangeAccess: true,
          textContent: 'https://example.com/',
        }),
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
