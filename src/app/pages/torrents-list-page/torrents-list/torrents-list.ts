import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
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
}
