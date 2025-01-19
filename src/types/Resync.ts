import type {ParsedObject} from './types';
import {Element} from './Element';

export class Resync extends Element {
  public type?: string;
  public dT?: number;
  public dImax?: number;
  public dImin?: number;
  public marker?: boolean;

  constructor(initialValues?: Partial<Resync>) {
    super('Resync');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(): void {
    // NOP
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return {};
  }
}
