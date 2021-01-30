import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  private refreshNeeded$ = new Subject<Post[]>();

  get refreshNeeded(): Observable<Post[]> {
    return this.refreshNeeded$;
  }

  posts$ = this.http.get<Post[]>(`${environment.baseUrl}posts`);

  getAllPosts(postsPerPage: number, currentPage: number): Observable<Post[]> {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http
      .get<Post[]>(`${environment.baseUrl}posts${queryParams}`)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }

  addPost(post: Post): Observable<Post> {
    const postData = new FormData();

    postData.append('title', post.title);
    postData.append('description', post.description);
    postData.append('post', post.post);
    postData.append('image', post.image);

    return this.http.post<Post>(`${environment.baseUrl}posts`, postData).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${environment.baseUrl}posts/${id}`).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  editPost(id: number, data: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.baseUrl}posts/${id}`, data).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }
}
