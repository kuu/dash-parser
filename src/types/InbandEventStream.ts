import type {ParsedObject} from './types';
import {EventStream} from './EventStream';

export class InbandEventStream extends EventStream {
  constructor(initialValues?: Partial<InbandEventStream>) {
    super({name: 'InbandEventStream', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);
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
