import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CategoriesService } from '../../../core/categories.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { TorrentsService } from '../../../core/torrents.service';

@Component({
  selector: 'qb-torrent-add-dialog',
  templateUrl: './torrent-add-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatCheckbox,
    FormRoot,
    FormField,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
  ],
  host: {
    class: 'qb-torrent-add-dialog',
  },
})
export class TorrentAddDialog {
  private readonly torrents = inject(TorrentsService);
  private readonly dlgRef = inject(MatDialogRef);
  private readonly categoriesService = inject(CategoriesService);

  protected readonly categories = this.categoriesService.categories;
  private readonly formModel = signal({
    urls: '',
    category: '',
    start: true,
    sequentialDownload: false,
    firstLastPeicePrio: false,
  });
  protected readonly form = form(
    this.formModel,
    (schema) => {
      required(schema.urls);
    },
    {
      submission: {
        action: async (field) => {
          const form = field().value();
          await this.torrents.add({
            urls: form.urls,
            category: form.category,
            paused: !form.start,
            sequentialDownload: form.sequentialDownload,
            firstLastPiecePrio: form.firstLastPeicePrio,
          });
          this.dlgRef.close();
        },
      },
    },
  );
}
