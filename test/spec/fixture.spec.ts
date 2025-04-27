import * as DASH from '../../src/index';
import {getFixtures} from '../helpers/fixtures';

describe('API check', () => {
  beforeAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: false,
    });
  });

  test('Test fixtures', async () => {
    const fixtures = await getFixtures();
    for (const {manifest, obj} of fixtures) {
      if (manifest && obj) {
        expect(DASH.parse(manifest)).toEqual(obj);
      }
    }
  });

  afterAll(() => {
    DASH.setOptions({
      strictMode: false,
      silent: true,
    });
  });
});
