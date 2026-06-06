import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { TorrentsService } from '../../core/torrents.service';
import { TorrentsList } from './torrents-list/torrents-list';
import { TorrentsTopToolbar } from './torrents-top-toolbar/torrents-top-toolbar';
import { TorrentsActions } from './torrents-actions/torrents-actions';
import { MatDialog } from '@angular/material/dialog';
import { TorrentAddDialog } from './torrent-add-dialog/torrent-add-dialog';

@Component({
  selector: 'qb-torrents-list-page',
  templateUrl: './torrents-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [TorrentsList, TorrentsTopToolbar, TorrentsActions],
  host: {
    class: 'qb-torrents-list-page',
  },
})
export class TorrentsListPage {
  private readonly torrentsService = inject(TorrentsService);
  private readonly dialog = inject(MatDialog);

  protected readonly selectMode = signal(false);
  protected readonly selected = signal<ReadonlySet<string>>(new Set());

  protected readonly torrents = computed(() => {
    return this.torrentsService
      .torrents()
      .slice()
      .sort((a, b) => b.priority - a.priority);
  });

  protected onMaxPriority(): void {
    this.torrentsService.maxPriority(this.selected());
  }

  protected onIncPriority(): void {
    this.torrentsService.incPriority(this.selected());
  }

  protected onDecPriority(): void {
    this.torrentsService.decPriority(this.selected());
  }

  protected onMinPriority(): void {
    this.torrentsService.minPriority(this.selected());
  }

  protected onResume(): void {
    this.torrentsService.resume(this.selected());
  }

  protected onForceResume(): void {
    this.torrentsService.forceResume(this.selected());
  }

  protected onPause(): void {
    this.torrentsService.pause(this.selected());
  }

  protected onDelete(options: { deleteFiles: boolean }): void {
    this.torrentsService.delete(this.selected(), options);
  }

  protected onAdd(): void {
    this.dialog.open(TorrentAddDialog);
  }
}
