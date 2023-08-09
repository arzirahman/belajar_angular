import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private title: Title) {
        title.setTitle('Home');
    }
}