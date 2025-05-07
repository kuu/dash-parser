import type {ParsedObject} from './types';
import {URLType} from './URLType';

export class BitstreamSwitching extends URLType {
  constructor(initialValues?: Partial<BitstreamSwitching>, ctx?: ParsedObject) {
    super({name: 'BitstreamSwitching', ...initialValues}, ctx);
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
