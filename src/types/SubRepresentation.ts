import type {ParsedObject} from './types';
import {CommonAttributesElements} from './CommonAttributesElements';

export class SubRepresentation extends CommonAttributesElements {
  public level?: number;
  public dependencyLevels?: number[];
  public bandwidth?: number;
  public contentComponents?: string[];

  constructor(initialValues?: Partial<SubRepresentation>) {
    super('SubRepresentation');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);

    if (!initialValues) {
      return;
    }

    const {
      dependencyLevel,
      contentComponent,
    } = initialValues;

    if (typeof dependencyLevel === 'number') {
      initialValues.dependencyLevels = [dependencyLevel];
      delete initialValues.dependencyLevel;
    }
    if (typeof dependencyLevel === 'string') {
      initialValues.dependencyLevels = dependencyLevel.split(' ').map(level => Number.parseInt(level, 10));
      delete initialValues.dependencyLevel;
    }
    if (typeof contentComponent === 'number') {
      initialValues.contentComponents = [`${contentComponent}`];
      delete initialValues.contentComponent;
    }
    if (typeof contentComponent === 'string') {
      initialValues.contentComponents = contentComponent.split(' ');
      delete initialValues.contentComponent;
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
    if (typeof this.level === 'number' && this.bandwidth === undefined) {
      this.reject('@bandwidth shall be present if the @level attribute is present.');
    }
    if (typeof this.bandwidth === 'number' && this.bandwidth < 0) {
      this.reject('@bandwidth shall be an unsigned integer.');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = super.serializedProps;
    if (typeof this.level === 'number') {
      obj.level = this.level;
    }
    if (Array.isArray(this.dependencyLevels) && this.dependencyLevels.length > 0) {
      obj.dependencyLevel = this.dependencyLevels.join(' ');
    }
    if (typeof this.bandwidth === 'number') {
      obj.bandwidth = this.bandwidth;
    }
    if (Array.isArray(this.contentComponents) && this.contentComponents.length > 0) {
      obj.contentComponent = this.contentComponents.join(' ');
    }
    return obj;
  }
}
