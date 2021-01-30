export interface Post {
  _id: number;
  title: string;
  description: string;
  post: string;
  image: File;
  postsPerPage?: any;
  currentPage?: any;
}
