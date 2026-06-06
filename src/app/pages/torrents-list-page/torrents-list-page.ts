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
    this.doAction((ids) => this.torrentsService.maxPriority(ids));
  }

  protected onIncPriority(): void {
    this.doAction((ids) => this.torrentsService.incPriority(ids));
  }

  protected onDecPriority(): void {
    this.doAction((ids) => this.torrentsService.decPriority(ids));
  }

  protected onMinPriority(): void {
    this.doAction((ids) => this.torrentsService.minPriority(ids));
  }

  protected onResume(): void {
    this.doAction((ids) => this.torrentsService.resume(ids));
  }

  protected onForceResume(): void {
    this.doAction((ids) => this.torrentsService.forceResume(ids));
  }

  protected onPause(): void {
    this.doAction((ids) => this.torrentsService.pause(ids));
  }

  protected onDelete(options: { deleteFiles: boolean }): void {
    this.doAction((ids) => this.torrentsService.delete(ids, options));
  }

  protected onAdd(): void {
    this.dialog.open(TorrentAddDialog);
  }

  private doAction(fn: (ids: ReadonlySet<string>) => void): void {
    const ids = this.selected();
    this.selected.set(new Set());
    this.selectMode.set(false);
    fn(ids);
  }
}
