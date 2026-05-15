import type {ParsedObject} from './types';
import {Element} from './Element';

export class Switching extends Element {
  public interval?: number;
  public type?: 'media' | 'bitstream';

  constructor(initialValues?: Partial<Switching>, ctx?: ParsedObject) {
    super({name: 'Switching', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    this.verifyUnsignedInt('interval', true);
    if (typeof this.type === 'string' && this.type !== 'media' && this.type !== 'bitstream') {
      this.reject('@type should be either "media" or "bitstream"');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (typeof this.interval === 'number') {
      obj.interval = this.interval;
    }
    if (this.type) {
      obj.type = this.type;
    }
    return obj;
  }
}
