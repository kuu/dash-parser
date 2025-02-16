import type {ParsedObject} from './types';
import {MultipleSegmentBase} from './MultipleSegmentBase';

export class SegmentTemplate extends MultipleSegmentBase {
  public media?: string;

  constructor(initialValues?: Partial<SegmentTemplate>) {
    super({name: 'SegmentTemplate', ...initialValues});
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
    const obj = super.serializedProps;
    return obj;
  }
}
