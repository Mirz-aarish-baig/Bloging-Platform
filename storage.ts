
import { User, Post, Comment, Like } from "@shared/schema";

class SyncStorage {
  private getItem<T>(key: string): T[] {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }

  private setItem<T>(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // User methods
  getUser(id: number): User | undefined {
    return this.getItem<User>("users").find(user => user.id === id);
  }

  getUserByUsername(username: string): User | undefined {
    return this.getItem<User>("users").find(user => user.username === username);
  }

  createUser(user: Omit<User, "id">): User {
    const users = this.getItem<User>("users");
    const newUser = { ...user, id: users.length + 1 };
    this.setItem("users", [...users, newUser]);
    return newUser;
  }

  // Post methods
  createPost(post: Omit<Post, "id">): Post {
    const posts = this.getItem<Post>("posts");
    const newPost = { ...post, id: posts.length + 1 };
    this.setItem("posts", [...posts, newPost]);
    return newPost;
  }

  getPosts(): Post[] {
    return this.getItem<Post>("posts");
  }

  getPost(id: number): Post | undefined {
    return this.getItem<Post>("posts").find(post => post.id === id);
  }

  updatePost(id: number, updatedPost: Partial<Post>): Post | undefined {
    const posts = this.getItem<Post>("posts");
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return undefined;
    
    posts[index] = { ...posts[index], ...updatedPost };
    this.setItem("posts", posts);
    return posts[index];
  }

  deletePost(id: number): void {
    const posts = this.getItem<Post>("posts");
    this.setItem("posts", posts.filter(post => post.id !== id));
  }

  // Comment methods
  createComment(comment: Omit<Comment, "id">): Comment {
    const comments = this.getItem<Comment>("comments");
    const newComment = { ...comment, id: comments.length + 1 };
    this.setItem("comments", [...comments, newComment]);
    return newComment;
  }

  getComments(postId: number): Comment[] {
    return this.getItem<Comment>("comments").filter(comment => comment.postId === postId);
  }

  // Like methods
  likePost(userId: number, postId: number): Like {
    const likes = this.getItem<Like>("likes");
    const newLike = { id: likes.length + 1, userId, postId };
    this.setItem("likes", [...likes, newLike]);
    return newLike;
  }

  unlikePost(userId: number, postId: number): void {
    const likes = this.getItem<Like>("likes");
    this.setItem("likes", likes.filter(like => !(like.userId === userId && like.postId === postId)));
  }
}

export const storage = new SyncStorage();
