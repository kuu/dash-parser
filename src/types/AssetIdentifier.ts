import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

export class AssetIdentifier extends Descriptor {
  constructor(initialValues?: Partial<AssetIdentifier>) {
    super({name: 'AssetIdentifier', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);
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
