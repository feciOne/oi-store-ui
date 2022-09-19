import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericResponseSingle, GenericSingle, Item } from 'src/app/modules/core/models/base.model';
import { CommentAttribute, CommentListItem, CommentRequest } from 'src/app/modules/core/models/comment.model';
import { BaseApiService } from 'src/app/modules/core/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private baseApiService: BaseApiService) { }

  getComment(id: number): Observable<CommentListItem> {
    return this.baseApiService.get<GenericResponseSingle<CommentAttribute>>(`comments/${id}`).pipe(
      map((response: GenericResponseSingle<CommentAttribute>) => response.data),
      map((item: Item<CommentAttribute>) => {
        return {
          id: item.id,
          text: item.attributes.text,
          score: item.attributes.score
        }
      })
    )
  }

  createComment(data: CommentRequest): Observable<any> {
    return this.baseApiService.save('comments', { data: { ...data }});
  }
}
