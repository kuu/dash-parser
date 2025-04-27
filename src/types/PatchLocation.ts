import type {ParsedObject} from './types';
import {Element} from './Element';

export class PatchLocation extends Element {
  public url?: string;

  constructor(initialValues?: Partial<PatchLocation>, ctx?: ParsedObject) {
    super({name: 'PatchLocation', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
