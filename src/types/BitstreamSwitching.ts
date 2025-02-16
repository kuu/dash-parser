import type {ParsedObject} from './types';
import {URLType} from './URLType';

export class BitstreamSwitching extends URLType {
  constructor(initialValues?: Partial<BitstreamSwitching>) {
    super({name: 'BitstreamSwitching', ...initialValues});
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
