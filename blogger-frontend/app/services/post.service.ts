import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Post } from "../data/post";
import { CreationPostRequest } from "../models/creation-post-request";
import { environment } from "../environment/environment";
import { MatSnackBar } from '@angular/material/snack-bar'; // For user-friendly error messages

@Injectable()
export class PostService {
  private postsUrl = `${environment.apiUrl}v1/posts`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  // Get all posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
    map(posts => posts.map(post => ({
      ...post,
      createdDate: new Date(post.createdDate)
    }))),
    catchError(this.handleError<Post[]>('getPosts', []))
  );
}
  // Get a single post by ID
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`)
      .pipe(catchError(this.handleError<Post>('getPostById')));
  }

  // Create a new post
  createPost(postRequest: CreationPostRequest): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, postRequest)
      .pipe(
        catchError(this.handleError<Post>('createPost'))
      );
  }

  // Delete a post by ID
  deletePost(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.postsUrl}/${id}`)
      .pipe(catchError(this.handleError<boolean>('deletePost', false)));
  }

  // Error handling and logging
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);

      // Show user-friendly error message using a snackbar
      this.snackBar.open(`An error occurred while performing the operation: ${operation}`, 'Close', {
        duration: 3000,
        panelClass: ['snack-bar-error']
      });

      return of(result as T); // Return fallback result (can be empty array, false, etc.)
    };
  }
}
