import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

export class SupplementalProperty extends Descriptor {
  constructor(initialValues?: Partial<SupplementalProperty>, ctx?: ParsedObject) {
    super({name: 'SupplementalProperty', ...initialValues}, ctx);
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
