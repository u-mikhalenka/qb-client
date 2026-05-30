import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'qb-torrents-list-page',
  templateUrl: './torrents-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    class: 'qb-torrents-list-page',
  },
})
export class TorrentsListPage {}
