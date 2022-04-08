import {  NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

const marterialModules  = [
  MatDialogModule,
  MatButtonModule,
  
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
