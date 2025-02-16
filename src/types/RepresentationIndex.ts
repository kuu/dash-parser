import type {ParsedObject} from './types';
import {URLType} from './URLType';

export class RepresentationIndex extends URLType {
  constructor(initialValues?: Partial<RepresentationIndex>) {
    super({name: 'RepresentationIndex', ...initialValues});
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
