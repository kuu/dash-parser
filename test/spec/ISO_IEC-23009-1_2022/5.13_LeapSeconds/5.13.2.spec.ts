import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, LeapSecondInformation} = DASH;

describe('ISO_IEC-23009-1_2022/5.13.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('LeapSecondInformation@availabilityStartLeapOffset', () => {
    // @availabilityStartLeapOffset specifies the number of seconds applying at the time of MPD publication
    // that a client would need to subtract from MPD@availabilityStartTime in order to perform timing calculations
    // without further consideration of leap seconds.
    // If a leap second correction has already been applied, the LeapSecondInformation element should still
    // be present but this attribute should be set to 0.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <LeapSecondInformation availabilityStartLeapOffset="27"/>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new LeapSecondInformation({availabilityStartLeapOffset: 27}),
        new Period({duration: 0}),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <LeapSecondInformation/>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new LeapSecondInformation(),
        new Period({duration: 0}),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <LeapSecondInformation availabilityStartLeapOffset="27.5"/>
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new LeapSecondInformation({availabilityStartLeapOffset: 27.5}),
        new Period({duration: 0}),
      ],
    }));
  });

  test('LeapSecondInformation@nextAvailabilityStartLeapOffset', () => {
    // @nextAvailabilityStartLeapOffset specifies the number of seconds
    // that will apply from the time of the next leap second (indicated by the @nextLeapChangeTime)
    // that a client would need to subtract from MPD@availabilityStartTime
    // in order to perform timing calculations without further consideration of leap seconds.
    // If the timing of the next leap second is unknown, this attribute shall be omitted.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <LeapSecondInformation
          availabilityStartLeapOffset="27"
          nextAvailabilityStartLeapOffset="1"
        />
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new LeapSecondInformation({
          availabilityStartLeapOffset: 27,
          nextAvailabilityStartLeapOffset: 1,
        }),
        new Period({duration: 0}),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <LeapSecondInformation
          availabilityStartLeapOffset="27"
          nextAvailabilityStartLeapOffset="1.5"
        />
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new LeapSecondInformation({
          availabilityStartLeapOffset: 27,
          nextAvailabilityStartLeapOffset: 1.5,
        }),
        new Period({duration: 0}),
      ],
    }));
  });

  test('LeapSecondInformation@nextLeapChangeTime', () => {
    // @nextLeapChangeTime specifies the UTC time at which a leap second will occur.
    // Before this time, @availabilityStartLeapOffset applies.
    // On or after this time, @nextAvailabilityStartLeapOffset applies
    // for timing calculations made against a wall clock that has processed the leap second.
    // If the timing of the next leap second is unknown, this attribute shall be omitted.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD
        profiles="urn:mpeg:dash:profile:isoff-on-demand:2011"
        minBufferTime="PT2S"
      >
        <LeapSecondInformation
          availabilityStartLeapOffset="27"
          nextAvailabilityStartLeapOffset="1"
          nextLeapChangeTime="2024-12-31T23:59:10.000Z"
        />
        <Period duration="PT0S"/>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new LeapSecondInformation({
          availabilityStartLeapOffset: 27,
          nextAvailabilityStartLeapOffset: 1,
          nextLeapChangeTime: new Date('2024-12-31T23:59:10.000Z'),
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
