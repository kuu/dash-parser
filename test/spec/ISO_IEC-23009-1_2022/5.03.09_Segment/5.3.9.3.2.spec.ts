import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet, Representation, SegmentList, SegmentURL} = DASH;

describe('ISO_IEC-23009-1_2022/5.3.9.3.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('SegmentList@xlink:href', () => {
    // @xlink:href specifies a reference to a remote element entity that contains one or multiple elements of type SegmentList.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentList
                xlink:href="http://www.example.com/dash/remote-period.mpd"
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
                    new SegmentList({
                      xlinkHref: 'http://www.example.com/dash/remote-period.mpd',
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

  test('SegmentList@xlink:actuate', () => {
    // @xlink:actuate specifies the processing set, can be either "onLoad" or "onRequest"
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentList
                xlink:href="http://www.example.com/dash/remote-period.mpd"
                xlink:actuate="onLoad"
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
                    new SegmentList({
                      xlinkHref: 'http://www.example.com/dash/remote-period.mpd',
                      xlinkActuate: 'onLoad',
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
              <SegmentList
                xlink:href="http://www.example.com/dash/remote-period.mpd"
                xlink:actuate="onRequest"
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
                    new SegmentList({
                      xlinkHref: 'http://www.example.com/dash/remote-period.mpd',
                      xlinkActuate: 'onRequest',
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
              <SegmentList
                xlink:actuate="onLoad"
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
                    new SegmentList({
                      xlinkActuate: 'onLoad',
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

  test('SegmentURL@media', () => {
    // In combination with the @mediaRange attribute, specifies the HTTP-URL for the Media Segment.
    // It shall be formatted as an <absolute-URI> according to IETF RFC 3986:2005, subclause 4.3,
    // with a fixed scheme of “http” or “https” or as a <relative-ref> according to IETF RFC 3986:2005, subclause 4.2.
    // If not present, then any BaseURL element is mapped to the @media attribute and the range attribute shall be present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentList duration="10">
                  <SegmentURL media="view-1.mp4"/>
                  <SegmentURL media="view-2.mp4"/>
                  <SegmentURL media="view-3.mp4"/>
              </SegmentList>
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
                    new SegmentList({
                      duration: 10,
                      children: [
                        new SegmentURL({media: 'view-1.mp4'}),
                        new SegmentURL({media: 'view-2.mp4'}),
                        new SegmentURL({media: 'view-3.mp4'}),
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

  test('SegmentURL@mediaRange', () => {
    // @mediaRange specifies the byte range within the resource identified by the @media corresponding to the Media Segment.
    // The byte range shall be expressed and formatted as a byte-range-spec as defined in IETF RFC 7233:2014, subclause 2.1.
    // It is restricted to a single expression identifying a contiguous range of bytes.
    // If not present, the Media Segment is the entire resource referenced by the @media attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentList duration="10">
                  <SegmentURL media="view.mp4" mediaRange="0-511"/>
                  <SegmentURL media="view.mp4" mediaRange="512-1023"/>
                  <SegmentURL media="view.mp4" mediaRange="1024-1535"/>
              </SegmentList>
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
                    new SegmentList({
                      duration: 10,
                      children: [
                        new SegmentURL({media: 'view.mp4', mediaRange: [0, 511]}),
                        new SegmentURL({media: 'view.mp4', mediaRange: [512, 1023]}),
                        new SegmentURL({media: 'view.mp4', mediaRange: [1024, 1535]}),
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

    expect(DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentList duration="10">
                  <SegmentURL media="view.mp4" mediaRange="512-1023, 2048-2511"/>
              </SegmentList>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new MPD({
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
                    new SegmentList({
                      duration: 10,
                      children: [
                        new SegmentURL({media: 'view.mp4', mediaRange: [512, 1023]}),
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

  test('SegmentURL@index', () => {
    // In combination with the @indexRange attribute, specifies the HTTP-URL for the Index Segment.
    // It shall be formatted as an <absolute-URI> according to IETF RFC 3986:2005, subclause 4.3,
    // with a fixed scheme of “http” or “https” or as a <relative-ref> according to IETF RFC 3986:2005, subclause 4.2.
    // If not present and the @indexRange not present either, then no Index Segment information is provided for this Media Segment.
    // If not present and the @indexRange present, then the @media attribute is mapped to the @index.
    // If the @media attribute is not present either, then any BaseURL element is mapped to the @index attribute and the @indexRange attribute shall be present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentList duration="10">
                  <SegmentURL index="index-1.mp4"/>
                  <SegmentURL index="index-2.mp4"/>
                  <SegmentURL index="index-3.mp4"/>
              </SegmentList>
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
                    new SegmentList({
                      duration: 10,
                      children: [
                        new SegmentURL({index: 'index-1.mp4'}),
                        new SegmentURL({index: 'index-2.mp4'}),
                        new SegmentURL({index: 'index-3.mp4'}),
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

  test('SegmentURL@indexRange', () => {
    // @indexRange specifies the byte range within the resource identified by the @index corresponding to the Index Segment.
    // If @index is not present, it specifies the byte range of the Segment Index in Media Segment.
    // The byte range shall be expressed and formatted as a byte-range-spec as defined in IETF RFC 7233:2014, subclause 2.1.
    // It is restricted to a single expression identifying a contiguous range of bytes.
    // If not present, the Index Segment is the entire resource referenced by the @index attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentList duration="10">
                  <SegmentURL index="index.mp4" indexRange="0-511"/>
                  <SegmentURL index="index.mp4" indexRange="512-1023"/>
                  <SegmentURL index="index.mp4" indexRange="1024-1535"/>
              </SegmentList>
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
                    new SegmentList({
                      duration: 10,
                      children: [
                        new SegmentURL({index: 'index.mp4', indexRange: [0, 511]}),
                        new SegmentURL({index: 'index.mp4', indexRange: [512, 1023]}),
                        new SegmentURL({index: 'index.mp4', indexRange: [1024, 1535]}),
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

    expect(DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000">
              <SegmentList duration="10">
                  <SegmentURL indexRange="512-1023, 2048-2511"/>
              </SegmentList>
            </Representation>
          </AdaptationSet>
        </Period>
      </MPD>
    `)).toEqual(new MPD({
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
                    new SegmentList({
                      duration: 10,
                      children: [
                        new SegmentURL({indexRange: [512, 1023]}),
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
