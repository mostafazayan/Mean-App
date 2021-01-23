import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostEditComponent } from '../post-edit/post-edit.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  posts$!: Observable<Post[]>;
  isLoading = false;
  constructor(
    private postsService: PostsService,
    private editDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.postsService.refreshNeeded.subscribe(() => {
      this.getAllPosts();
    });
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.isLoading = true;
    this.posts$ = this.postsService.posts$.pipe(
      map((response: any) => (this.posts = response.posts)),
      tap(() => (this.isLoading = false))
    );
  }
  onDeletePost(post: Post): void {
    this.postsService.deletePost(post._id).subscribe((response) => {
      console.log(response);
    });
  }
  onEditPost(id: number): void {
    let postsData;
    let postData: Post;
    const post = this.postsService.posts$.subscribe((response: any) => {
      postsData = response.posts;
      // tslint:disable-next-line:no-shadowed-variable
      postsData.forEach((post: Post) => {
        if (post._id === id) {
          console.log(post);
          postData = post;
          this.editDialog.open(PostEditComponent, { data: postData });
        }
      });
    });
  }
}
