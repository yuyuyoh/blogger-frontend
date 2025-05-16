import { Component, Input } from "@angular/core";
import { Post } from "../../data/post";

@Component({
    selector: "app-post-list-item",
    templateUrl: "./post-list-item.component.html",
    styleUrls: ['./post-list-item.component.css'],
    standalone: false
})

export class PostListItemComponent {
    @Input() post!: Post;

    // Méthode pour convertir la chaîne de date en un objet Date
    convertDate(dateString: string): Date {
        // Si la chaîne est dans le format "dd-MM-yyyy HH:mm:ss", la convertir en objet Date
        const [date, time] = dateString.split(' ');
        const [day, month, year] = date.split('-');
        const [hour, minute, second] = time.split(':');
        
        // Retourner un objet Date avec le bon format
        return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    }
}
