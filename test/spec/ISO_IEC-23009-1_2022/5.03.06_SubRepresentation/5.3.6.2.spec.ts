import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet, Representation, SubRepresentation} = DASH;

describe('ISO_IEC-23009-1_2022/5.3.6.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('SubRepresentation@level', () => {
    // @level specifies the Sub-Representation level. If @level attribute is present and for media formats used in this document,
    // a Subsegment Index as defined in subclause 6.3.2.4 shall be available for each Media Segment in the containing Representation.
    // If not present, then the SubRepresentation element is solely used to provide a more detailed description for media streams that are embedded in the Representation.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"> 
              <SubRepresentation level="0" bandwidth="520000"/> 
              <SubRepresentation level="1" bandwidth="520000"/> 
              <SubRepresentation level="2" bandwidth="520000"/> 
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
                    new SubRepresentation({level: 0, bandwidth: 520_000}),
                    new SubRepresentation({level: 1, bandwidth: 520_000}),
                    new SubRepresentation({level: 2, bandwidth: 520_000}),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('SubRepresentation@dependencyLevel', () => {
    // @dependencyLevel specifies the set of Sub-Representations within this Representation that this Sub-Representation
    // depends on in the decoding and/or presentation process as a whitespace-separated list of @level values.
    // If not present, the Sub-Representation can be decoded and presented independently of any other Representation.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"> 
              <SubRepresentation level="0" dependencyLevel="1" bandwidth="520000"/> 
              <SubRepresentation level="1" bandwidth="520000"/> 
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
                    new SubRepresentation({level: 0, dependencyLevels: [1], bandwidth: 520_000}),
                    new SubRepresentation({level: 1, bandwidth: 520_000}),
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
              <SubRepresentation level="0" dependencyLevel="1 2" bandwidth="520000"/> 
              <SubRepresentation level="1" bandwidth="520000"/> 
              <SubRepresentation level="2" bandwidth="520000"/> 
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
                    new SubRepresentation({level: 0, dependencyLevels: [1, 2], bandwidth: 520_000}),
                    new SubRepresentation({level: 1, bandwidth: 520_000}),
                    new SubRepresentation({level: 2, bandwidth: 520_000}),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('SubRepresentation@bandwidth', () => {
    // Identical to the @bandwidth definition in Representation but applied to this Sub-Representation.
    // This attribute shall be present if the @level attribute is present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"> 
              <SubRepresentation
                level="0"
                bandwidth="520000"/> 
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
                    new SubRepresentation({level: 0, bandwidth: 520_000}),
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
            <Representation id="1" bandwidth="-1"> 
              <SubRepresentation
                level="0"
                bandwidth="520000"/> 
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
                    new SubRepresentation({level: 0, bandwidth: -1}),
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
              <SubRepresentation level="0"/> 
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
                    new SubRepresentation({level: 0}),
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
              <SubRepresentation/> 
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
                    new SubRepresentation(),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('SubRepresentation@contentComponent', () => {
    // @contentComponent specifies the set of all media content components that are contained in this Sub-Representation
    // as a whitespace-separated list of values of ContentComponent@id values.
    // if not present, the Sub-Representation is not assigned to a media content component.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1250000"> 
              <SubRepresentation
                level="0"
                bandwidth="520000"
                contentComponent="0"
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
                    new SubRepresentation({
                      level: 0,
                      bandwidth: 520_000,
                      contentComponents: ['0'],
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

  bothPass(`
    <?xml version="1.0" encoding="UTF-8"?>
    <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
      <Period duration="PT30S">
        <AdaptationSet mimeType="video/mp4">
          <Representation id="1" bandwidth="1250000"> 
            <SubRepresentation
              level="0"
              bandwidth="520000"
              contentComponent="0 1"
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
                  new SubRepresentation({
                    level: 0,
                    bandwidth: 520_000,
                    contentComponents: ['0', '1'],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }));

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
