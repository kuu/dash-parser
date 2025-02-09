import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.7.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('CommonAttributes@profiles', () => {
    // @profiles specifies the profiles which the associated Representation(s) conform to of the list of
    // Media Presentation profiles as described in 8. The value shall be a subset of the respective value
    // in any higher level of the document hierarchy (Representation, Adaptation Set, MPD).
    // If not present, the value is inferred to be the same as in the next higher level of the document hierarchy.
    // For example, if the value is not present for a Representation, then @profiles at the Adaptation Set level
    // is valid for the Representation.
    // The same syntax as defined in 5.3.1.2 shall be used.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
            mimeType: 'video/mp4',
          })],
        }),
      ],
    }));
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            profiles="urn:mpeg:dash:profile:isoff-on-demand:2011,urn:mpeg:dash:profile:isoff-main:2011"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            profiles: ['urn:mpeg:dash:profile:isoff-on-demand:2011', 'urn:mpeg:dash:profile:isoff-main:2011'],
            mimeType: 'video/mp4',
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@width', () => {
    // @width specifies the horizontal visual presentation size of the video media type on a grid determined by the @sar attribute.
    // In the absence of @sar width and height are specified as if the value of @sar were "1:1"
    // NOTE The visual presentation size of the video is equal to the number of horizontal and vertical samples used for presentation
    // after encoded samples are cropped in response to encoded cropping parameters, “overscan” signalling,
    // or “pan/scan” display parameters, e.g. SEI messages.
    // If not present on any level, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            width="1920"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            width: 1920,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            width="1920"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            width: 1920,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            width="-1920.5"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            width: 1920.5,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            width="-1920"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            width: -1920,
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@height', () => {
    // @height specifies the vertical visual presentation size of the video media type, on a grid determined by the @sar attribute.
    // If not present on any level, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            height="1080"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            height: 1080,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            height="1080"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            height: 1080,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            height="-1080.5"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            height: 1080.5,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            height="-1080"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            height: -1080,
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@sar', () => {
    // @sar specifies the sample aspect ratio of the video media component type, in the form of a string consisting of
    // two integers separated by ':', e.g. "10:11". The first number specifies the horizontal size of the encoded video pixels
    // (samples) in arbitrary units. The second number specifies the vertical size of the encoded video pixels (samples)
    // in the same units as the horizontal size.
    // If not present on any level, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            sar="4:3"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            sar: [4, 3],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            sar="4:3"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            sar: [4, 3],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            sar="4"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            sar: [4, 0],
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@frameRate', () => {
    // @frameRate specifies the output frame rate (or in the case of interlaced, half the output field rate) of the video media type
    // in the Representation. If the frame or field rate is varying, the value is the average frame or half the average field rate
    // over the entire duration of the Representation.
    // The value is coded as a string, either containing two integers separated by a "/", ("F/D"), or a single integer "F".
    // The frame rate is the division F/D, or F, respectively, per second (i.e. the default value of D is "1").
    // If not present on any level, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            frameRate="30000/1001"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            frameRate: [30_000, 1001],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            frameRate="30000/1001"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            frameRate: [30_000, 1001],
          })],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            frameRate="30"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            frameRate: [30, 1],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            frameRate="0"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            frameRate: [0, 1],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            frameRate="-30"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            frameRate: [-30, 1],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            frameRate="30/0"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            frameRate: [30, 0],
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@audioSamplingRate', () => {
    // Either a single decimal integer value specifying the sampling rate or a whitespace-separated pair of decimal integer values
    // specifying the minimum and maximum sampling rate of the audio media component type. The values are in samples per second.
    // If not present on any level, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            audioSamplingRate="48000"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            audioSamplingRate: 48_000,
          })],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            audioSamplingRate="44100 48000"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            audioSamplingRate: [44_100, 48_000],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            audioSamplingRate="48000"
            mimeType="video/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            audioSamplingRate: 48_000,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            audioSamplingRate="29.97"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            audioSamplingRate: 29.97,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            audioSamplingRate="-48000"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            audioSamplingRate: -48_000,
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            audioSamplingRate="29.97 59.94"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            audioSamplingRate: [29.97, 59.94],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            audioSamplingRate="-44100 -48000"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            audioSamplingRate: [-44_100, -48_000],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            audioSamplingRate="48000 44100"
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            audioSamplingRate: [48_000, 44_100],
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@mimeType', () => {
    // @mimeType specifies the MIME type of the concatenation of the Initialization Segment, if present,
    // and all consecutive Media Segments in the Representation.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="audio/mp4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@segmentProfiles', () => {
    // @segmentProfiles specifies the profiles of Segments that are essential to process the Representation.
    // The detailed semantics depend on the value of the @mimeType attribute.
    // The contents of this attribute shall conform to either the pro-simple or pro-fancy productions of 4.5 of IETF RFC 6381:2011,
    // without the enclosing DQUOTE characters, i.e. including only the unencodedv or encodedv elements respectively.
    // As profile identifier, the brand identifier for the Segment as defined in 6 shall be used.
    // 4CC may contain characters that must be escaped in XML. 4CC strings shall be escaped according to W3C Extensible Markup Language (XML):2008, Section 2.4.
    // If not present on any level, the value may be deducted from the value of the @profiles attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            segmentProfiles="cmfs"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            segmentProfiles: 'cmfs',
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
            segmentProfiles="cmfs cmff"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            segmentProfiles: ['cmfs', 'cmff'],
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@codecs', () => {
    // @codecs specifies the codecs present within the Representation.
    // The codec parameters shall also include the profile and level information where applicable.
    // For segment formats defined in this document, this element shall be present and the contents of this attribute
    // shall conform to either the simp-list or fancy-list productions of IETF RFC 6381:2011, subclause 3.2,
    // without the enclosing DQUOTE characters.
    // The codec identifier for the Representation's media format, mapped into the name space for codecs as specified
    // in IETF RFC 6381:2011, subclause 3.3, shall be used.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            codecs="avc1.640828"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            codecs: 'avc1.640828',
          })],
        }),
      ],
    }));
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="audio/mp4"
            codecs="mp4a.40.2,mp4a.40.2,mp4a.40.2"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'audio/mp4',
            codecs: ['mp4a.40.2', 'mp4a.40.2', 'mp4a.40.2'],
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@containerProfiles', () => {
    // @containerProfiles specifies the container profiles of Representations that are essential to process it.
    // The detailed semantics depend on the value of the @mimeType attribute.
    // The contents of this attribute shall conform to either the pro-simple or pro-fancy productions ofIETF RFC 6381:2011,
    // subclause 4.5, without the enclosing DQUOTE characters, i.e. including only the unencodedv or encodedv elements respectively.
    // 4CC may contain characters that must be escaped in XML. 4CC strings shall be escaped according to W3C Extensible Markup Language (XML):2008, Section 2.4.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            containerProfiles="cmfs"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            containerProfiles: 'cmfs',
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
            containerProfiles="cmfs cmff"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            containerProfiles: ['cmfs', 'cmff'],
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@maximumSAPPeriod', () => {
    // When present, @maximumSAPPeriod specifies the maximum SAP interval in seconds of all contained media streams,
    // where the SAP interval is the maximum time interval between the TSAP of any two successive SAPs of types 1 to 3
    // inclusive of one media stream in the associated Representations.
    // If not present on any level, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            maximumSAPPeriod="2"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            maximumSAPPeriod: 2,
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@startWithSAP', () => {
    // When present and greater than 0, @startWithSAP specifies that in the associated Representations,
    // each Media Segment starts with a SAP of type less than or equal to the value of this attribute value in each media stream.
    // A Media Segment starts with a SAP in a media stream if the stream contains a SAP in that Media Segment,
    // ISAU is the index of the first access unit that follows ISAP and ISAP is contained in the Media Segment.
    // If not present on any level, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            startWithSAP="1"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            startWithSAP: 1,
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@maxPlayoutRate', () => {
    // @maxPlayoutRate specifies the maximum playout rate as a multiple of the regular playout rate,
    // which is supported with the same decoder profile and level requirements as the normal playout rate.
    // If not present on any level, the value is 1.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            maxPlayoutRate="4"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            maxPlayoutRate: 4,
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@codingDependency', () => {
    // When present and 'true', for all contained media streams, @codingDependency specifies that there is at least one access unit
    // that depends on one or more other access units for decoding.
    // When present and 'false', for any contained media stream, there is no access unit that depends on any other access unit for decoding
    // (e.g. for video all the pictures are intra coded).
    // If not specified on any level, there may or may not be coding dependency between access units.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            codingDependency="true"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            codingDependency: true,
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@scanType', () => {
    // @scanType specifies the scan type of the source material of the video media component type.
    // The value may be equal to one of "progressive", "interlaced" and "unknown".
    // If not specified on any level, the scan type is "progressive".
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            scanType="progressive"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            scanType: 'progressive',
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
            scanType="interlaced"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            scanType: 'interlaced',
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
            scanType="unknown"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            scanType: 'unknown',
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@selectionPriority', () => {
    // @selectionPriority specifies the selection priority for the described data structures,
    // i.e. the one described by the containing element. In the absence of other information,
    // higher numbers are the preferred selection over lower numbers.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            selectionPriority="1"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            selectionPriority: 1,
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes@tag', () => {
    // @tag specifies the tag of the Representation, Adaptation Set or Preselection
    // which may be used for selection purposes towards the decoder.
    // NOTE This attribute is primarily introduced for the usage of Pre-Selections and Adaptation Sets,
    // but future use for Representation and Sub-Representations is not precluded.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet
            mimeType="video/mp4"
            tag="high-resolutions"
          />
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            tag: 'high-resolutions',
          })],
        }),
      ],
    }));
  });

  test('CommonAttributes.OutputProtection', () => {
    // OutputProtection (0...1) specifies information about output protection schemes required for presenting the associated Representations.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <OutputProtection/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            children: [
              new DASH.OutputProtection(),
            ],
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <OutputProtection/>
            <OutputProtection/>
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({
            mimeType: 'video/mp4',
            children: [
              new DASH.OutputProtection(),
              new DASH.OutputProtection(),
            ],
          })],
        }),
      ],
    }));
  });

  /* WIP
  test('CommonAttributes.FramePacking', ()json => {
    // FramePacking specifies frame-packing arrangement information of the video media component type.
    // When no FramePacking element is provided for a video component, frame-packing shall not used for the video media component.
  });
  */

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
