import { Component, OnInit } from "@angular/core"; 
import { Post } from "../data/post";
import { PostService } from "../services/post.service";

@Component ({
    selector : "app-post-list", 
    templateUrl : "./post-list.component.html",
    styleUrls : ["./post-list.component.css"],
    standalone : false 
})

export class PostListComponent implements OnInit{
    posts : Post[] = [];

    constructor(private postService : PostService) { }

    ngOnInit() : void {
        this.loadPosts();
    }

    loadPosts(): void {
        this.postService.getPosts().subscribe(posts => {
            //console.log('Posts reçus depuis le service :', posts);
            this.posts = posts;
        });

    
    }
}