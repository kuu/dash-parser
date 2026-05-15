import type {ParsedObject} from './types';
import {URLType} from './URLType';

export class Initialization extends URLType {
  constructor(initialValues?: Partial<Initialization>, ctx?: ParsedObject) {
    super({name: 'Initialization', ...initialValues}, ctx);
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
