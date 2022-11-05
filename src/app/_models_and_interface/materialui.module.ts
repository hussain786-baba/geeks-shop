import {  NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const marterialModules  = [
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    marterialModules,
    
  ],
  exports: [
    marterialModules
  ]
})
export class MaterialuiModule { }
