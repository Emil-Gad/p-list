import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from './local-storage.service';
import { Project } from './types';
import { CardComponent } from './card/card.component';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { WrapperComponent } from './app-wrapper/wrapper-component.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, CardComponent, AddProjectDialogComponent, WrapperComponent, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  dialog = inject(MatDialog);
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  localStorageService = inject(LocalStorageService);

  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = this.localStorageService.getAllItemsFromLocalStorage();
  }

  openModal() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, { width: '500px' });
    dialogRef.componentInstance.projectSaved
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((savedProject: Project) => {
        this.saveProject(savedProject);
      });
  }

  onEdit(id: string): void {
    const project = this.localStorageService.getObjectFromLocalStorage(id);
    const dialogRef = this.dialog.open(AddProjectDialogComponent, { width: '500px', data: project });
    dialogRef.componentInstance.projectSaved
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((savedProject: Project) => {
        this.saveProject(savedProject);
      });
  }

  onRemove(id: string): void {
    this.localStorageService.removeItemFromLocalStorage(id);
    this.projects = [...this.localStorageService.getAllItemsFromLocalStorage()];
    this.cdr.markForCheck();
  }

  private saveProject(savedProject: Project): void {
    this.localStorageService.saveObjectToLocalStorage(savedProject);
    this.projects = [...this.localStorageService.getAllItemsFromLocalStorage()];
    this.cdr.markForCheck();
  }

  get numberOfProjects(): string {
    return `${'Number of projects - '}${this.projects.length}`;
  }

  get totalProfit(): string {
    let profit = 0;
    this.projects.forEach((project: Project) => {
      return (profit += project.cost);
    });
    return `${'Total profit - '}${profit}`;
  }
}
