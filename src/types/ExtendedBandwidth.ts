import {toTemporalDurationString, fromTemporalDurationString} from '../utils';
import type {ParsedObject} from './types';
import {Element} from './Element';

export class ExtendedBandwidth extends Element {
  static override readonly ALLOWED_CHILDREN = [
    'ModelPair',
  ];

  public vbr?: boolean;

  constructor(initialValues?: Partial<ExtendedBandwidth>, ctx?: ParsedObject) {
    super({name: 'ExtendedBandwidth', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    if (!initialValues) {
      return;
    }

    const {
      vbr,
    } = initialValues;

    if (typeof vbr === 'string') {
      initialValues.vbr = vbr === 'true';
    }
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (typeof this.vbr === 'boolean') {
      obj.vbr = this.vbr ? 'true' : 'false';
    }
    return obj;
  }
}

export class ModelPair extends Element {
  public bufferTime?: number;
  public bandwidth?: number;

  constructor(initialValues?: Partial<ModelPair>, ctx?: ParsedObject) {
    super({name: 'ModelPair', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    if (!initialValues) {
      return;
    }

    const {
      bufferTime,
    } = initialValues;

    if (typeof bufferTime === 'string') {
      initialValues.bufferTime = fromTemporalDurationString(bufferTime);
    }
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (typeof this.bufferTime !== 'number') {
      this.reject('@bufferTime is a mandatory attribute');
    }
    this.verifyUnsignedInt('bandwidth', true);
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {
      ...super.serializedProps,
      bufferTime: toTemporalDurationString(this.bufferTime!),
      bandwidth: this.bandwidth,
    };
    return obj;
  }
}
