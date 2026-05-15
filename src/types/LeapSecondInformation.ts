import type {ParsedObject} from './types';
import {Element} from './Element';

export class LeapSecondInformation extends Element {
  public availabilityStartLeapOffset?: number;
  public nextAvailabilityStartLeapOffset?: number;
  public nextLeapChangeTime?: Date;

  constructor(initialValues?: Partial<LeapSecondInformation>, ctx?: ParsedObject) {
    super({name: 'LeapSecondInformation', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    if (typeof initialValues?.nextLeapChangeTime === 'string') {
      const date = new Date(initialValues.nextLeapChangeTime);
      if (!Number.isNaN(date.getTime())) {
        initialValues.nextLeapChangeTime = date;
      }
    }
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    this.verifyInt('availabilityStartLeapOffset', true);
    this.verifyInt('nextAvailabilityStartLeapOffset');
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (typeof this.availabilityStartLeapOffset === 'number') {
      obj.availabilityStartLeapOffset = this.availabilityStartLeapOffset;
    }
    if (typeof this.nextAvailabilityStartLeapOffset === 'number') {
      obj.nextAvailabilityStartLeapOffset = this.nextAvailabilityStartLeapOffset;
    }
    if (this.nextLeapChangeTime instanceof Date) {
      obj.nextLeapChangeTime = this.nextLeapChangeTime.toISOString();
    }
    return obj;
  }
}
