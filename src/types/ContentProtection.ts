import type {ParsedObject} from './types';
import {Element} from './Element';

export class ContentProtection extends Element {
  public schemeIdUri?: string;
  public value?: string;
  public ref?: string;
  public refId?: string;
  public robustness?: number;

  constructor(initialValues?: Partial<ContentProtection>) {
    super('ContentProtection');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      refId,
    } = initialValues;

    if (typeof refId === 'number') {
      initialValues.refId = `${refId}`;
    }
  }

  override verifyAttributes(): void {
    // NOP
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};

    if (typeof this.refId === 'string') {
      obj.refId = this.refId;
    }
    return obj;
  }
}
