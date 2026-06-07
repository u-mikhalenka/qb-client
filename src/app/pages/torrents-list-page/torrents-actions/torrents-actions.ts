import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'qb-torrents-actions',
  templateUrl: './torrents-actions.html',
  styleUrl: './torrents-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconButton, MatIcon, MatDivider, FormsModule],
  host: {
    class: 'qb-torrents-actions',
  },
})
export class TorrentsActions {
  public readonly selected = input.required<ReadonlySet<string>>();

  public readonly maxPriority = output();
  public readonly incPriority = output();
  public readonly decPriority = output();
  public readonly minPriority = output();
  public readonly resume = output();
  public readonly pause = output();
  public readonly forceResume = output();
  public readonly delete = output();

  protected readonly hasSelection = () => this.selected().size > 0;
}
