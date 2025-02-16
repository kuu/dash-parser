import {toTemporalDurationString, fromTemporalDurationString} from '../utils';
import type {ParsedObject} from './types';
import {Element} from './Element';

export class ExtendedBandwidth extends Element {
  static override readonly ALLOWED_CHILDREN = [
    'ModelPair',
  ];

  public vbr?: boolean;

  constructor(initialValues?: Partial<ExtendedBandwidth>) {
    super({name: 'ExtendedBandwidth', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      vbr,
    } = initialValues;

    if (typeof vbr === 'string') {
      initialValues.vbr = vbr === 'true';
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.vbr === 'boolean') {
      obj.vbr = this.vbr ? 'true' : 'false';
    }
    return obj;
  }
}

export class ModelPair extends Element {
  public bufferTime?: number;
  public bandwidth?: number;

  constructor(initialValues?: Partial<ModelPair>) {
    super({name: 'ModelPair', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      bufferTime,
    } = initialValues;

    if (typeof bufferTime === 'string') {
      initialValues.bufferTime = fromTemporalDurationString(bufferTime);
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (typeof this.bufferTime !== 'number') {
      this.reject('@bufferTime is a mandatory attribute');
    }
    if (typeof this.bandwidth !== 'number') {
      this.reject('@bandwidth is a mandatory attribute');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {
      bufferTime: toTemporalDurationString(this.bufferTime!),
      bandwidth: this.bandwidth,
    };
    return obj;
  }
}
