import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { TorrentsService } from '../../core/torrents.service';
import { TorrentsList } from './torrents-list/torrents-list';
import { TorrentsActions } from './torrents-actions/torrents-actions';

@Component({
  selector: 'qb-torrents-list-page',
  templateUrl: './torrents-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [TorrentsList, TorrentsActions],
  host: {
    class: 'qb-torrents-list-page',
  },
})
export class TorrentsListPage {
  private readonly torrentsService = inject(TorrentsService);

  protected readonly torrents = this.torrentsService.torrents;
}
