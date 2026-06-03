import { ApiTorrentInfo, ApiMainDataChanges } from './api-objects';

export interface MainDataState {
  readonly rid: number;
  readonly torrents: ReadonlyArray<ApiTorrentInfo>;
}

export function syncMainData(mainData: MainDataState, changes: ApiMainDataChanges): MainDataState {
  const res = { ...mainData, rid: changes.rid ?? mainData.rid };
  if (changes.torrents || changes.torrents_removed) {
    const idsToRemove = new Set(changes.torrents_removed);
    const newTorrents = mainData.torrents.filter((item) => !idsToRemove.has(item.hash));
    const torrentsById = newTorrents.reduce(
      (acc, cur) => {
        acc[cur.hash] = cur;
        return acc;
      },
      {} as Record<string, ApiTorrentInfo>,
    );
    for (const [hash, item] of Object.entries(changes.torrents ?? {})) {
      if (torrentsById[hash]) {
        torrentsById[hash] = { ...torrentsById[hash], ...item };
      } else {
        torrentsById[hash] = { hash, ...item };
      }
    }
    res.torrents = Object.values(torrentsById);
  }
  return res;
}
