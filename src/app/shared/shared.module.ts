import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';





@NgModule({
    declarations: [
    ],
    imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatInputModule,
      FormsModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        FormsModule
    ]
  })
  export class SharedModule { }