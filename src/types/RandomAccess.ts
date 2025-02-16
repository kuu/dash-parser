import {toTemporalDurationString, fromTemporalDurationString} from '../utils';
import type {ParsedObject} from './types';
import {Element} from './Element';

export class RandomAccess extends Element {
  public interval?: number;
  public type?: 'closed"' | 'open' | 'gradual';
  public minBufferTime?: number;
  public bandwidth?: number;

  constructor(initialValues?: Partial<RandomAccess>) {
    super({name: 'RandomAccess', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      minBufferTime,
    } = initialValues;

    if (typeof minBufferTime === 'string') {
      initialValues.minBufferTime = fromTemporalDurationString(minBufferTime);
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (typeof this.interval !== 'number') {
      this.reject('RandomAccess must have @interval attribute');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
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
      obj.minBufferTime = toTemporalDurationString(this.minBufferTime);
    }
    if (typeof this.bandwidth === 'number') {
      obj.bandwidth = this.bandwidth;
    }
    return obj;
  }
}
