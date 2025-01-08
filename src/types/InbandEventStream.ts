import type {ParsedObject} from './types';
import {EventStreamType} from './EventStreamType';

export class InbandEventStream extends EventStreamType {
  constructor(initialValues?: Partial<InbandEventStream>) {
    super('InbandEventStream');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);
  }

  override verifyAttributes(): void {
    super.verifyAttributes();
  }

  override verifyChildren(): void {
    super.verifyChildren();
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
