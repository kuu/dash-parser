import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet} = DASH;

describe('ISO_IEC-23009-1_2022/5.3.3.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('AdaptationSet@xlink:href', () => {
    // @xlink:href specifies a reference to a remote element entity that shall contain exactly one element of type AdaptationSet.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            xlink:href="http://www.example.com/dash/remote-adaptation-set.mpd"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            xlinkHref: 'http://www.example.com/dash/remote-adaptation-set.mpd',
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@xlink:actuate', () => {
    // @xlink:actuate specifies the processing instructions, which can be either "onLoad" or "onRequest".
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            xlink:actuate="onLoad"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            xlinkActuate: 'onLoad',
          })],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            xlink:actuate="onRequest"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            xlinkActuate: 'onRequest',
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@id', () => {
    // @id specifies a unique identifier for this Adaptation Set in the scope of the Period.
    // The attribute shall be a unique unsigned integer value in the scope of the containing Period.
    // The attribute shall not be present in a remote element entity.
    // If not present, no identifier for the Adaptation Set is specified.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            id="1234567890"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            id: 1_234_567_890,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            id="0.001"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            id: 0.001,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            id="-1"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            id: -1,
          })],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4" id="0"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="video/mp4" id="2"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({mimeType: 'video/mp4', id: 0}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'video/mp4', id: 2}),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
          ],
        }),
      ],
    }));
  });

  test('AdaptationSet@group', () => {
    // @group specifies an identifier for the group that is unique in the scope of the containing Period.
    // The value is an unsigned integer.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            group="1234567890"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            group: 1_234_567_890,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            group="0.001"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            group: 0.001,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            group="-1"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            group: -1,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@lang', () => {
    // @lang declares the language code for this Adaptation Set.
    // The syntax and semantics according to IETF RFC 5646 shall be used.
    // If not present, the language code may be defined for each media component or it may be unknown.
    // If the language is unknown, the 'und' code for undetermined primary language
    // or the 'zxx' (Non-Linguistic, Not Applicable) code can be used.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            lang="en"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            lang: 'en',
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@contentType', () => {
    // @contentType specifies the media content component type for this Adaptation Set.
    // A value of the top-level Content-type 'type' value as defined in 4 of IETF RFC 6838:2013 shall be taken.
    // If not present, the media content component type may be defined for each media content component or it may be unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            contentType="video"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            contentType: 'video',
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@par', () => {
    // @par specifies the picture aspect ratio of the video media component type,
    // in the form of a string consisting of two integers separated by ':', e.g. "16:9".
    // When this attribute is present, and the attributes @width and @height for the set of Representations are also present,
    // the picture aspect ratio as specified by this attribute shall be the same as indicated by the values of @width, @height,
    // and @sar, i.e. it shall express the same ratio as (@width * sarx): (@height * sary),
    // with sarx the first number in @sar and sary the second number.
    // If not present, the picture aspect ratio may be defined for each media component or it may be unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            par="16:9"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            par: [16, 9],
          })],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            width="1920"
            height="1080"
            mimeType="video/mp4"
            par="16:9"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            width: 1920,
            height: 1080,
            mimeType: 'video/mp4',
            par: [16, 9],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            width="640"
            height="480"
            mimeType="video/mp4"
            par="16:9"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            width: 640,
            height: 480,
            mimeType: 'video/mp4',
            par: [16, 9],
          })],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            width="640"
            height="480"
            sar="4:3"
            mimeType="video/mp4"
            par="16:9"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            width: 640,
            height: 480,
            sar: [4, 3],
            mimeType: 'video/mp4',
            par: [16, 9],
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@minBandwidth', () => {
    // @minBandwidth specifies the minimum @bandwidth value in all Representations in this Adaptation Set.
    // This value has the same units as the @bandwidth attribute.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            minBandwidth="512000"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            minBandwidth: 512_000,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@maxBandwidth', () => {
    // @maxBandwidth specifies the maximum @bandwidth value in all Representations in this Adaptation Set.
    // This value has the same units as the @bandwidth attribute.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            maxBandwidth="1024000"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            maxBandwidth: 1_024_000,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@minWidth', () => {
    // @minWidth specifies the minimum @width value in all Representations in this Adaptation Set.
    // This value has the same units as the @width attribute.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            minWidth="640"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            minWidth: 640,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@maxWidth', () => {
    // @maxWidth specifies the maximum @width value in all Representations in this Adaptation Set.
    // This value has the same units as the @width attribute.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            maxWidth="1920"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            maxWidth: 1920,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@minHeight', () => {
    // @minHeight specifies the minimum @height value in all Representations in this Adaptation Set.
    // This value has the same units as the @height attribute.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            minHeight="360"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            minHeight: 360,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@maxHeight', () => {
    // @maxHeight specifies the maximum @height value in all Representations in this Adaptation Set.
    // This value has the same units as the @height attribute.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            maxHeight="1080"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            maxHeight: 1080,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@minFrameRate', () => {
    // @minFrameRate specifies the minimum @frameRate value in all Representations in this Adaptation Set.
    // This value has the same units as the @frameRate attribute.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            minFrameRate="23.976"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            minFrameRate: 23.976,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@maxFrameRate', () => {
    // @maxFrameRate specifies the maximum @framerate value in all Representations in this Adaptation Set.
    // This value is encoded in the same format as the @frameRate attribute.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            maxFrameRate="60"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [new AdaptationSet({
            mimeType: 'video/mp4',
            maxFrameRate: 60,
          })],
        }),
      ],
    }));
  });

  test('AdaptationSet@segmentAlignment', () => {
    // When set to 'true', @segmentAlignment specifies that for any two Representations, X and Y, within the same Adaptation Set,
    // the m-th Segment of X and the n-th Segment of Y are non-overlapping (as defined in subclause 4.5.3) whenever m is not equal to n.
    // For Adaptation Sets containing Representations with multiple media content components,
    // this attribute value shall be either 'true' or 'false'.
    // NOTE Previous editions permitted non-boolean values for this attribute.
    // As this was not used in practice and caused confusion, it is deprecated in this edition.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            segmentAlignment="true"
          />
          <AdaptationSet
            mimeType="video/mp4"
            segmentAlignment="false"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              segmentAlignment: true,
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
              segmentAlignment: false,
            }),
          ],
        }),
      ],
    }));

    expect(DASH.parse(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            segmentAlignment="1"
          />
          <AdaptationSet
            mimeType="video/mp4"
            segmentAlignment="0"
          />
        </Period>
      </MPD>
    `)).toEqual(new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              segmentAlignment: true,
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
              segmentAlignment: false,
            }),
          ],
        }),
      ],
    }));
  });

  test('AdaptationSet@bitstreamSwitching', () => {
    // When this flag is set to 'true', the following applies:
    // * All Representations in the Adaptation Set shall have the same number M of Media Segments;
    // * Let R1, R2, ..., RN be all the Representations within the Adaptation Set.
    // * Let
    //   * Si,j, for j > 0, be the jth Media Segment in the ith Representation (i.e. Ri)
    //   * if present, let Si,0 be the Initialization Segment in the ith Representation, and
    //   * if present, let Bi be the Bitstream Switching Segment in the ith Representation.
    // * The sequence of
    //   * any Initialization Segment, if present, in the Adaptation Set, with,
    //     * if Bitstream Switching Segments are present,
    //       Bi(1), Si(1),1, Bi(2), Si(2),2, ..., Bi(k),
    //       Si(k),k, ..., Bi(M), Si(M),M
    //     * else
    //       Si(1),1, Si(2),2, ..., Si(k),k, ..., Si(M),M,
    //       wherein any i(k) for all k values in the range of 1 to M, respectively,
    //       is an integer value in the range of 1 to N,
    //     results in a "conforming Segment track" as defined in subclause 4.5.4 with the media format
    //     as specified in the @mimeType attribute.
    // More detailed rules may be defined for specific media formats.
    // For more details, refer to subclause 0.
    // NOTE When this attribute is set to TRUE, then seamless switching across Representations
    // can be achieved without re-initialization of the decoder.
    // Content authors are encouraged to set this attribute to true only if the media content components across Representations
    // do not need the media decoder to be re-initialized.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            bitstreamSwitching="true"
          />
          <AdaptationSet
            mimeType="video/mp4"
            bitstreamSwitching="false"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              bitstreamSwitching: true,
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
              bitstreamSwitching: false,
            }),
          ],
        }),
      ],
    }));
  });

  test('AdaptationSet@subsegmentAlignment', () => {
    // If the @subsegmentAlignment for an Adaptation Set is set to 'true', all following conditions shall be satisfied:
    // * Each Media Segment shall be indexed (i.e. either it contains a Segment index or there is an Index Segment
    //   providing an index for the Media Segment).
    // * For any two Representations, X and Y, within the same Adaptation Set, the m-th Subsegment of X and the n-th Subsegment of Y
    //   are non-overlapping (as defined in subclause 4.5.3) whenever m is not equal to n.
    // NOTE Previous editions permitted non-boolean values for this attribute.
    // As this was not used in practice and caused confusion, it is deprecated in this edition.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            subsegmentAlignment="true"
          />
          <AdaptationSet
            mimeType="video/mp4"
            subsegmentAlignment="false"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              subsegmentAlignment: true,
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
              subsegmentAlignment: false,
            }),
          ],
        }),
      ],
    }));
  });

  test('AdaptationSet@subsegmentStartsWithSAP', () => {
    // When greater than 0, specifies that each Subsegment with SAP_type greater than 0 starts with
    // a SAP of type less than or equal to the value of @subsegmentStartsWithSAP.
    // A Subsegment starts with SAP when the Subsegment contains a SAP,
    // and for the first SAP, ISAU is the index of the first access unit that follows ISAP,
    // and ISAP is contained in the Subsegment.
    // The semantics of @subsegmentStartsWithSAP equal to 0 are unspecified.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            subsegmentStartsWithSAP="1"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              subsegmentStartsWithSAP: 1,
            }),
          ],
        }),
      ],
    }));
  });

  test('@initializationSetRef', () => {
    // @initializationSetRef specifies a white space separated list of Initialization Set identifiers.
    // The Adaptation Set shall conform to all Initialization Sets that are referenced in this attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            initializationSetRef="123 456 789"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              initializationSetRef: [123, 456, 789],
            }),
          ],
        }),
      ],
    }));
  });

  test('AdaptationSet@initializationPrincipal', () => {
    // @initializationPrincipal specifies the URL of an Initialization Segment that is sufficient to initialize the Adaptation Set.
    // If not present, an Initialization Segment from one of the Representations is sufficient.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            initializationPrincipal="https://example.com/init.mp4"
          />
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new AdaptationSet({
              mimeType: 'video/mp4',
              initializationPrincipal: 'https://example.com/init.mp4',
            }),
          ],
        }),
      ],
    }));
  });

  /* WIP
  test('AdaptationSet.SegmentBase', () => {
    // The SegmentBase element specifies default Segment Base information.
    // Information in this element is overridden by information in the Representation.SegmentBase, if present.
  });

  test('AdaptationSet.SegmentList', () => {
    // The SegmentList element specifies default Segment List information.
    // Information in this element is overridden by information in the Representation.SegmentList, if present.
  });

  test('AdaptationSet.SegmentTemplate', () => {
    // The SegmentTemplate element specifies default Segment Template information.
    // Information in this element is overridden by information in the Representation.SegmentTemplate, if present.
  });

  test('AdaptationSet.Representation', () => {
    // The Representation element specifies a Representation.
    // At least one Representation element shall be present in each Adaptation Set.
    // The actual element may however be part of a remote element entity if xlink is used on the containing AdaptationSet element.
  });
  */

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
