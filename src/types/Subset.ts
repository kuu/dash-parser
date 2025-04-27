import type {ParsedObject} from './types';
import {Element} from './Element';

export class Subset extends Element {
  public contains?: number[];
  public id?: string;

  constructor(initialValues?: Partial<Subset>, ctx?: ParsedObject) {
    super({name: 'Subset', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    if (!initialValues) {
      return;
    }

    const {
      contains,
      id,
    } = initialValues;

    if (typeof contains === 'string') {
      initialValues.contains = contains.split(' ').map(level => Number.parseInt(level, 10));
    } else if (typeof contains === 'number') {
      initialValues.contains = [contains];
    }
    if (typeof id === 'number') {
      initialValues.id = `${id}`;
    }
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (!Array.isArray(this.contains) || this.contains.length === 0) {
      this.reject('@contains attribute must be present.');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (Array.isArray(this.contains)) {
      obj.contains = this.contains.join(' ');
    }
    if (typeof this.id === 'string') {
      obj.id = this.id;
    }
    return obj;
  }
}
