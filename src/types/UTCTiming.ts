import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

export class UTCTiming extends Descriptor {
  constructor(initialValues?: Partial<UTCTiming>, ctx?: ParsedObject) {
    super({name: 'UTCTiming', ...initialValues}, ctx);
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
