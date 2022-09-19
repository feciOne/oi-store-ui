import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GenericSingle } from 'src/app/modules/core/models/base.model';
import { CommentListItem } from 'src/app/modules/core/models/comment.model';
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

    this.commentService.createComment({ product: this.productId, ...this.commentForm.getRawValue() })
      .subscribe((response: GenericSingle<CommentListItem>) => {
        const data = response.data;

        this.comments.unshift({ id: data.id, score: data.attributes.score, text: data.attributes.text });
        this.commentFormVisibility = false;
        this.cdRef.detectChanges();
      });
  }
}
