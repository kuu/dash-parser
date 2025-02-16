import type {ParsedObject} from './types';
import {Label} from './Label';

export class GroupLabel extends Label {
  constructor(initialValues?: Partial<GroupLabel>) {
    super({name: 'GroupLabel', ...initialValues});
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
