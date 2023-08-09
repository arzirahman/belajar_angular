import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        MatSlideToggleModule
    ]
})
export class HomeModule { }
