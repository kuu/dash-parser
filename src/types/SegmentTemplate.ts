import type {ParsedObject} from './types';
import {MultipleSegmentBase} from './MultipleSegmentBase';

export class SegmentTemplate extends MultipleSegmentBase {
  public media?: string;
  public index?: string;
  public initialization?: string;
  public bitstreamSwitching?: string;

  constructor(initialValues?: Partial<SegmentTemplate>, ctx?: ParsedObject) {
    super({name: 'SegmentTemplate', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
    if (typeof this.initialization === 'string'
      && (this.initialization.includes('$Number$') || this.initialization.includes('$Time$'))
    ) {
      this.reject('Neither $Number$ nor the $Time$ identifier shall be included.');
    }
    if (typeof this.bitstreamSwitching === 'string'
      && (this.bitstreamSwitching.includes('$Number$') || this.bitstreamSwitching.includes('$Time$'))
    ) {
      this.reject('Neither $Number$ nor the $Time$ identifier shall be included.');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (typeof this.media === 'string') {
      obj.media = this.media;
    }
    if (typeof this.index === 'string') {
      obj.index = this.index;
    }
    if (typeof this.initialization === 'string') {
      obj.initialization = this.initialization;
    }
    if (typeof this.bitstreamSwitching === 'string') {
      obj.bitstreamSwitching = this.bitstreamSwitching;
    }
    return obj;
  }
}
