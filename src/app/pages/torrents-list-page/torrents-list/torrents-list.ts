import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { ApiTorrentInfo } from '../../../core/api-objects';
import { TorrentListItem } from '../torrent-list-item/torrent-list-item';

@Component({
  selector: 'qb-torrents-list',
  templateUrl: './torrents-list.html',
  styleUrl: './torrents-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [TorrentListItem],
  host: {
    class: 'qb-torrents-list',
  },
})
export class TorrentsList {
  public readonly torrents = input.required<ReadonlyArray<ApiTorrentInfo>>();
  public readonly selectMode = input(false);
  public readonly selected = model<ReadonlySet<string>>(new Set());
  public readonly resume = output<string>();
  public readonly forceResume = output<string>();
  public readonly pause = output<string>();
  public readonly delete = output<string>();

  protected onChangeSelected(hash: string, selected: boolean): void {
    this.selected.update((cur) => {
      const ids = new Set(cur);
      if (selected) {
        ids.add(hash);
      } else {
        ids.delete(hash);
      }

      return ids;
    });
  }
}
