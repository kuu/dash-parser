import {Temporal} from '@js-temporal/polyfill';
import type {ParsedObject} from './types';
import {Element} from './Element';

export class ExtendedBandwidth extends Element {
  static override readonly ALLOWED_CHILDREN = [
    'ModelPair',
  ];

  public vbr?: boolean;

  constructor(initialValues?: Partial<ExtendedBandwidth>) {
    super('ExtendedBandwidth');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
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

  override verifyAttributes(): void {
    // NOP
  }

  override verifyChildren(): void {
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
    super('ModelPair');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      bufferTime,
    } = initialValues;

    if (typeof bufferTime === 'string') {
      initialValues.bufferTime = Temporal.Duration.from(bufferTime).total({unit: 'seconds'});
    }
  }

  override verifyAttributes(): void {
    if (typeof this.bufferTime !== 'number') {
      this.reject('@bufferTime is a mandatory attribute');
    }
    if (typeof this.bandwidth !== 'number') {
      this.reject('@bandwidth is a mandatory attribute');
    }
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {
      bufferTime: Temporal.Duration.from({seconds: this.bufferTime}).toString(),
      bandwidth: this.bandwidth,
    };
    return obj;
  }
}
