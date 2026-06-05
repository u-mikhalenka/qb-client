import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'qb-torrents-actions',
  templateUrl: './torrents-actions.html',
  styleUrl: './torrents-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    MatDivider,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatCheckbox,
    FormsModule,
  ],
  host: {
    class: 'qb-torrents-actions',
  },
})
export class TorrentsActions {
  private readonly dialog = inject(MatDialog);

  public readonly selected = input.required<ReadonlySet<string>>();

  public readonly maxPriority = output();
  public readonly incPriority = output();
  public readonly decPriority = output();
  public readonly minPriority = output();
  public readonly resume = output();
  public readonly pause = output();
  public readonly forceResume = output();
  public readonly delete = output<{ deleteFiles: boolean }>();

  protected readonly deleteDialogOpen = signal(false);
  protected readonly deleteFiles = signal(false);

  protected readonly hasSelection = () => this.selected().size > 0;

  protected readonly deleteDialogTpl = viewChild.required<TemplateRef<void>>('deleteDialog');

  public constructor() {
    effect((onCleanup) => {
      if (!this.deleteDialogOpen()) return;

      const ref = this.dialog.open(this.deleteDialogTpl());
      onCleanup(() => ref.close());
    });
  }

  protected onDeleteFilesSubmit(): void {
    const deleteFiles = this.deleteFiles();
    this.deleteDialogOpen.set(false);
    this.deleteFiles.set(false);
    this.delete.emit({ deleteFiles });
  }
}
