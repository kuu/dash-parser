export type ParsedObject = Record<string, any>;
export type Range = [min: number, max: number];
export type NameSpace = {
  importPath: string;
  uri: string;
};
export type NameSpacePrefix = Record<string, NameSpace>;
export function getImportPath(uri: string): string {
  switch (uri) {
    case 'http://example.net/052011/drm': {
      return 'drm';
    }
    default: {
      return '';
    }
  }
}
