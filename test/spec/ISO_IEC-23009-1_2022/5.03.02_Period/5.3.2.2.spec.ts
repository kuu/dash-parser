import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.3.2.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('Period@xlink:href', () => {
    // @xlink:href specifies a reference to a remote element entity that is either empty or contains one or multiple
    // top-level elements of type Period.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period
          xlink:href="http://www.example.com/dash/remote-period.mpd"
          duration="PT0S"
        />
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          xlinkHref: 'http://www.example.com/dash/remote-period.mpd',
          duration: 0,
        }),
      ],
    }));
  });

  test('Period@xlink:actuate', () => {
    // @xlink:actuate specifies the processing instructions, which can be either "onLoad" or "onRequest".
    // This attribute shall not be present if the @xlink:href attribute is not present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period
          xlink:href="http://www.example.com/dash/remote-period.mpd"
          xlink:actuate="onLoad"
          duration="PT0S"
        />
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          xlinkHref: 'http://www.example.com/dash/remote-period.mpd',
          xlinkActuate: 'onLoad',
          duration: 0,
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period
          xlink:href="http://www.example.com/dash/remote-period.mpd"
          xlink:actuate="onRequest"
          duration="PT0S"
        />
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          xlinkHref: 'http://www.example.com/dash/remote-period.mpd',
          xlinkActuate: 'onRequest',
          duration: 0,
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period
          xlink:actuate="onLoad"
          duration="PT0S"
        />
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          xlinkActuate: 'onLoad',
          duration: 0,
        }),
      ],
    }));
  });

  test('Period@id', () => {
    // @id sspecifies an identifier for this Period. The identifier shall be unique within the scope of the Media Presentation.
    // If the MPD@type is "dynamic", then this attribute shall be present and shall not change in case the MPD is updated.
    // If not present, no identifier for the Period is provided.
    // In case of a remote period element, every Period@id within the remote entity has to be unique within the media presentation.
    // If the generator of the remote entity is unaware of the Period@id values used within the media presentation,
    // it can use unique identifiers (such as UUIDs) as values for Period@id. If the xlink resolver maintains the same
    // generated id for every client and for each time that the remote period is requested, the remote element is cacheable.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period
          id="1234567890"
          duration="PT0S"
        />
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          id: '1234567890',
          duration: 0,
        }),
      ],
    }));
  });

  test('Period@start', () => {
    // if present, specifies the PeriodStart time of the Period. The PeriodStart time is used as an anchor to determine
    // the MPD start time of each Media Segment as well as to determine the presentation time of each access unit in the
    // Media Presentation timeline.
    // If not present, refer to the details in subclause 5.3.2.1.
    // The value of PeriodStart, together with the value of the MPD@availabilityStartTime enables to derive the Segment
    // availability times for dynamic media presentations. For details, refer to subclause 5.3.9.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period
          start="2022-01-01T00:00:00.000Z"
          duration="PT0S"
        />
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          start: new Date('2022-01-01T00:00:00.000Z'),
          duration: 0,
        }),
      ],
    }));
  });

  test('Period@duration', () => {
    // if present, specifies the duration of the Period to determine the PeriodStart time of the next Period.
    // If not present, refer to the details in subclause 5.3.2.1.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period
          duration="PT0S"
        />
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 0,
        }),
      ],
    }));
  });

  test('Period@bitstreamSwitching', () => {
    // When set to 'true', this is equivalent as if the AdaptationSet@bitstreamSwitching for each Adaptation Set contained
    // in this Period is set to ′true′. In this case, the AdaptationSet@bitstreamSwitching attribute shall not be set to 'false'
    // for any Adaptation Set in this Period.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period
          duration="PT0S"
          bitstreamSwitching="true"
        />
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 0,
          bitstreamSwitching: true,
        }),
      ],
    }));
  });

  test('Period.ContentProtection', () => {
    // ContentProtection specifies information about content protection and encryption schemes used in this Media Presentation.
    // If present on this level, it shall include the @refId attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT0S">
          <ContentProtection
            schemeIdUri="urn:mpeg:dash:mp4protection:2011"
            refId="1234567890"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 0,
          children: [new DASH.ContentProtection({
            schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
            refId: '1234567890',
          })],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT0S">
          <ContentProtection schemeIdUri="urn:mpeg:dash:mp4protection:2011"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 0,
          children: [new DASH.ContentProtection({
            schemeIdUri: 'urn:mpeg:dash:mp4protection:2011',
          })],
        }),
      ],
    }));
  });

  test('Period.AdaptationSet', () => {
    // At least one Adaptation Set shall be present in each Period unless the value of the @duration
    // attribute of the Period is set to zero.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [new DASH.AdaptationSet({mimeType: 'video/mp4'})],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT0S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 0,
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S"/>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
        }),
      ],
    }));
  });

  test('Period.AssetIdentifier', () => {
    // AssetIdentifier (0...1) specifies that this Period belongs to a certain asset.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4"/>
          <AssetIdentifier schemeIdUri="urn:org:dashif:asset-id:2013" value="xxx"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({mimeType: 'video/mp4'}),
            new DASH.AssetIdentifier({schemeIdUri: 'urn:org:dashif:asset-id:2013', value: 'xxx'}),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-live:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4"/>
          <AssetIdentifier schemeIdUri="urn:org:dashif:asset-id:2013" value="xxx"/>
          <AssetIdentifier schemeIdUri="urn:org:dashif:asset-id:2013" value="yyy"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-live:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.AdaptationSet({mimeType: 'video/mp4'}),
            new DASH.AssetIdentifier({schemeIdUri: 'urn:org:dashif:asset-id:2013', value: 'xxx'}),
            new DASH.AssetIdentifier({schemeIdUri: 'urn:org:dashif:asset-id:2013', value: 'yyy'}),
          ],
        }),
      ],
    }));
  });

  /* WIP
  test('Period.EmptyAdaptationSet', () => {
    // EmptyAdaptationSet specifies an Adaptation Set that does not contain any Representation element.
    // The empty Adaptation Set is of the same type as a regular Adaptation Set but shall neither contain
    // an xlink nor contain any Representation element.
    // This element shall only be present, if an Essential Descriptor is present with @schemeIDURI set to
    // "urn:mpeg:dash:mpd-as-linking:2015".
  });
  */

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
