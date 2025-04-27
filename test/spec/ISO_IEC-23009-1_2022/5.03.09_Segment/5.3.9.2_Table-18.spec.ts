import * as DASH from '../../../../src/index';
import {bothPass} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet, Representation, SegmentTemplate, BitstreamSwitching} = DASH;

describe('ISO_IEC-23009-1_2022/5.3.9.2_Table-18', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('URLType@sourceURL', () => {
    // @sourceURL specifies the source URL part and shall be formatted either as an <absolute-URI> according to IETF RFC 3986:2005, subclause 4.3,
    // with a fixed scheme of “http” or “https” or as a <relative-ref> according to IETF RFC 3986:2005 subclause 4.2.
    // If not present, then any BaseURL element is mapped to the @sourceURL attribute and the range attribute shall be present.
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
                  children: [
                    new BitstreamSwitching({sourceURL: 'http://example.com/switching.mp4'}),
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

  test('URLType@range', () => {
    // @range sspecifies the byte range restricting the above HTTP-URL.
    // The byte range shall be expressed and formatted as a byte-range-spec as defined in IETF RFC 7233:2014 subclause 2.1.
    // It is restricted to a single expression identifying a contiguous range of bytes.
    // If not present, the element refers to the entire resource referenced in the @sourceURL attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate>
              <BitstreamSwitching range="512-1023"/>
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
                  children: [
                    new BitstreamSwitching({range: [512, 1023]}),
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

    expect(DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate>
              <BitstreamSwitching range="512-1023,2048-2511"/>
            </SegmentTemplate>
            <Representation id="1" bandwidth="1250000"/>
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
                new SegmentTemplate({
                  children: [
                    new BitstreamSwitching({range: [512, 1023]}),
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
