import type {ParsedObject, Range} from './types';
import {EventStream} from './EventStream';

export class InbandEventStream extends EventStream {
  static override readonly ALLOWED_CHILDREN = [];

  static override readonly CHILDRREN_SPEC: Record<string, Range> = {
    Event: [0, 0],
  };

  constructor(initialValues?: Partial<InbandEventStream>, ctx?: ParsedObject) {
    super({name: 'InbandEventStream', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
    if (this.timescale) {
      this.reject('The @timescale attribute shall be absent');
    }
    if (this.presentationTimeOffset) {
      this.reject('The @presentationTimeOffset attribute shall be absent');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
    this.verifyChidrenSpec(this.static.CHILDRREN_SPEC);
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
