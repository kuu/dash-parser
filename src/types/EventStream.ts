import type {ParsedObject} from './types';
import {EventStreamType} from './EventStreamType';

export class EventStream extends EventStreamType {
  constructor(initialValues?: Partial<EventStream>) {
    super('EventStream');
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
