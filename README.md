[![DASH parser tests](https://github.com/kuu/dash-parser/actions/workflows/tests.yml/badge.svg)](https://github.com/kuu/dash-parser/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/kuu/dash-parser/badge.svg?branch=master)](https://coveralls.io/github/kuu/dash-parser?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/kuu/dash-parser/badge.svg)](https://snyk.io/test/github/kuu/dash-parser)
[![npm Downloads](https://img.shields.io/npm/dw/dash-parser.svg?style=flat-square)](https://npmjs.com/dash-parser)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

# dash-parser

A simple library to synchronously read/write MPEG-DASH manifests that conform to [ISO/IEC 23009-1:2022](https://dashif.org/news/5th-edition/)

## Install
[![NPM](https://nodei.co/npm/dash-parser.png?mini=true)](https://nodei.co/npm/dash-parser/)
[![](https://data.jsdelivr.com/v1/package/npm/dash-parser/badge)](https://www.jsdelivr.com/package/npm/dash-parser?path=dist)

## Usage
```js
import * as DASH from 'dash-parser';

// Parse an existing manifest file and create a MPD object
const mpdObject = DASH.parse(textData);

// Or create an object from scratch
const {MPD, BaseURL, Period, AdaptationSet} = DASH;
const mpdObject = new MPD({
  type: "static",
  minBufferTime: 2,
  profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
  mediaPresentationDuration: 512,
  children: [
    new BaseURL({
      url: "http://cdn1.example.com",
    }),
    new BaseURL({
      url: "http://cdn2.example.com",
    }),
    new Period({
      duration: 512,
      children: [
        new AdaptationSet({
          contentType: 'video',
          mimeType: 'video/mp4',
          codecs: 'avc1.4d401f',
          frameRate: 24,
          width: 1280,
          height: 720,
          children: [
            // ...
          ],
        }),
        new AdaptationSet({
          contentType: 'audio',
          mimeType: 'audio/mp4',
          codecs: 'mp4a.40.2',
          audioSamplingRate: 48000,
          children: [
            // ...
          ],
        }),
      ],
    },
  ],
});

// Convert the MPD object into a text
DASH.stringify(mpdObject);
/*
<?xml version="1.0" encoding="UTF-8"?>
  <MPD
    type="static"
    mediaPresentationDuration="PT512S"
    minBufferTime="PT2S"
    profiles="urn:mpeg:dash:profile:isoff-on-demand:2011">
    
    <BaseURL>http://cdn1.example.com/</BaseURL>
    <BaseURL>http://cdn2.example.com/</BaseURL>
    
    <Period>
    ...
*/
```

## API

### `DASH.parse(str)`
Converts a plain text manifest into a structured MPD object

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| str     | string | Yes      | N/A     | A text data that conforms to ISO/IEC 23009-1 |

#### return value
| Type   | Description   |
| ------ | ------------- |
| `MPD` (See **Data structure** below.) | undefined  | An object representing Media Presentation Description (or `undefined` in case of error) |

### `DASH.stringify(obj)`
Converts an MPD object into a plain text manifest

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| obj     | `MPD` (See **Data structure** below.)  | Yes      | N/A     | An object returned by `DASH.parse()` or a manually created MPD object |

#### return value
| Type   | Description   |
| ------ | ------------- |
| string | A text data that conforms to ISO/IEC 23010-1 (or `undefined` in case of error) |

### `DASH.setOptions(obj)`
Updates the global option values

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| obj     | object | Yes      | N/A     | An object holding key/value pairs that will be merged with the internal option values.  |

#### return value
| Type   | Description   |
| ------ | ------------- |
| void | N/A |

##### supported options
| Name       | Type    | Default | Description   |
| ---------- | ------- | ------- | ------------- |
| `strictMode` | boolean | false   | If true, the function throws an error when `parse`/`stringify` failed. If false, the function just logs the error and continues to run.|
| `silent` | boolean | false   | If true, `console.error` will be suppressed.|

### `DASH.getOptions()`
Retrieves the current global option values

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| N/A     | void | N/A      | N/A     | Accepts no param  |

#### return value
| Type   | Description   |
| ------ | ------------- |
| object | A cloned object containing the current option values |


## Data structure
This section describes the structure of the object returned by `parse()` method.

