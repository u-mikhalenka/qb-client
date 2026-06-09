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
import { TorrentDeleteDialog } from './torrent-delete-dialog/torrent-delete-dialog';

@Component({
  selector: 'qb-torrents-list-page',
  templateUrl: './torrents-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [TorrentsList, TorrentsTopToolbar, TorrentsActions],
  providers: [TorrentsService],
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

  protected onMaxPriority(hash?: string): void {
    this.doAction(hash, (ids) => this.torrentsService.maxPriority(ids));
  }

  protected onIncPriority(hash?: string): void {
    this.doAction(hash, (ids) => this.torrentsService.incPriority(ids));
  }

  protected onDecPriority(hash?: string): void {
    this.doAction(hash, (ids) => this.torrentsService.decPriority(ids));
  }

  protected onMinPriority(hash?: string): void {
    this.doAction(hash, (ids) => this.torrentsService.minPriority(ids));
  }

  protected onResume(hash?: string): void {
    this.doAction(hash, (ids) => this.torrentsService.resume(ids));
  }

  protected onForceResume(hash?: string): void {
    this.doAction(hash, (ids) => this.torrentsService.forceResume(ids));
  }

  protected onPause(hash?: string): void {
    this.doAction(hash, (ids) => this.torrentsService.pause(ids));
  }

  protected onDelete(hash?: string): void {
    TorrentDeleteDialog.open(this.dialog).then((res) => {
      if (res) {
        this.doAction(hash, (ids) => this.torrentsService.delete(ids, res));
      }
    });
  }

  protected onAdd(): void {
    this.dialog.open(TorrentAddDialog);
  }

  private doAction(hash: string | undefined, fn: (ids: ReadonlySet<string>) => void): void {
    let ids: ReadonlySet<string>;
    if (hash) {
      ids = new Set([hash]);
    } else {
      ids = this.selected();
      this.selected.set(new Set());
      this.selectMode.set(false);
    }
    fn(ids);
  }
}
