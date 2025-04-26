import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.10.2.2', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('EventStream@xlink:href', () => {
    // @xlink:href specifies a reference to an external EventStream element.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            xlink:href="http://www.example.com/dash/remote-event-stream.mpd"
            schemeIdUri="urn:scte:scte35:2013:xml"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              xlinkHref: 'http://www.example.com/dash/remote-event-stream.mpd',
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream@xlink:actuate', () => {
    // @xlink:actuate specifies the processing instructions, which can be either "onLoad" or "onRequest".
    // This attribute shall not be present if the @xlink:href attribute is not present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            xlink:href="http://www.example.com/dash/remote-event-stream.mpd"
            xlink:actuate="onLoad"
            schemeIdUri="urn:scte:scte35:2013:xml"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              xlinkHref: 'http://www.example.com/dash/remote-event-stream.mpd',
              xlinkActuate: 'onLoad',
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            xlink:href="http://www.example.com/dash/remote-event-stream.mpd"
            xlink:actuate="onRequest"
            schemeIdUri="urn:scte:scte35:2013:xml"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              xlinkHref: 'http://www.example.com/dash/remote-event-stream.mpd',
              xlinkActuate: 'onRequest',
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            xlink:actuate="onRequest"
            schemeIdUri="urn:scte:scte35:2013:xml"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              xlinkActuate: 'onRequest',
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream@schemeIdUri', () => {
    // @schemeIdUri identifies the message scheme. The string may use URN or URL syntax.
    // When a URL is used, it is recommended to also contain a month-date in the form mmyyyy;
    // the assignment of the URL must have been authorized by the owner of the domain name in that URL on or very close to that date.
    // A URL may resolve to an Internet location, and a location that does resolve may store a specification of the message scheme.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            schemeIdUri="urn:scte:scte35:2013:xml"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            xlink:href="http://www.example.com/dash/remote-event-stream.mpd"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              xlinkHref: 'http://www.example.com/dash/remote-event-stream.mpd',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream@value', () => {
    // @value specifies the value for the event stream element.
    // The value space and semantics must be defined by the owners of the scheme identified in the @schemeIdUri attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            schemeIdUri="urn:scte:scte35:2013:xml"
            value="SCTE-35::splice_insert()"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              value: 'SCTE-35::splice_insert()',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            schemeIdUri="urn:scte:scte35:2013:xml"
            value="0"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              value: '0',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream@@timescale', () => {
    // @timescale specifies the timescale in units per seconds to be used for the derivation of different real-time duration values in the Event elements.
    // If not present on any level, it shall be set to 1.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            schemeIdUri="urn:scte:scte35:2013:xml"
            timescale="90000"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 90_000,
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            schemeIdUri="urn:scte:scte35:2013:xml"
            timescale="29.97"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 29.97,
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream.Event', () => {
    // Event specifies an event and contains the message of the event, formatted as a string.
    // The content of this element depends on the event scheme.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml">
            <Event/>
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new DASH.Event(),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream.Event@presentationTime', () => {
    // @presentationTime specifies the presentation time of the event relative to the start of the Period.
    // The value of the presentation time in seconds is the division of the value of this attribute and the value of the @timescale attribute.
    // If not present, the value of the presentation time is 0.
    // Events in Event Streams shall be ordered such that their presentation time is non-decreasing.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml" timescale="90000">
            <Event
              presentationTime="2700000"
            />
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 90_000,
              children: [
                new DASH.Event({
                  presentationTime: 2_700_000,
                }),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));

    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml">
            <Event/>
            <Event presentationTime="0.1"/>
            <Event presentationTime="0.2"/>
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new DASH.Event(),
                new DASH.Event({presentationTime: 0.1}),
                new DASH.Event({presentationTime: 0.2}),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml">
            <Event/>
            <Event presentationTime="0.2"/>
            <Event presentationTime="0.1"/>
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new DASH.Event(),
                new DASH.Event({presentationTime: 0.2}),
                new DASH.Event({presentationTime: 0.1}),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream.Event@duration', () => {
    // @duration specifies the presentation duration of the event.
    // The value of the duration in seconds is the division of the value of this attribute and the value of the @timescale attribute.
    // If not present, the value of the duration is unknown.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml" timescale="90000">
            <Event
              presentationTime="180000"
              duration="2700000"
            />
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 90_000,
              children: [
                new DASH.Event({
                  presentationTime: 180_000,
                  duration: 2_700_000,
                }),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream.Event@id', () => {
    // @id specifies an identifier for this instance of the event.
    // Events with equivalent content and attribute values in the Event element shall have the same value for this attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml">
            <Event
              id="1"
            />
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new DASH.Event({
                  id: 1,
                }),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));

    bothFail(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml">
            <Event
              id="-1"
            />
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new DASH.MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new DASH.Period({
          duration: 30,
          children: [
            new DASH.EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new DASH.Event({
                  id: -1,
                }),
              ],
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
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
