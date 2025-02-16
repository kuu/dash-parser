import type {ParsedObject} from './types';
import {Element} from './Element';

export class AssetIdentifier extends Element {
  public schemeIdUri?: string;
  public value?: string;

  constructor(initialValues?: Partial<AssetIdentifier>) {
    super({name: 'AssetIdentifier', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.schemeIdUri === 'string') {
      obj.schemeIdUri = this.schemeIdUri;
    }
    if (typeof this.value === 'string') {
      obj.value = this.value;
    }
    return obj;
  }
}
