import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostsService } from '../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  formEditPost!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private editDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.editForm();
  }

  editForm(): void {
    this.formEditPost = this.formBuilder.group({
      title: [this.data.title, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      post: [this.data.post, [Validators.required]],
    });
  }

  editPost(): void {
    this.postsService
      .editPost(this.data._id, this.formEditPost.value)
      .subscribe((response: Post) => {
        console.log('edited successfully!!!');
        console.log(response);

        this.editDialog.closeAll();
      });
  }
}
