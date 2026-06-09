import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'qb-torrents-top-toolbar',
  templateUrl: './torrents-top-toolbar.html',
  styleUrl: './torrents-top-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLinkWithHref,
    MatDivider,
  ],
  host: {
    class: 'qb-torrents-top-toolbar',
  },
})
export class TorrentsTopToolbar {
  public readonly selectMode = model(false);
  public readonly selectedCount = input(0);
  public readonly add = output();
}
