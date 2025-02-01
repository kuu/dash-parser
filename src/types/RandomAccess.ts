import {Temporal} from '@js-temporal/polyfill';
import type {ParsedObject} from './types';
import {Element} from './Element';

export class RandomAccess extends Element {
  public interval?: number;
  public type?: 'closed"' | 'open' | 'gradual';
  public minBufferTime?: number;
  public bandwidth?: number;

  constructor(initialValues?: Partial<RandomAccess>) {
    super('RandomAccess');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      minBufferTime,
    } = initialValues;

    if (typeof minBufferTime === 'string') {
      initialValues.minBufferTime = Temporal.Duration.from(minBufferTime).total({unit: 'seconds'});
    }
  }

  override verifyAttributes(): void {
    if (typeof this.interval !== 'number') {
      this.reject('RandomAccess must have @interval attribute');
    }
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {
      interval: this.interval,
    };
    if (typeof this.type === 'string') {
      obj.type = this.type;
    }
    if (typeof this.minBufferTime === 'number') {
      obj.minBufferTime = Temporal.Duration.from({seconds: this.minBufferTime}).toString();
    }
    if (typeof this.bandwidth === 'number') {
      obj.bandwidth = this.bandwidth;
    }
    return obj;
  }
}
