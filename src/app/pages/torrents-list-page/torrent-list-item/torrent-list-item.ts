import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ApiTorrentInfo, ApiTorrentState } from '../../../core/api-objects';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'qb-torrent-list-item',
  styleUrl: './torrent-list-item.scss',
  templateUrl: './torrent-list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatIcon,
    MatCheckbox,
    MatCard,
    MatCardContent,
    MatProgressBar,
    FormsModule,
    CdkCopyToClipboard,
    MatIcon,
  ],
  host: {
    class: 'qb-torrent-list-item',
    '[class.qb-torrent-list-item__selectable]': 'selectMode()',
    '[attr.data-qb-state]': 'state()',
  },
})
export class TorrentListItem {
  public readonly torrent = input.required<ApiTorrentInfo>();
  public readonly selectMode = input(false);
  public readonly isSelected = model(false);

  protected readonly expanded = signal(false);

  protected readonly state = () => this.torrent().state;
  protected readonly completed = () => formatBytes(this.torrent().completed);
  protected readonly total = () => formatBytes(this.torrent().size);
  protected readonly dlspeed = () => formatBytes(this.torrent().dlspeed);
  protected readonly upspeed = () => formatBytes(this.torrent().upspeed);
  protected readonly canPause = () => canPause(this.torrent().state);
  protected readonly canResume = () => canResume(this.torrent().state);
  protected readonly stateText = () => {
    switch (this.state()) {
      case ApiTorrentState.error:
        return 'Error';
      case ApiTorrentState.missingFiles:
        return 'Missing files';
      case ApiTorrentState.forcedUP:
      case ApiTorrentState.uploading:
        return 'Uploading';
      case ApiTorrentState.pausedDL:
      case ApiTorrentState.pausedUP:
        return 'Paused';
      case ApiTorrentState.queuedDL:
      case ApiTorrentState.queuedUP:
        return 'Queued';
      case ApiTorrentState.stalledDL:
      case ApiTorrentState.stalledUP:
        return 'Stalled';
      case ApiTorrentState.checkingUP:
        return 'Checking';
      case ApiTorrentState.allocating:
        return 'Allocating';
      case ApiTorrentState.downloading:
      case ApiTorrentState.forcedDL:
        return 'Downloading';
      case ApiTorrentState.metaDL:
        return 'Downloading metadata';
      case ApiTorrentState.checkingResumeData:
      case ApiTorrentState.checkingDL:
        return 'Checking';
      case ApiTorrentState.moving:
        return 'Moving';
      case ApiTorrentState.unknown:
        return 'Unknown';
    }
  };

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
