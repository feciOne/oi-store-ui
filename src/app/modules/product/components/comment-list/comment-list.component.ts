import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { retry, take } from 'rxjs';
import { GenericSingle, Item } from 'src/app/modules/core/models/base.model';
import { CommentAttribute, CommentListItem } from 'src/app/modules/core/models/comment.model';
import { AuthenticationService } from 'src/app/modules/core/services/auth/authentication.service';
import { CommentService } from '../../services/comment/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit {
  @Input('commentList') comments!: CommentListItem[];

  authenticated: boolean = false;
  commentFormVisibility: boolean = false;
  editingCommentsId: number | null = null;
  productId = this.route.snapshot.paramMap.get('id');

  commentForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    score: new FormControl(0, Validators.required)
  });

  constructor(
    private authService: AuthenticationService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authenticated = this.authService.isAuthenticated();
  }

  writeReview(): void {
    if (!this.authenticated) alert('You must login to add a comment!');

    this.commentFormVisibility = true;
  }

  onSubmit(): void {
    if (!this.commentForm.valid) return;

    if (this.editingCommentsId) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    this.commentService.createComment({ product: this.productId, ...this.commentForm.getRawValue() })
      .pipe(take(1), retry(3))
      .subscribe((data: Item<CommentAttribute>) => {
        this.comments.unshift({ id: data.id, score: data.attributes.score, text: data.attributes.text });
        this.commentFormVisibility = false;
        this.cdRef.detectChanges();
      });
  }

  private update(): void {
    this.commentService.updateComment(this.editingCommentsId, { ...this.commentForm.getRawValue() })
      .pipe(take(1), retry(3))
      .subscribe((data: Item<CommentAttribute>) => {
        this.comments.splice(
          this.comments.findIndex(item => item.id === data.id),
          1,
          { id: data.id, score: data.attributes.score, text: data.attributes.text }
        );
        this.commentFormVisibility = false;
        this.cdRef.detectChanges();
      });
  }

  onEdit(id: number): void {
    this.commentService.getComment(id).pipe(take(1), retry(3)).subscribe(comment => {
      this.editingCommentsId = comment.id;
      this.commentForm.setValue({ text: comment.text, score: comment.score });
      this.commentFormVisibility = true;

      this.cdRef.detectChanges();
    });
  }

  onDelete(id: number): void {
    this.commentService.deleteComment(id).pipe(take(1), retry(3)).subscribe(() => {
      this.comments.splice(this.comments.findIndex(item => item.id === id), 1);

      this.cdRef.detectChanges();
    });
  }

  onCancel(): void {
    this.commentFormVisibility = false;
    this.editingCommentsId = null;
    this.commentForm.setValue({ text: '', score: 0 });
  }

  commentTrackBy(index: number, comment: CommentListItem) {
    return comment.id;
  }
}
