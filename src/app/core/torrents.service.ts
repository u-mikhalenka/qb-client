import { HttpClient, httpResource } from '@angular/common/http';
import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { AddTorrentParams, ApiMainDataChanges } from './api-objects';
import { withPreviousValue } from './resource';
import { MainDataState, syncMainData } from './api-objects-utils';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TorrentsService {
  private readonly http = inject(HttpClient);
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

  public async add(params: AddTorrentParams): Promise<void> {
    const body = toFormData(params);
    const req$ = this.http.post('/api/v2/torrents/add', body, { responseType: 'text' });
    await firstValueFrom(req$);
  }

  public async maxPriority(ids: ReadonlySet<string>): Promise<void> {
    return this.postIds('topPrio', ids);
  }

  public async incPriority(ids: ReadonlySet<string>): Promise<void> {
    return this.postIds('increasePrio', ids);
  }

  public async decPriority(ids: ReadonlySet<string>): Promise<void> {
    return this.postIds('decreasePrio', ids);
  }

  public async minPriority(ids: ReadonlySet<string>): Promise<void> {
    return this.postIds('bottomPrio', ids);
  }

  public async resume(ids: ReadonlySet<string>): Promise<void> {
    return this.postIds('resume', ids);
  }

  public async pause(ids: ReadonlySet<string>): Promise<void> {
    return this.postIds('pause', ids);
  }

  public async forceResume(ids: ReadonlySet<string>): Promise<void> {
    return this.postIds('setForceStart', ids);
  }

  public async delete(ids: ReadonlySet<string>, options: { deleteFiles: boolean }): Promise<void> {
    return this.postIds('delete', ids, options);
  }

  private async postIds(
    endpoint: string,
    ids: ReadonlySet<string>,
    options?: object,
  ): Promise<void> {
    const body = toFormData({
      ...options,
      hashes: Array.from(ids).join('|'),
    });
    const req = this.http.post(`/api/v2/torrents/${endpoint}`, body);
    await firstValueFrom(req);
  }
}

function toFormData(json: object): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(json)) {
    fd.append(key, value);
  }
  return fd;
}
