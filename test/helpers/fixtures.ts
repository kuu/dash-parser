import path from 'node:path';
import fs from 'node:fs';
import type {MPD} from '../../src/index';

type Fixture = {
  readonly name: string;
  readonly manifest: string;
  readonly obj: MPD;
};

export async function getFixtures(): Promise<Fixture[]> {
  const fixtures: Fixture[] = [];
  const baseDir = '../fixtures/ISO-IEC_23009-1/';
  const baseDirAbs = path.join(__dirname, baseDir);
  const manifestDir = path.join(baseDirAbs, './DASHSchema-FDIS-5th-Ed/');
  const objectDir = path.join(baseDir, './object/');
  const filenames = fs.readdirSync(manifestDir);

  for (const filename of filenames) {
    let name: string | undefined;
    if (filename.endsWith('.mpd')) {
      name = path.basename(filename, '.mpd');
    } else if (filename.endsWith('.xml')) {
      name = path.basename(filename, '.xml');
    }
    if (!name) {
      continue;
    }
    const filepath = path.join(manifestDir, filename);
    const manifest = fs.readFileSync(filepath, 'utf8');
    const modulePath = path.join(objectDir, `${name}`);
    try {
      const {obj} = await import(modulePath) as {obj: MPD};
      fixtures.push({name, manifest, obj});
    } catch {
      console.error(`Failed to import: ${modulePath}`);
    }
  }
  return fixtures;
}
