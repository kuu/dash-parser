import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

export class Role extends Descriptor {
  constructor(initialValues?: Partial<Role>) {
    super({name: 'Role', ...initialValues});
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
