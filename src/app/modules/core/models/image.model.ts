import { AttributeBase } from './base.model';

export interface ImageAttribute extends AttributeBase {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
}

export type ImageItem = Pick<ImageAttribute, 'name' | 'alternativeText' | 'caption' | 'url'>
