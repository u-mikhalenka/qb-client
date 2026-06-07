import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogRef,
  MatDialog,
  MatDialogClose,
} from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'qb-torrent-delete-dialog',
  templateUrl: './torrent-delete-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatCheckbox,
    FormRoot,
    FormField,
  ],
  host: {
    class: 'qb-torrent-delete-dialog',
  },
})
export class TorrentDeleteDialog {
  private readonly dlgRef = inject(MatDialogRef);

  protected readonly formModel = signal({ deleteFiles: false });
  protected readonly form = form(this.formModel, {
    submission: {
      action: async (form) => {
        this.dlgRef.close(form().value());
      },
    },
  });

  public static open(dialog: MatDialog): Promise<{ deleteFiles: boolean } | undefined> {
    const res$ = dialog.open(TorrentDeleteDialog).afterClosed();
    return firstValueFrom(res$);
  }
}
