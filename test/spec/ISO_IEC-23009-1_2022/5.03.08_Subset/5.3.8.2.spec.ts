import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet, Subset} = DASH;

describe('ISO_IEC-23009-1_2022/5.3.8.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('Subset@contains', () => {
    // @contains specifies the Adaptation Sets contained in a Subset by providing a white space separated list of the @id values of the contained Adaptation Sets.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset contains="1"/>
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
            new Subset({contains: [1]}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'video/mp4', id: 2}),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset contains="1 2"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="audio/mp4" id="2"/>
          <AdaptationSet mimeType="audio/mp4" id="3"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new Subset({contains: [1, 2]}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 2}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 3}),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset contains="1 2"/>
          <Subset contains="3 4"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="audio/mp4" id="2"/>
          <AdaptationSet mimeType="video/mp4" id="3"/>
          <AdaptationSet mimeType="audio/mp4" id="4"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new Subset({contains: [1, 2]}),
            new Subset({contains: [3, 4]}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 2}),
            new AdaptationSet({mimeType: 'video/mp4', id: 3}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 4}),
          ],
        }),
      ],
    }));

    // empty Subsets are not allowed.
    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="audio/mp4" id="2"/>
          <AdaptationSet mimeType="audio/mp4" id="3"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new Subset({contains: []}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 2}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 3}),
          ],
        }),
      ],
    }));
    // no Subset should contain all the Adaptation Sets.
    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset contains="1 2 3"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="audio/mp4" id="2"/>
          <AdaptationSet mimeType="audio/mp4" id="3"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new Subset({contains: [1, 2, 3]}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 2}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 3}),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset contains="4"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="audio/mp4" id="2"/>
          <AdaptationSet mimeType="audio/mp4" id="3"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new Subset({contains: [4]}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 2}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 3}),
          ],
        }),
      ],
    }));
  });

  test('Subset@id', () => {
    // @id specifies a unique identifier for the Subset.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset contains="1 2" id="1"/>
          <Subset contains="3 4" id="2"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="audio/mp4" id="2"/>
          <AdaptationSet mimeType="video/mp4" id="3"/>
          <AdaptationSet mimeType="audio/mp4" id="4"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new Subset({contains: [1, 2], id: '1'}),
            new Subset({contains: [3, 4], id: '2'}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 2}),
            new AdaptationSet({mimeType: 'video/mp4', id: 3}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 4}),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset contains="1 2" id="subset-1"/>
          <Subset contains="3 4" id="subset-2"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="audio/mp4" id="2"/>
          <AdaptationSet mimeType="video/mp4" id="3"/>
          <AdaptationSet mimeType="audio/mp4" id="4"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new Subset({contains: [1, 2], id: 'subset-1'}),
            new Subset({contains: [3, 4], id: 'subset-2'}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 2}),
            new AdaptationSet({mimeType: 'video/mp4', id: 3}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 4}),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <Subset contains="1 2" id="subset-1"/>
          <Subset contains="3 4" id="subset-1"/>
          <AdaptationSet mimeType="video/mp4" id="1"/>
          <AdaptationSet mimeType="audio/mp4" id="2"/>
          <AdaptationSet mimeType="video/mp4" id="3"/>
          <AdaptationSet mimeType="audio/mp4" id="4"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new Subset({contains: [1, 2], id: 'subset-1'}),
            new Subset({contains: [3, 4], id: 'subset-1'}),
            new AdaptationSet({mimeType: 'video/mp4', id: 1}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 2}),
            new AdaptationSet({mimeType: 'video/mp4', id: 3}),
            new AdaptationSet({mimeType: 'audio/mp4', id: 4}),
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
