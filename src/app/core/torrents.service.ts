import { httpResource } from '@angular/common/http';
import { computed, effect, Injectable, linkedSignal, signal } from '@angular/core';
import { ApiMainDataChanges } from './api-objects';
import { withPreviousValue } from './resource';
import { MainDataState, syncMainData } from './api-objects-utils';

@Injectable({ providedIn: 'root' })
export class TorrentsService {
  private readonly requestedRid = signal(0);
  private readonly mainDataResource = withPreviousValue(
    httpResource<ApiMainDataChanges>(() => {
      return {
        url: '/api/v2/sync/maindata',
        params: { rid: this.requestedRid() },
      };
    }),
  );
  private readonly mainData = linkedSignal<ApiMainDataChanges | undefined, MainDataState>({
    source: this.mainDataResource.value,
    computation: (source, prev) => {
      const prevState = prev?.value ?? { rid: 0, torrents: [] };
      if (!source) return prevState;

      return syncMainData(prevState, source);
    },
  });

  public readonly torrents = computed(() => {
    return this.mainData()?.torrents ?? [];
  });

  public constructor() {
    effect((onCleanup) => {
      const tid = setInterval(() => this.requestedRid.set(this.mainData().rid), 1500);
      onCleanup(() => clearTimeout(tid));
    });
  }
}
