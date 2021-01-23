import { Component } from '@angular/core';
import { Post } from './posts/models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mean-app';
  storedPosts: Post[] = [];
  onPostAdded(post: Post): void {
    this.storedPosts.push(post);
  }
}
