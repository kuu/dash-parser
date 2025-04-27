import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, ProgramInformation, Title, Source, Copyright} = DASH;

describe('ISO_IEC-23009-1_2022/5.7.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('ProgramInformation@lang', () => {
    // @lang declares the language code(s) for this Program Information.
    // The syntax and semantics according to IETF RFC 5646 shall be applied.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <ProgramInformation lang="en-US"/>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new ProgramInformation({lang: 'en-US'}),
        new Period({duration: 0}),
      ],
    }));
  });

  test('ProgramInformation@moreInformationURL', () => {
    // If provided, @moreInformationURL specifies an absolute URL which provides more information about the Media Presentation.
    // If not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <ProgramInformation moreInformationURL="https://example.com/path/to/doc.html"/>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new ProgramInformation({moreInformationURL: 'https://example.com/path/to/doc.html'}),
        new Period({duration: 0}),
      ],
    }));
  });

  test('ProgramInformation.Title', () => {
    // Title specifies the title for the Media Presentation
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <ProgramInformation>
          <Title>My Title</Title>
        </ProgramInformation>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new ProgramInformation({
          children: [
            new Title({textContent: 'My Title'}),
          ],
        }),
        new Period({duration: 0}),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <ProgramInformation>
          <Title>My Title1</Title>
          <Title>My Title2</Title>
        </ProgramInformation>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new ProgramInformation({
          children: [
            new Title({textContent: 'My Title1'}),
            new Title({textContent: 'My Title2'}),
          ],
        }),
        new Period({duration: 0}),
      ],
    }));
  });

  test('ProgramInformation.Source', () => {
    // Source specifies information about the original source (for example content provider) of the Media Presentation.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <ProgramInformation>
          <Source>My Source</Source>
        </ProgramInformation>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new ProgramInformation({
          children: [
            new Source({textContent: 'My Source'}),
          ],
        }),
        new Period({duration: 0}),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <ProgramInformation>
          <Source>My Source1</Source>
          <Source>My Source2</Source>
        </ProgramInformation>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new ProgramInformation({
          children: [
            new Source({textContent: 'My Source1'}),
            new Source({textContent: 'My Source2'}),
          ],
        }),
        new Period({duration: 0}),
      ],
    }));
  });

  test('ProgramInformation.Copyright', () => {
    // Copyright specifies a copyright statement for the Media Presentation,
    // usually starting with the copyright symbol, unicode U+00A9.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <ProgramInformation>
          <Copyright>My Copyright</Copyright>
        </ProgramInformation>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new ProgramInformation({
          children: [
            new Copyright({textContent: 'My Copyright'}),
          ],
        }),
        new Period({duration: 0}),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <ProgramInformation>
          <Copyright>My Copyright1</Copyright>
          <Copyright>My Copyright2</Copyright>
        </ProgramInformation>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new ProgramInformation({
          children: [
            new Copyright({textContent: 'My Copyright1'}),
            new Copyright({textContent: 'My Copyright2'}),
          ],
        }),
        new Period({duration: 0}),
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
