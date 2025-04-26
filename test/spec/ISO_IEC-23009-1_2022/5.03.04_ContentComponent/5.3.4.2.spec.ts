import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.4.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('ContentComponent@id', () => {
    // @id specifies an identifier for this media component.
    // The attribute shall be unique in the scope of the containing Adaptation Set.
    // The value of this attribute should be the media component identifier in the media segment
    // (i.e. the Track Id in ISO BMFF segments and PID in MPEG-2 TS segments) described by this ContentComponent element.
    // Multiplexing of media components may also be provided on elementary stream level,
    // for example for next generation audio codecs, different audio components may be mixed.
    // In this case, the id may also point to specific components in a single elementary stream.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <ContentComponent id="0"/> 
            <ContentComponent id="1"/> 
            <ContentComponent id="2"/> 
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
                new DASH.ContentComponent({id: '0'}),
                new DASH.ContentComponent({id: '1'}),
                new DASH.ContentComponent({id: '2'}),
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
            <ContentComponent id="0"/> 
            <ContentComponent id="1"/> 
            <ContentComponent id="1"/> 
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
                new DASH.ContentComponent({id: '0'}),
                new DASH.ContentComponent({id: '1'}),
                new DASH.ContentComponent({id: '1'}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('ContentComponent@lang', () => {
    // @lang declares the language code for this ContentComponent.
    // The syntax and semantics according to IETF RFC 5646 shall be used.
    // If not present, the language code may be unknown.
    // If the language is unknown, the 'und' code for undetermined primary language
    // or the 'zxx' (Non-Linguistic, Not Applicable) code can be used.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <ContentComponent id="1" lang="en"/> 
            <ContentComponent id="2" lang="fr"/> 
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
                new DASH.ContentComponent({id: '1', lang: 'en'}),
                new DASH.ContentComponent({id: '2', lang: 'fr'}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('ContentComponent@contentType', () => {
    // @contentType specifies the media content component type for this ContentComponent.
    // A value of the top-level Content-type 'type' value as defined in 4 of IETF RFC 6838:2013 shall be taken.
    // If not present, the media content component type may be unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <ContentComponent id="0" contentType="video"/> 
            <ContentComponent id="1" lang="en" contentType="audio"/> 
            <ContentComponent id="2" lang="fr" contentType="audio"/> 
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
                new DASH.ContentComponent({id: '0', contentType: 'video'}),
                new DASH.ContentComponent({id: '1', contentType: 'audio', lang: 'en'}),
                new DASH.ContentComponent({id: '2', contentType: 'audio', lang: 'fr'}),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('ContentComponent@par', () => {
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
          <AdaptationSet mimeType="video/mp4">
            <ContentComponent
              id="0"
              contentType="video"
              par="16:9"
            /> 
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
              children: [
                new DASH.ContentComponent({
                  id: '0',
                  contentType: 'video',
                  par: [16, 9],
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet width="1920" height="1080" mimeType="video/mp4">
            <ContentComponent
              id="0"
              contentType="video"
              par="16:9"
            /> 
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              width: 1920,
              height: 1080,
              mimeType: 'video/mp4',
              children: [
                new DASH.ContentComponent({
                  id: '0',
                  contentType: 'video',
                  par: [16, 9],
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet width="640" height="480" mimeType="video/mp4">
            <ContentComponent
              id="0"
              contentType="video"
              par="16:9"
            /> 
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              width: 640,
              height: 480,
              mimeType: 'video/mp4',
              children: [
                new DASH.ContentComponent({
                  id: '0',
                  contentType: 'video',
                  par: [16, 9],
                }),
              ],
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet width="640" height="480" sar="4:3" mimeType="video/mp4">
            <ContentComponent
              id="0"
              contentType="video"
              par="16:9"
            /> 
          </AdaptationSet>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({
              width: 640,
              height: 480,
              sar: [4, 3],
              mimeType: 'video/mp4',
              children: [
                new DASH.ContentComponent({
                  id: '0',
                  contentType: 'video',
                  par: [16, 9],
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
