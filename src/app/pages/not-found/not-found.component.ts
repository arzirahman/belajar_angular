import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
    constructor(private title: Title) {
        title.setTitle('404 | Not Found');
    }
}