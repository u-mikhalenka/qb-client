import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'qb-torrents-top-toolbar',
  templateUrl: './torrents-top-toolbar.html',
  styleUrl: './torrents-top-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [MatButton, MatIconButton, MatIcon],
  host: {
    class: 'qb-torrents-top-toolbar',
  },
})
export class TorrentsTopToolbar {
  public readonly selectMode = model(false);
  public readonly selectedCount = input(0);
}
