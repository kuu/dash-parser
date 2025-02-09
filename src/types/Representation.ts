import type {ParsedObject} from './types';
import {CommonAttributesElements} from './CommonAttributesElements';

export class Representation extends CommonAttributesElements {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'BaseURL',
    'ExtendedBandwidth',
    'SubRepresentation',
    'SegmentBase',
    'SegmentList',
    'SegmentTemplate',
  ];

  public id?: string;
  public bandwidth?: number;
  public qualityRanking?: number;
  public dependencyIds?: string[];
  public associationIds?: string[];
  public associationTypes?: string[];
  public mediaStreamStructureIds?: string[];

  constructor(initialValues?: Partial<Representation>) {
    super('Representation');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);

    if (!initialValues) {
      return;
    }

    const {
      id,
      dependencyId,
      associationId,
      associationType,
      mediaStreamStructureId,
    } = initialValues;

    if (typeof id === 'number') {
      initialValues.id = `${id}`;
    }
    if (typeof dependencyId === 'number') {
      initialValues.dependencyIds = [`${dependencyId}`];
      delete initialValues.dependencyId;
    }
    if (typeof dependencyId === 'string') {
      initialValues.dependencyIds = dependencyId.split(' ');
      delete initialValues.dependencyId;
    }
    if (typeof associationId === 'number') {
      initialValues.associationIds = [`${associationId}`];
      delete initialValues.associationId;
    }
    if (typeof associationId === 'string') {
      initialValues.associationIds = associationId.split(' ');
      delete initialValues.associationId;
    }
    if (typeof associationType === 'string') {
      initialValues.associationTypes = associationType.split(' ');
      delete initialValues.associationType;
    }
    if (typeof mediaStreamStructureId === 'number') {
      initialValues.mediaStreamStructureIds = [`${mediaStreamStructureId}`];
      delete initialValues.mediaStreamStructureId;
    }
    if (typeof mediaStreamStructureId === 'string') {
      initialValues.mediaStreamStructureIds = mediaStreamStructureId.split(' ');
      delete initialValues.mediaStreamStructureId;
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
    if (typeof this.id !== 'string') {
      this.reject('Representation@id is a mandatory attribute');
    }
    if (this.id?.includes(' ')) {
      this.reject('Representation@id shall not contain whitespace characters');
    }
    if (this.bandwidth === undefined) {
      this.reject('Representation@bandwidth is a mandatory attribute');
    }
    this.verifyUnsignedInt('bandwidth');
    if (Array.isArray(this.associationTypes)) {
      if (!this.associationTypes.every(t => t.length === 4)) {
        this.reject('Representation@associationType should be 4 character codes (4CCs)');
      }
      if (!Array.isArray(this.associationIds)) {
        this.reject('Representation@associationType shall not be present when @associationId is not present');
      }
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {
      id: this.id,
      ...super.serializedProps,
    };
    if (typeof this.bandwidth === 'number') {
      obj.bandwidth = this.bandwidth;
    }
    if (typeof this.qualityRanking === 'number') {
      obj.qualityRanking = this.qualityRanking;
    }
    if (Array.isArray(this.dependencyIds)) {
      obj.dependencyId = this.dependencyIds.join(' ');
    }
    if (Array.isArray(this.associationIds)) {
      obj.associationId = this.associationIds.join(' ');
    }
    if (Array.isArray(this.associationTypes)) {
      obj.associationType = this.associationTypes.join(' ');
    }
    if (Array.isArray(this.mediaStreamStructureIds)) {
      obj.mediaStreamStructureId = this.mediaStreamStructureIds.join(' ');
    }
    return obj;
  }
}
