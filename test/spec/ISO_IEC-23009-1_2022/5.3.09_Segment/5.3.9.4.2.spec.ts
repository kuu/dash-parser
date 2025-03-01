import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.9.4.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('SegmentTemplate@media', () => {
    // @media specifies the template to create the Media Segment List.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4"/>
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
                  media: 'video_$Number$.mp4',
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

  test('SegmentTemplate@index', () => {
    // @index specifies the template to create the Index Segment List.
    // If neither the $Number$ nor the $Time$ identifier is included, this provides the URL to a Representation Index.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate index="$RepresentationID$.sidx"/>
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
                  index: '$RepresentationID$.sidx',
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

  test('SegmentTemplate@initialization', () => {
    // @initialization specifies the template to create the Initialization Segment.
    // Neither $Number$ nor the $Time$ identifier shall be included.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate media="video_$Number$.mp4" initialization="$RepresentationID$-init.mp4"/>
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
                  media: 'video_$Number$.mp4',
                  initialization: '$RepresentationID$-init.mp4',
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
            <SegmentTemplate media="video_$Number$.mp4" initialization="$Number$-init.mp4"/>
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
                  media: 'video_$Number$.mp4',
                  initialization: '$Number$-init.mp4',
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
            <SegmentTemplate media="video_$Number$.mp4" initialization="$Time$-init.mp4"/>
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
                  media: 'video_$Number$.mp4',
                  initialization: '$Time$-init.mp4',
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

  test('SegmentTemplate@bitstreamSwitching', () => {
    // @bitstreamSwitching specifies the template to create the Bitstream Switching Segment.
    // Neither $Number$ nor the $Time$ identifier shall be included.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <SegmentTemplate bitstreamSwitching="$RepresentationID$-bssw.ts"/>
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
                  bitstreamSwitching: '$RepresentationID$-bssw.ts',
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
            <SegmentTemplate bitstreamSwitching="$Number$-bssw.ts"/>
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
                  bitstreamSwitching: '$Number$-bssw.ts',
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
            <SegmentTemplate bitstreamSwitching="$Time$-bssw.ts"/>
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
                  bitstreamSwitching: '$Time$-bssw.ts',
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
