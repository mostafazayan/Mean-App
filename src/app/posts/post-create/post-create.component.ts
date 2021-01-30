import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  NG_ASYNC_VALIDATORS,
  Validators,
} from '@angular/forms';
import { Post } from '../models/post.model';
import { PostListComponent } from '../post-list/post-list.component';
import { PostsService } from '../services/posts.service';
import { mimeType } from './7.1 mime-type.validator';

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
  fileToUpload!: File | null;
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.addForm();
  }
  addForm(): void {
    this.formAddPost = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      post: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
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
