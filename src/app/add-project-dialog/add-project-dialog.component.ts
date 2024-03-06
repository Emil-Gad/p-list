import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../types';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrl: './add-project-dialog.component.scss',
  standalone: true,
  imports: [MatDialogActions, MatCheckboxModule, FormsModule, MatInputModule, MatDialogContent, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectDialogComponent {
  project: Project = Object.assign({}, this.data);

  @Output() projectSaved = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Project = { id: '', name: '', duration: 0, cost: 0, hasApprovalMeeting: false },
    private dialogRef: MatDialogRef<AddProjectDialogComponent>
  ) {}

  onSave() {
    this.projectSaved.emit(this.project);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  get isDisabled(): boolean {
    return this.project.name === undefined || this.project.name === '';
  }
}
