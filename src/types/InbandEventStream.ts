import type {ParsedObject} from './types';
import {EventStream} from './EventStream';

export class InbandEventStream extends EventStream {
  constructor(initialValues?: Partial<InbandEventStream>, ctx?: ParsedObject) {
    super({name: 'InbandEventStream', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
