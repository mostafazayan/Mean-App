import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostEditComponent } from '../post-edit/post-edit.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  posts$!: Observable<Post[]>;
  isLoading = false;

  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 8];
  currentPage = 1;
  constructor(
    private postsService: PostsService,
    private editDialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.postsService.refreshNeeded.subscribe(() => {
    //   this.getAllPosts();
    // });
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.isLoading = true;
    this.postsService
      .getAllPosts(this.postsPerPage, this.currentPage)
      .subscribe((response: any) => {
        this.posts = response.posts;
        // this.totalPosts = this.posts.length;
        this.isLoading = false;
      });
    this.postsService.refreshNeeded.subscribe((response: any) => {
      this.totalPosts = response.postCount;
    });
  }
  onChangePage(pageData: PageEvent): void {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getAllPosts();
  }

  onDeletePost(post: Post): void {
    this.postsService.deletePost(post._id).subscribe((response) => {
      console.log(response);
      this.getAllPosts();
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
