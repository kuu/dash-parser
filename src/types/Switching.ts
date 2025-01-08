import type {ParsedObject} from './types';
import {Element} from './Element';

export class Switching extends Element {
  public interval?: number;
  public type?: 'media' | 'bitstream';

  constructor(initialValues?: Partial<Switching>) {
    super('Switching');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(): void {
    if (typeof this.interval !== 'number' || this.interval < 0) {
      this.reject('@interval should be an unsigned integer');
    }
    if (typeof this.type === 'string' && this.type !== 'media' && this.type !== 'bitstream') {
      this.reject('@type should be either "media" or "bitstream"');
    }
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.interval === 'number') {
      obj.interval = this.interval;
    }
    if (this.type) {
      obj.type = this.type;
    }
    return obj;
  }
}
