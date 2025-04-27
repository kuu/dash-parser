import type {ParsedObject} from './types';
import {URLType} from './URLType';

export class RepresentationIndex extends URLType {
  constructor(initialValues?: Partial<RepresentationIndex>, ctx?: ParsedObject) {
    super({name: 'RepresentationIndex', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
