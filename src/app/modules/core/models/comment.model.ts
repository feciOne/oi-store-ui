import { AttributeBase } from './base.model';

export interface CommentAttribute extends AttributeBase {
  text: string;
  score: number;
}

export interface CommentListItem {
  id: number;
  text: string;
  score: number;
}

export type CommentRequest = { product: number } & Pick<CommentAttribute, 'text' | 'score'>;
