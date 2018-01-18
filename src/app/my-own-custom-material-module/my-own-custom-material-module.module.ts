import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatMenuModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatRadioModule
  ],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
