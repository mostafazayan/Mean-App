"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostCreateComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var PostCreateComponent = /** @class */ (function () {
    // @Output() postCreated = new EventEmitter<Post>();
    function PostCreateComponent(formBuilder, postsService) {
        this.formBuilder = formBuilder;
        this.postsService = postsService;
        this.imageUrl = './assets/image.jpg';
        this.enteredTitle = '';
        this.enteredDescription = '';
        this.enteredPost = '';
        this.selectedImage = '';
        this.fileToUpload = null;
    }
    PostCreateComponent.prototype.ngOnInit = function () {
        this.addForm();
    };
    PostCreateComponent.prototype.addForm = function () {
        this.formAddPost = this.formBuilder.group({
            title: ['', [forms_1.Validators.required]],
            description: ['', [forms_1.Validators.required]],
            post: ['', [forms_1.Validators.required]],
            image: ['', [forms_1.Validators.required]]
        });
    };
    PostCreateComponent.prototype.readImage = function (file) {
        var _this = this;
        this.fileToUpload = file.item(0);
        var reader = new FileReader();
        reader.onload = function (event) {
            _this.imageUrl = event.target.result;
        };
        reader.readAsDataURL(this.fileToUpload);
    };
    PostCreateComponent.prototype.onAddPost = function () {
        this.postsService
            .addPost(this.formAddPost.value)
            .subscribe(function (response) {
            console.log(response);
        });
        this.formAddPost.reset();
    };
    PostCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-post-create',
            templateUrl: './post-create.component.html',
            styleUrls: ['./post-create.component.scss']
        })
    ], PostCreateComponent);
    return PostCreateComponent;
}());
exports.PostCreateComponent = PostCreateComponent;
