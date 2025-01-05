import {
  fromXML,
  toXML,
} from '../../src/xml';

describe('Logging', () => {
  const txt = '<?xml version="1.0" encoding="UTF-8"?>\n<MPD id="1" profile="urn:mpeg:dash:profile:isoff-on-demand:2011"/>';
  const obj = {
    MPD: {
      '@': {
        id: 1,
        profile: 'urn:mpeg:dash:profile:isoff-on-demand:2011',
      },
    },
  };

  test('toXML', () => {
    expect(toXML(obj)).toEqual(txt);
  });

  test('toXML', () => {
    expect(fromXML(txt)).toEqual(obj);
  });
});
