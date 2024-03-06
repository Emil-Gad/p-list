import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wrapper-component',
  templateUrl: './wrapper-component.component.html',
  styleUrl: './wrapper-component.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperComponent {}
