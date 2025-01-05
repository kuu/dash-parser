[![DASH parser tests](https://github.com/kuu/dash-parser/actions/workflows/tests.yml/badge.svg)](https://github.com/kuu/dash-parser/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/kuu/dash-parser/badge.svg?branch=master)](https://coveralls.io/github/kuu/dash-parser?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/kuu/dash-parser/badge.svg)](https://snyk.io/test/github/kuu/dash-parser)
[![npm Downloads](https://img.shields.io/npm/dw/dash-parser.svg?style=flat-square)](https://npmjs.com/dash-parser)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

# dash-parser

A simple library to synchronously read/write MPEG-DASH manifests that conform to [ISO/IEC 23009-1:2022](https://dashif.org/news/5th-edition/) (the fifth edition of the MPEG-DASH spec.)

## Install
[![NPM](https://nodei.co/npm/dash-parser.png?mini=true)](https://nodei.co/npm/dash-parser/)
[![](https://data.jsdelivr.com/v1/package/npm/dash-parser/badge)](https://www.jsdelivr.com/package/npm/dash-parser?path=dist)

## Usage
```js
import * as DASH from 'dash-parser';

// Parse the manifest
const manifest = DASH.parse(textData);
// You can access the manifest as a JS object

// Create a new manifest
const {MPD, Period} = DASH.types;
const obj = new MPD({
  type: "static",
  mediaPresentationDuration: new Date(pdt),
  minBufferTime: 1.2,
  profiles: 'VOD',
  baseUrls: [
    new BaseURL({
      url: "http://cdn1.example.com",
    }),
    new BaseURL({
      url: "http://cdn2.example.com",
    }),
  ],
  periods: [
    new Period({
      // Create internal objects
    }
  ],
});

// Convert the object into a text
DASH.stringify(obj);
/*
<?xml version="1.0" encoding="UTF-8"?>
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="urn:mpeg:dash:schema:mpd:2011"
    xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd"
    type="static"
    mediaPresentationDuration="PT3256S"
    minBufferTime="PT1.2S"
    profiles="urn:mpeg:dash:profile:isoff-on-demand:2011">
    
    <BaseURL>http://cdn1.example.com/</BaseURL>
    <BaseURL>http://cdn2.example.com/</BaseURL>
    
    <Period>
    ...
*/
```

## API

### `DASH.parse(str)`
Converts a plain text manifest into a structured JS object

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| str     | string | Yes      | N/A     | A text data that conforms to ISO/IEC 23009-1 |

#### return value
| Type   | Description   |
| ------ | ------------- |
| `MPD` (See **Data format** below.) | undefined  | An object representing Media Presentation Description (or `undefined` in case of error) |

### `DASH.stringify(obj, postProcess)`
Converts a JS object into a plain text manifest

#### params
| Name    | Type   | Required | Default | Description   |
| ------- | ------ | -------- | ------- | ------------- |
| obj     | `MPD` (See **Data format** below.)  | Yes      | N/A     | An object returned by `DASH.parse()` or a manually created object |

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

### `DASH.types`
An object that holds all the classes described below. (See **Data format** below.)


## Data format
This section describes the structure of the object returned by `parse()` method.

