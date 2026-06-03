import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'qb-torrents-actions',
  templateUrl: './torrents-actions.html',
  styleUrl: './torrents-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [TuiButton, TuiIcon],
  host: {
    class: 'qb-torrents-actions',
  },
})
export class TorrentsActions {}
