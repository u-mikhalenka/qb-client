import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'qb-torrents-top-toolbar',
  templateUrl: './torrents-top-toolbar.html',
  styleUrl: './torrents-top-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [TuiButton, TuiIcon],
  host: {
    class: 'qb-torrents-top-toolbar',
  },
})
export class TorrentsTopToolbar {
  public readonly selectMode = model(false);
  public readonly selectedCount = input(0);
}
