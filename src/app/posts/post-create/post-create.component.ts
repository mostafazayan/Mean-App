import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  imageUrl = './assets/image.jpg';
  enteredTitle = '';
  enteredDescription = '';
  enteredPost = '';
  formAddPost!: FormGroup;
  selectedImage = '';
  fileToUpload!: File;
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.addForm();
  }
  addForm(): void {
    this.formAddPost = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      post: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  readImage(file: FileList): void {
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onAddPost(): void {
    this.postsService
      .addPost(this.formAddPost.value)
      .subscribe((response: any) => {
        console.log(response);
      });
    this.formAddPost.reset();
  }
}
