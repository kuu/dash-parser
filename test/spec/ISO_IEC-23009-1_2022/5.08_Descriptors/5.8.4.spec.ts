import * as DASH from '../../../../src/index';
import {bothPass, bothFail} from '../../../helpers/utils';

describe('ISO_IEC-23009-1_2022/5.8.4', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: true,
      silent: true,
    });
  });

  test('5.8.4.2 Role', () => {
    // For the element Role, the @schemeIdUri attribute is used to identify the role scheme employed toidentify the role of the media content component.
    // Roles define and describe characteristics and/or structural functions of media content components.
    // One Adaptation Set or one media content component may have assigned multiple roles even within the same scheme.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Role schemeIdUri="urn:mpeg:dash:role:2011" value="main"/>
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
                new DASH.Role({
                  schemeIdUri: 'urn:mpeg:dash:role:2011',
                  value: 'main',
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('5.8.4.3 Accessibility', () => {
    // For the element Accessibility, the @schemeIdUri attribute is used to identify the accessibilityscheme employed.
    // Accessibility is a general term used to describe the degree to which the DASH Media Presentation is available to as many people as possible.
    // NOTE Accessibility elements fulfil a very similar purpose with respect to media contentcomponents as for Role elements but are specifically intended for accessibility.
    // One Adaptation Set or one media content component may have assigned multiple accessibility purposes even within the same scheme.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Accessibility schemeIdUri="urn:scte:dash:cc:cea-608:2015" value="CC1=eng"/>
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
                new DASH.Accessibility({
                  schemeIdUri: 'urn:scte:dash:cc:cea-608:2015',
                  value: 'CC1=eng',
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('5.8.4.4 Rating', () => {
    // For the element Rating, the @schemeIdUri attribute is used to identify the rating scheme employed.
    // Ratings specify that content is suitable for presentation to audiences for which that rating is known to be appropriate, or for unrestricted audiences.
    // NOTE If an audience has a rating restriction, it is intended that content that has associated ratings is not presented to that audience,
    // unless at least one scheme is recognized and the rating value indicates that the content is appropriate to that audience.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Rating schemeIdUri="urn:dvb:iptv:rating:2014" value="15R"/>
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
                new DASH.Rating({
                  schemeIdUri: 'urn:dvb:iptv:rating:2014',
                  value: '15R',
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('5.8.4.5 Viewpoint', () => {
    // For the element Viewpoint, the @schemeIdUri attribute is used to identify the viewpoint scheme employed.
    // Adaptation Sets containing non-equivalent Viewpoint element values contain different media content components.
    // The Viewpoint elements may equally be applied to media content types that are not video.
    // Adaptation Sets with equivalent Viewpoint element values are intended to be presented together.
    // This handling should be applied equally for recognized and unrecognized @schemeIdUri values.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Viewpoint schemeIdUri="urn:mpeg:dash:viewpoint:2011" value="vp1"/>
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
                new DASH.Viewpoint({
                  schemeIdUri: 'urn:mpeg:dash:viewpoint:2011',
                  value: 'vp1',
                }),
              ],
            }),
          ],
        }),
      ],
    }));
  });

  test('5.8.4.6 FramePacking', () => {
    // For the element FramePacking, the @schemeIdUri attribute is used to identify the frame-packing configuration scheme employed.
    // Multiple FramePacking elements may be present. If so, each element shall contain sufficient information to select or reject the described Representations.
    // NOTE If the scheme or the value for all FramePacking elements are not recognized, the DASH Client is expected to ignore the described Representations.
    // A client can reject the Adaptation Set on the basis of observing a FramePacking element.
    // The descriptor may carry frame-packing schemes using the URN label and values defined for VideoFramePackingType in ISO/IEC 23091-3.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1000000">
              <FramePacking schemeIdUri="urn:mpeg:dash:frame-packing:2011" value="0"/>
            </Representation>
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
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_000_000,
                  children: [
                    new DASH.FramePacking({
                      schemeIdUri: 'urn:mpeg:dash:frame-packing:2011',
                      value: '0',
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

  test('5.8.4.7 AudioChannelConfiguration', () => {
    // For the element AudioChannelConfiguration, the @schemeIdUri attribute is used to identify the audio channel configuration scheme employed.
    // Multiple AudioChannelConfiguration elements may be present indicating that the Representation supports multiple audio channel configurations.
    // For example, it may describe a Representation that includes MPEG Surround audio supporting stereo and multichannel.
    // NOTE 1 If the scheme or the value for this descriptor is not recognized, the DASH Client is expected to ignore the descriptor.
    // The descriptor may carry audio channel configuration using the URN label and values defined for ChannelConfiguration in ISO/IEC 23001-8.
    // NOTE 2 In addition, a scheme for audio channel configuration is also defined in subclause 5.8.5.4. This scheme is maintained for backward-compatibility,
    // but it is preferable to use the signalling as defined in ISO/IEC 23001-8.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1000000">
              <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>
            </Representation>
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
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_000_000,
                  children: [
                    new DASH.AudioChannelConfiguration({
                      schemeIdUri: 'urn:mpeg:dash:23003:3:audio_channel_configuration:2011',
                      value: '2',
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

  test('5.8.4.8 EssentialProperty', () => {
    // For the element EssentialProperty, the Media Presentation author expresses that the successful processing of the descriptor is essential
    // to properly use the information in the parent element that contains this descriptor unless the element shares the same @id with another EssentialProperty element.
    // If EssentialProperty elements share the same @id, then processing one of the EssentialProperty elements with the same value for @id is sufficient.
    // At least one EssentialProperty element of each distinct @id value is expected to be processed.
    // NOTE 1 If the scheme or the value for this descriptor is not recognized, the DASH Client is expected to ignore the parent element that contains the descriptor.
    // Multiple EssentialProperty elements with the same value for @id and with different values for @id may be present.
    // If one or more EssentialProperty elements sharing the same @id appear at the MPD level, this means that successful processing of at least one of these descriptors
    // is essential to properly access and/or present the content described by this MPD.
    // NOTE 2 In the case when none of the EssentialProperty elements sharing the same @id can besuccessfully processed, the DASH Client is expected to terminate the media presentation.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1000000">
              <EssentialProperty schemeIdUri="urn:mpeg:dash:mpd-as-linking:2015" value="http://example.com/service1/my.mpd#period=1&amp;as=video"/>
            </Representation>
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
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_000_000,
                  children: [
                    new DASH.EssentialProperty({
                      schemeIdUri: 'urn:mpeg:dash:mpd-as-linking:2015',
                      value: 'http://example.com/service1/my.mpd#period=1&as=video',
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

  test('5.8.4.9 SupplementalProperty', () => {
    // For the element SupplementalProperty, the Media Presentation author expresses that thedescriptor contains supplemental information
    // that may be used by the DASH Client for optimized processing.
    // NOTE If the scheme or the value for this descriptor is not recognized, the DASH Client is expected to ignore the descriptor.
    // Multiple SupplementalProperty elements may be present.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1000000">
              <SupplementalProperty schemeIdUri="urn:mpeg:dash:srd:2014" value="0,0,0,2,2,2,2"/>
            </Representation>
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
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_000_000,
                  children: [
                    new DASH.SupplementalProperty({
                      schemeIdUri: 'urn:mpeg:dash:srd:2014',
                      value: '0,0,0,2,2,2,2',
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

  test('5.8.4.10 AssetIdentifier', () => {
    // The AssetIdentifier is used to identify the asset on Period level.
    // If two different Periods containequivalent Asset Identifiers then the content in the two Periods belongs to the same asset.
    // NOTE If the scheme or the value for this descriptor is not recognized, the AssetIdentifier elementcan still be used to understand the equivalence of Asset Identifiers across Periods.
    // Processing of the descriptor scheme and value by the DASH Client is not essential for normal operation.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AssetIdentifier schemeIdUri="urn:org:dashif:asset-id:2013" value="md:cid:EIDR:10.5240%2f0EFB-02CD-126E-8092-1E49-W"/>
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
            new DASH.AssetIdentifier({
              schemeIdUri: 'urn:org:dashif:asset-id:2013',
              value: 'md:cid:EIDR:10.5240%2f0EFB-02CD-126E-8092-1E49-W',
            }),
            new DASH.AdaptationSet({
              mimeType: 'video/mp4',
            }),
          ],
        }),
      ],
    }));
  });

  test('5.8.4.11 UTCTiming', () => {
    // Using the UTCTiming element, the Media Presentation author provides additional information for the client
    // to optionally obtain wall-clock time to be used in Media Presentation.
    // If multiple schemes are specified by the Media Presentation author,
    // their order indicates their relative preference, first having the highest, and the last having the least priority.
    // However, the client may choose any method, potentially having to deal with reduced accuracy.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4"/>
        </Period>
        <UTCTiming schemeIdUri="urn:mpeg:dash:utc:http-xsdate:2014" value="https://example.com/iso"/>
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
            }),
          ],
        }),
        new DASH.UTCTiming({
          schemeIdUri: 'urn:mpeg:dash:utc:http-xsdate:2014',
          value: 'https://example.com/iso',
        }),
      ],
    }));
  });

  test('5.8.4.12 OutputProtection', () => {
    // Output protection schemes, such as High-bandwidth Digital Content Protection, Digital Content Protection, LLC HDCP,
    // are frequently used to protect the rendered output in transit from the decoding device to the displaying device
    // (for example, from a set-top box connected to a TV set using an HDMI cable).
    // These output protection schemes and their properties are frequently a pre-requisite for the ability to present digital media content.
    // The OutputProtection element is a descriptor type and this descriptor may be used to identify anoutput protection descriptor scheme that is required to present the associated Representation(s).
    // The ultimate decision for whether a Representation can be rendered by a client is typically defined by the content usage rules, usually documented in the license provided by the DRM license server.
    // However, the information contained in the output protection descriptor can be used by the client to select the associated Representation or Adaptation Set and start downloading without waiting for the license server response.
    // This information is provided to the DASH client to optimize its processing. Typically, if the client ignores this information, it will identify whether its output environment is capable to play the associated Representations after processing detailed DRM information.
    // When an OutputProtection element is not present, the client should not make any assumptions on whether output protection is indeed a prerequisite for content presentation.
    // NOTE The authoritative answer to the question “can the client present this representation” is still given by the DRM license server response.
    // Hence, even if the descriptor is not understood, incorrect, or ignored, it would not result in incorrect behaviour, only in reduced efficiency.
    bothPass(`
      <?xml version="1.0" encoding="UTF-8"?>
      <MPD profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" minBufferTime="PT2S">
        <Period duration="PT30S">
          <AdaptationSet mimeType="video/mp4">
            <Representation id="1" bandwidth="1000000">
              <OutputProtection schemeIdUri="urn:mpeg:dash:output-protection:hdcp:2020" value="2.2"/>
            </Representation>
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
                new DASH.Representation({
                  id: '1',
                  bandwidth: 1_000_000,
                  children: [
                    new DASH.OutputProtection({
                      schemeIdUri: 'urn:mpeg:dash:output-protection:hdcp:2020',
                      value: '2.2',
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

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
