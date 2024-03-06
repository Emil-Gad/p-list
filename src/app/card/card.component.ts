import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() project!: Project;

  @Output() edit = new EventEmitter<string>();

  @Output() remove = new EventEmitter<string>();
}
