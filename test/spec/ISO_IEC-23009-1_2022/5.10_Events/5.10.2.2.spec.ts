import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

const {MPD, Period, AdaptationSet, EventStream, Event} = DASH;

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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              xlinkHref: 'http://www.example.com/dash/remote-event-stream.mpd',
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              xlinkHref: 'http://www.example.com/dash/remote-event-stream.mpd',
              xlinkActuate: 'onLoad',
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              xlinkHref: 'http://www.example.com/dash/remote-event-stream.mpd',
              xlinkActuate: 'onRequest',
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              xlinkActuate: 'onRequest',
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              xlinkHref: 'http://www.example.com/dash/remote-event-stream.mpd',
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              value: 'SCTE-35::splice_insert()',
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              value: '0',
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 90_000,
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 29.97,
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream@presentationTimeOffset', () => {
    // @presentationTimeOffset specifies the presentation time offset of this Event Stream that aligns with the start of the Period.
    // Any Event contained in this Event Stream is mapped to the Period timeline by using the Event presentation time subtracted by the value of the presentation time offset.
    // This adjustment shall not be applied to Inband event message streams.
    // The value of the presentation time offset in seconds is the division of the value of this attribute and the value of the @timescale attribute.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream
            schemeIdUri="urn:scte:scte35:2013:xml"
            timescale="90000"
            presentationTimeOffset="45000"
          />
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 90_000,
              presentationTimeOffset: 45_000,
            }),
            new AdaptationSet({
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
    // The contents shall be either:
    // • A string, optionally encoded as specified by @contentEncoding
    // • XML content using elements external to the MPD namespace
    // For new event schemes string content should be used, making use of Base 64 encoding if needed.
    // NOTE The schema allows “mixed” content within this element however only string data or XML elements are permitted by the above options, not a combination.
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new Event(),
              ],
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 90_000,
              children: [
                new Event({
                  presentationTime: 2_700_000,
                }),
              ],
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new Event(),
                new Event({presentationTime: 0.1}),
                new Event({presentationTime: 0.2}),
              ],
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new Event(),
                new Event({presentationTime: 0.2}),
                new Event({presentationTime: 0.1}),
              ],
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              timescale: 90_000,
              children: [
                new Event({
                  presentationTime: 180_000,
                  duration: 2_700_000,
                }),
              ],
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new Event({
                  id: 1,
                }),
              ],
            }),
            new AdaptationSet({
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
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new Event({
                  id: -1,
                }),
              ],
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream.Event@contentEncoding', () => {
    // @contentEncoding specifies whether the information in the body and the information in the @messageData is encoded.
    // If present, the following value is possible:
    // • base64 the content is encoded as described in IETF RFC 4648 prior to adding it to the field.
    // If this attribute is present, the DASH Client is expected to decode the message data and only provide the decoded message to the application.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml">
            <Event
              contentEncoding="base64"
            />
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new Event({
                  contentEncoding: 'base64',
                }),
              ],
            }),
            new AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('EventStream.Event@messageData', () => {
    // @messageData specifies the value for the event stream element.
    // The value space and semantics must be defined by the owners of the scheme identified in the @schemeIdUri attribute.
    // NOTE the use of the message data is discouraged by content authors, it is only maintained for the purpose of backward-compatibility.
    // Including the message in the Event element is recommended in preference to using this attribute.
    // This attribute is expected to be deprecated in the future editions of this document.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <EventStream schemeIdUri="urn:scte:scte35:2013:xml">
            <Event
              messageData="xxx"
            />
          </EventStream>
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
      </MPD>
    `, new MPD({
      profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      minBufferTime: 2,
      children: [
        new Period({
          duration: 30,
          children: [
            new EventStream({
              schemeIdUri: 'urn:scte:scte35:2013:xml',
              children: [
                new Event({
                  messageData: 'xxx',
                }),
              ],
            }),
            new AdaptationSet({
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
