import type {ParsedObject} from './types';
import {Label} from './Label';

export class GroupLabel extends Label {
  constructor(initialValues?: Partial<GroupLabel>, ctx?: ParsedObject) {
    super({name: 'GroupLabel', ...initialValues}, ctx);
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
