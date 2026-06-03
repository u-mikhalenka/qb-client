import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ApiTorrentInfo, ApiTorrentState } from '../../../core/api-objects';
import { TuiCard, TuiHeader } from '@taiga-ui/layout';
import { TuiButton, TuiExpand, TuiIcon } from '@taiga-ui/core';
import { TuiButtonGroup, TuiChevron, TuiProgressBar } from '@taiga-ui/kit';

@Component({
  selector: 'qb-torrent-list-item',
  styleUrl: './torrent-list-item.scss',
  templateUrl: './torrent-list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    TuiCard,
    TuiHeader,
    TuiExpand,
    TuiButton,
    TuiChevron,
    TuiProgressBar,
    TuiIcon,
    TuiButtonGroup,
  ],
  host: {
    class: 'qb-torrent-list-item',
    '[attr.data-qb-state]': 'state()',
  },
})
export class TorrentListItem {
  public readonly torrent = input.required<ApiTorrentInfo>();

  protected readonly expanded = signal(true);

  protected readonly state = () => this.torrent().state;
  protected readonly completed = () => formatBytes(this.torrent().completed);
  protected readonly total = () => formatBytes(this.torrent().size);
  protected readonly dlspeed = () => formatBytes(this.torrent().dlspeed);
  protected readonly upspeed = () => formatBytes(this.torrent().upspeed);
  protected readonly canPause = () => canPause(this.torrent().state);
  protected readonly canResume = () => canResume(this.torrent().state);

  protected readonly meta = () => {
    const torrent = this.torrent();
    const seeds = `${torrent.num_seeds}/${torrent.num_complete}`;
    const peers = `${torrent.num_leechs}/${torrent.num_incomplete}`;

    return [
      { caption: 'Category', value: torrent.category },
      { caption: 'Seeds', value: seeds },
      { caption: 'Peers', value: peers },
    ].filter((item) => !!item.value);
  };

  // protected dlspeed = signal(formatBytes(0));
  // protected upspeed = signal(formatBytes(0));
  //
  // protected readonly e = effect((onCleanup) => {
  //   const id = setInterval(() => {
  //     this.dlspeed.set(formatBytes(Math.random() * 100_000_000));
  //     this.upspeed.set(formatBytes(Math.random() * 100_000_000));
  //   }, 1500);
  //   onCleanup(() => clearTimeout(id));
  // });

  protected readonly progress = () => {
    return this.torrent().progress;
  };
}

function canPause(state: ApiTorrentState): boolean {
  switch (state) {
    case ApiTorrentState.downloading:
    case ApiTorrentState.forcedDL:
    case ApiTorrentState.uploading:
    case ApiTorrentState.forcedUP:
    case ApiTorrentState.queuedDL:
    case ApiTorrentState.queuedUP:
    case ApiTorrentState.stalledDL:
    case ApiTorrentState.stalledUP:
    case ApiTorrentState.checkingDL:
    case ApiTorrentState.checkingUP:
    case ApiTorrentState.checkingResumeData:
    case ApiTorrentState.metaDL:
    case ApiTorrentState.allocating:
    case ApiTorrentState.moving:
      return true;
    default:
      return false;
  }
}

function canResume(state: ApiTorrentState): boolean {
  switch (state) {
    case ApiTorrentState.pausedDL:
    case ApiTorrentState.pausedUP:
    case ApiTorrentState.error:
    case ApiTorrentState.missingFiles:
      return true;
    default:
      return false;
  }
}

function formatBytes(bytes: number): string {
  if (!bytes) return '0 B';
  const base = 1000;
  const e = Math.floor(Math.log(bytes) / Math.log(base));
  const v = bytes / Math.pow(base, e);
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  return `${v.toFixed(v >= 10 || e === 0 ? 0 : 1)} ${units[e]}`;
}
