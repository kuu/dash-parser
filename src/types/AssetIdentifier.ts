import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

export class AssetIdentifier extends Descriptor {
  constructor(initialValues?: Partial<AssetIdentifier>, ctx?: ParsedObject) {
    super({name: 'AssetIdentifier', ...initialValues}, ctx);
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
