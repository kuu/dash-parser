import type {ParsedObject, Range} from './types';
import {SegmentBase} from './SegmentBase';

export abstract class MultipleSegmentBase extends SegmentBase {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'SegmentTimeline',
    'BitstreamSwitching',
  ];

  static override readonly CHILDRREN_SPEC: Record<string, Range> = {
    SegmentTimeline: [0, 1],
    BitstreamSwitching: [0, 1],
  };

  public duration?: number;
  public startNumber?: number;
  public endNumber?: number;

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
    if (typeof this.duration === 'number' && this.duration <= 0) {
      this.reject('@duration must be a positive number');
    }
    this.verifyUnsignedInt('startNumber');
    this.verifyUnsignedInt('endNumber');
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
    this.verifyChidrenSpec(this.static.CHILDRREN_SPEC);
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (this.duration) {
      obj.duration = this.duration;
    }
    if (this.startNumber) {
      obj.startNumber = this.startNumber;
    }
    if (this.endNumber) {
      obj.endNumber = this.endNumber;
    }
    return obj;
  }
}
