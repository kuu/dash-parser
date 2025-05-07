import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

export class Accessibility extends Descriptor {
  constructor(initialValues?: Partial<Accessibility>, ctx?: ParsedObject) {
    super({name: 'Accessibility', ...initialValues}, ctx);
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
