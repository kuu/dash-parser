import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.1.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('mandatory props/children: success', () => {
    // @profiles
    // @minBufferTime
    // Period 1..N
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('mandatory props/children: failure', () => {
    // - @profiles
    // @minBufferTime
    // Period 1..N
    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        minBufferTime="PT2S"
      >
        <Period duration="PT0S/>
      </MPD>
    `, new DASH.MPD({
      // profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [new DASH.Period({duration: 0})],
    }));

    // @profiles
    // - @minBufferTime
    // Period 1..N
    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
      >
        <Period duration="PT0S/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      // minBufferTime: 2,
      children: [new DASH.Period({duration: 0})],
    }));

    // @profiles
    // @minBufferTime
    // - Period 1..N
    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      />
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      // children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@id', () => {
    // @id specifies an identifier for the Media Presentation.
    // It is recommended to use an identifier that is unique within the scope in which the Media Presentation is published.
    // If not specified, no MPD-internal identifier is provided.
    // However, for example the URL to the MPD may be used as an identifier for the Media Presentation.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
        id="1234567890"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      id: '1234567890',
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@profiles', () => {
    // @profiles specifies a list of Media Presentation profiles as described in 8.
    // The contents of this attribute shall conform to either the pro-simple or pro-fancy productions of IETF RFC 6381:2011, Section 4.5,
    // without the enclosing DQUOTE characters, i.e. including only the unencodedv or encodedv elements respectively.
    // As profile identifier a restricted URI format as defined in 8.1 shall be used.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [new DASH.Period({duration: 0})],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011,urn:mpeg:dash:profile:isoff-main:2011"
        minBufferTime="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: ['urn:mpeg:dash:profile:isoff-on-demand:2011', 'urn:mpeg:dash:profile:isoff-main:2011'],
      minBufferTime: 2,
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@type', () => {
    // @type specifies the type of the Media Presentation.
    // For static Media Presentations (@type="static"), all Segments are available between the @availabilityStartTime and the @availabilityEndTime.
    // For dynamic Media Presentations (@type="dynamic"), Segments typically have different availability times.
    // For details, refer to subclause 5.3.9.5.3.
    // In addition, the Media Presentation Description may be updated in dynamic Media Presentations, i.e. the @minimumUpdatePeriod
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
        type="static"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      type: 'static',
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@availabilityStartTime', () => {
    // For @type='dynamic', this attribute shall be present. In this case, it specifies the anchor for
    // the computation of the earliest availability time (in UTC) for any Segment in the Media Presentation.
    // For @type=static” if present, it specifies the Segment availability start time for all Segments
    // referred to in this MPD. If not present, all Segments described in the MPD shall become available
    // at the time the MPD becomes available.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [new DASH.Period({duration: 0})],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [new DASH.Period({duration: 0})],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@publishTime', () => {
    // @publishTime specifies the wall-clock time when the MPD was generated and published at the origin server.
    // MPDs with a later value of @publishTime shall be an update as defined in subclause 5.4 to MPDs with earlier @publishTime.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
        publishTime="2022-01-01T00:00:00.000Z"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      publishTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@availabilityEndTime', () => {
    // @availabilityEndTime specifies the latest Segment availability end time for any Segment in the Media Presentation.
    // When not present, the value is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
        availabilityEndTime="2022-01-01T00:00:00.000Z"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      availabilityEndTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [new DASH.Period({duration: 0})],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
        availabilityStartTime="2022-01-01T01:00:00.000Z"
        availabilityEndTime="2022-01-01T00:00:00.000Z"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      availabilityStartTime: new Date('2022-01-01T01:00:00.000Z'),
      availabilityEndTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@mediaPresentationDuration', () => {
    // @mediaPresentationDuration specifies the duration of the entire Media Presentation.
    // If the attribute is not present, the duration of the Media Presentation is unknown.
    // This attribute shall be present when neither the attribute MPD@minimumUpdatePeriod
    // nor the Period@duration of the last Period are present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
        mediaPresentationDuration="PT30S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      mediaPresentationDuration: 30,
      children: [new DASH.Period({duration: 0})],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        minimumUpdatePeriod="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      minimumUpdatePeriod: 2,
      children: [new DASH.Period({duration: 0})],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [new DASH.Period({duration: 0})],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <Period/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [new DASH.Period()],
    }));
  });

  test('MPD@minimumUpdatePeriod', () => {
    // If this attribute is present, it specifies the smallest period between potential changes to the MPD.
    // This can be useful to control the frequency at which a client checks for updates.
    // From a client perspective, after a client fetches an MPD, it specifies the minimum period during which
    // the MPD remains valid. Validity is defined in subclause 5.4.
    // If this attribute is not present, it indicates that the MPD does not change.
    // If MPD@type is not 'dynamic', @minimumUpdatePeriod shall not be present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        minimumUpdatePeriod="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      minimumUpdatePeriod: 2,
      children: [new DASH.Period({duration: 0})],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        minimumUpdatePeriod="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      minimumUpdatePeriod: 2,
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@minBufferTime', () => {
    // @minBufferTime specifies a common duration used in the definition of the Representation data rate
    // (see @bandwidth attribute in subclauses 5.3.5.2 and 5.3.5.4).
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT4S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 4,
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@timeShiftBufferDepth', () => {
    // @timeShiftBufferDepth specifies the duration of the smallest time shifting buffer for any Representation in the MPD
    // that is guaranteed to be available for a Media Presentation with type 'dynamic'. When not present, the value is infinite.
    // This value of the attribute is undefined if the type attribute is equal to 'static'.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        minimumUpdatePeriod="PT2S"
        timeShiftBufferDepth="PT60S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      minimumUpdatePeriod: 2,
      timeShiftBufferDepth: 60,
      children: [new DASH.Period({duration: 0})],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT4S"
        timeShiftBufferDepth="PT60S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 4,
      timeShiftBufferDepth: 60,
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@suggestedPresentationDelay', () => {
    // When @type is 'dynamic', @suggestedPresentationDelay specifies a fixed delay offset in time
    // from the presentation time of each access unit that is suggested to be used for presentation of each access unit.
    // For more details, refer to subclause 7.2.1. When not specified, then no value is provided and the client is
    // expected to choose a suitable value.
    // When @type is 'static'the value of the attribute is undefined and may be ignored.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        minimumUpdatePeriod="PT2S"
        suggestedPresentationDelay="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      minimumUpdatePeriod: 2,
      suggestedPresentationDelay: 2,
      children: [new DASH.Period({duration: 0})],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT4S"
        suggestedPresentationDelay="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 4,
      suggestedPresentationDelay: 2,
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@maxSegmentDuration', () => {
    // @maxSegmentDuration specifies the maximum duration of any Segment in any Representation in the Media Presentation,
    // i.e. documented in this MPD and any future update of the MPD. If not present, then the maximum Segment duration
    // shall be the maximum duration of any Segment documented in this MPD.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT4S"
        maxSegmentDuration="PT5S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 4,
      maxSegmentDuration: 5,
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD@maxSubsegmentDuration', () => {
    // @maxSubsegmentDuration specifies the maximum duration of any Media Subsegment in any Representation in the Media Presentation.
    // If not present, the same value as for the maximum Segment duration is implied.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT4S"
        maxSegmentDuration="PT5S"
        maxSubsegmentDuration="PT2S"
      >
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 4,
      maxSegmentDuration: 5,
      maxSubsegmentDuration: 2,
      children: [new DASH.Period({duration: 0})],
    }));
  });

  test('MPD.PatchLocation', () => {
    // PatchLocation specifies a location at which the MPD patch document is available. Details on the MPD patch document,
    // this element, and expected processing models are available in subclause 5.15.
    // If this element is present, the MPD@id attribute and the MPD@publishTime shall be present.
    // When @type is 'static'or the @minimumUpdatePeriod attribute is not present, then value of the element is undefined
    // and may be ignored.
    // If this element is not present, no MPD patch document is available.
    // If multiple elements are present, any PatchLocation element may be used.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        id="1234567890"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        publishTime="2022-01-01T00:00:00.000Z"
        minimumUpdatePeriod="PT2S"
      >
        <Period duration="PT0S"/>
        <PatchLocation/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      id: '1234567890',
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      publishTime: new Date('2022-01-01T00:00:00.000Z'),
      minimumUpdatePeriod: 2,
      children: [
        new DASH.Period({duration: 0}),
        new DASH.PatchLocation(),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        publishTime="2022-01-01T00:00:00.000Z"
        minimumUpdatePeriod="PT2S"
      >
        <Period duration="PT0S"/>
        <PatchLocation/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      publishTime: new Date('2022-01-01T00:00:00.000Z'),
      minimumUpdatePeriod: 2,
      children: [
        new DASH.Period({duration: 0}),
        new DASH.PatchLocation(),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        minBufferTime="PT2S"
        id="1234567890"
        type="dynamic"
        availabilityStartTime="2022-01-01T00:00:00.000Z"
        minimumUpdatePeriod="PT2S"
      >
        <Period duration="PT0S"/>
        <PatchLocation/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      id: '1234567890',
      type: 'dynamic',
      availabilityStartTime: new Date('2022-01-01T00:00:00.000Z'),
      minimumUpdatePeriod: 2,
      children: [
        new DASH.Period({duration: 0}),
        new DASH.PatchLocation(),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT4S"
        id="1234567890"
        publishTime="2022-01-01T00:00:00.000Z"
      >
        <Period duration="PT0S"/>
        <PatchLocation/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 4,
      id: '1234567890',
      publishTime: new Date('2022-01-01T00:00:00.000Z'),
      children: [
        new DASH.Period({duration: 0}),
        new DASH.PatchLocation(),
      ],
    }));
  });

  /* WIP
  test('MPD.InitializationSet', () => {
    // InitializationSet specifies a suitable initialization for a specific media type for the presentation.
    // If present, at least one Period of the Media Presentation shall include at least one Adaptation Set
    // that can be played when initialized by this Initialization Set.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT4S"
      >
        <Period>
          <AdaptationSet/>
        </Period>
        <InitializationSet/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 4,
      children: [
        new DASH.Period({
          children: [new DASH.AdaptationSet()],
        }),
        new DASH.InitializationSet(),
      ],
    }));
  });
  */

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});

/*
describe('ISO_IEC-23009-1_2022/5.3.01_MPD', () => {
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <MPD
        xmlns="urn:mpeg:dash:schema:mpd:2011"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd"
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        type="static"
        mediaPresentationDuration="PT0H0M30.0S"
        minBufferTime="PT2S"
        availabilityStartTime="2022-01-01T00:00:00Z"
        publishTime="2022-01-01T00:00:00Z"
        minimumUpdatePeriod="PT1S"
        timeShiftBufferDepth="PT0H0M30.0S"
        suggestedPresentationDelay="PT0S"
        maxSegmentDuration="PT0H0M10.0S"
        maxSubsegmentDuration="PT0H0M2.0S"
    >
        <Period id="1" start="PT0S" duration="PT0H0M30.0S">
        <AdaptationSet id="1" contentType="video" mimeType="video/mp4" codecs="avc1.4d401f" frameRate="24" width="1280" height="720" sar="1:1" startWithSAP="1" bandwidth="1000000">
            <SegmentTemplate media="video-$Number$.mp4" initialization="video-init.mp4" startNumber="1" timescale="90000" duration="900000" />
            <Representation id="1" bandwidth="1000000" />
        </AdaptationSet>
        <AdaptationSet id="2" contentType="audio" mimeType="audio/mp4" codecs="mp4a.40.2" startWithSAP="1" bandwidth="128000">
            <SegmentTemplate media="audio-$Number$.mp4" initialization="audio-init.mp4" startNumber="1" timescale="44100" duration="441000" />
            <Representation id="1" bandwidth="128000" />
        </AdaptationSet>
        </Period>
    </MPD>
  `;
  const expected = {
    MPD: {
      '@': {
        xmlns: 'urn:mpeg:dash:schema:mpd:2011',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd',
        profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
        type: 'static',
        mediaPresentationDuration: 'PT0H0M30.0S',
        minBufferTime: 'PT2S',
        availabilityStartTime: '2022-01-01T00:00:00Z',
        publishTime: '2022-01-01T00:00:00Z',
        minimumUpdatePeriod: 'PT1S',
        timeShiftBufferDepth: 'PT0H0M30.0S',
        suggestedPresentationDelay: 'PT0S',
        maxSegmentDuration: 'PT0H0M10.0S',
        maxSubsegmentDuration: 'PT0H0M2.0S',
      },
      Period: {
        '@': {
          id: 1,
          start: 'PT0S',
          duration: 'PT0H0M30.0S',
        },
        AdaptationSet: [
          {
            '@': {
              id: 1,
              contentType: 'video',
              mimeType: 'video/mp4',
              codecs: 'avc1.4d401f',
              frameRate: 24,
              width: 1280,
              height: 720,
              sar: '1:1',
              startWithSAP: 1,
              bandwidth: 1_000_000,
            },
            SegmentTemplate: {
              '@': {
                media: 'video-$Number$.mp4',
                initialization: 'video-init.mp4',
                startNumber: 1,
                timescale: 90_000,
                duration: 900_000,
              },
            },
            Representation: {
              '@': {
                id: 1,
                bandwidth: 1_000_000,
              },
            },
          },
          {
            '@': {
              id: 2,
              contentType: 'audio',
              mimeType: 'audio/mp4',
              codecs: 'mp4a.40.2',
              startWithSAP: 1,
              bandwidth: 128_000,
            },
            SegmentTemplate: {
              '@': {
                media: 'audio-$Number$.mp4',
                initialization: 'audio-init.mp4',
                startNumber: 1,
                timescale: 44_100,
                duration: 441_000,
              },
            },
            Representation: {
              '@': {
                id: 1,
                bandwidth: 128_000,
              },
            },
          },
        ],
      },
    },
  };
  test('MPD', () => {
    expect(DASH.parse(xml)).toEqual(expected);
    expect(DASH.stringify(expected)).toBe(xml);
  });
});
*/
