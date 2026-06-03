export interface ApiMainData {
  readonly rid: number;
  readonly torrents: Record<string, Omit<ApiTorrentInfo, 'hash'>>;
}

export interface ApiMainDataChanges extends Partial<ApiMainData> {
  readonly full_update: boolean;
  readonly torrents_removed: ReadonlyArray<string>;
}

export interface ApiTorrentInfo {
  /** Time (Unix Epoch) when the torrent was added to the client */
  readonly added_on: number;
  /** Amount of data left to download (bytes) */
  readonly amount_left: number;
  /** Whether this torrent is managed by Automatic Torrent Management */
  readonly auto_tmm: boolean;
  /** Percentage of file pieces currently available */
  readonly availability: number;
  /** Category of the torrent */
  readonly category: string;
  /** Amount of transfer data completed (bytes) */
  readonly completed: number;
  /** Time (Unix Epoch) when the torrent completed */
  readonly completion_on: number;
  /** Absolute path of torrent content (root path for multifile torrents, absolute file path for singlefile torrents) */
  readonly content_path: string;
  /** Torrent download speed limit (bytes/s). -1 if unlimited. */
  readonly dl_limit: number;
  /** Torrent download speed (bytes/s) */
  readonly dlspeed: number;
  /** Amount of data downloaded */
  readonly downloaded: number;
  /** Amount of data downloaded this session */
  readonly downloaded_session: number;
  /** Torrent ETA (seconds) */
  readonly eta: number;
  /** True if first last piece are prioritized */
  readonly f_l_piece_prio: boolean;
  /** True if force start is enabled for this torrent */
  readonly force_start: boolean;
  /** Torrent hash */
  readonly hash: string;
  /** True if torrent is from a private tracker (added in 5.0.0) */
  readonly isPrivate: boolean;
  /** Last time (Unix Epoch) when a chunk was downloaded/uploaded */
  readonly last_activity: number;
  /** Magnet URI corresponding to this torrent */
  readonly magnet_uri: string;
  /** Maximum share ratio until torrent is stopped from seeding/uploading */
  readonly max_ratio: number;
  /** Maximum seeding time (seconds) until torrent is stopped from seeding */
  readonly max_seeding_time: number;
  /** Torrent name */
  readonly name: string;
  /** Number of seeds in the swarm */
  readonly num_complete: number;
  /** Number of leechers in the swarm */
  readonly num_incomplete: number;
  /** Number of leechers connected to */
  readonly num_leechs: number;
  /** Number of seeds connected to */
  readonly num_seeds: number;
  /** Torrent priority. Returns -1 if queuing is disabled or torrent is in seed mode */
  readonly priority: number;
  /** Torrent progress (percentage/100) */
  readonly progress: number;
  /** Torrent share ratio. Max ratio value: 9999. */
  readonly ratio: number;
  /** TODO (what is different from max_ratio?) */
  readonly ratio_limit: number;
  /** Path where this torrent's data is stored */
  readonly save_path: string;
  /** Torrent elapsed time while complete (seconds) */
  readonly seeding_time: number;
  /** TODO (what is different from max_seeding_time?) seeding_time_limit is a per torrent setting, when Automatic Torrent Management is disabled, furthermore then max_seeding_time is set to seeding_time_limit for this torrent. If Automatic Torrent Management is enabled, the value is -2. And if max_seeding_time is unset it have a default value -1. */
  readonly seeding_time_limit: number;
  /** Time (Unix Epoch) when this torrent was last seen complete */
  readonly seen_complete: number;
  /** True if sequential download is enabled */
  readonly seq_dl: boolean;
  /** Total size (bytes) of files selected for download */
  readonly size: number;
  /** Torrent state. See table here below for the possible values */
  readonly state: ApiTorrentState;
  /** True if super seeding is enabled */
  readonly super_seeding: boolean;
  /** Comma-concatenated tag list of the torrent */
  readonly tags: string;
  /** Total active time (seconds) */
  readonly time_active: number;
  /** Total size (bytes) of all file in this torrent (including unselected ones) */
  readonly total_size: number;
  /** The first tracker with working status. Returns empty string if no tracker is working. */
  readonly tracker: string;
  /** Torrent upload speed limit (bytes/s). -1 if unlimited. */
  readonly up_limit: number;
  /** Amount of data uploaded */
  readonly uploaded: number;
  /** Amount of data uploaded this session */
  readonly uploaded_session: number;
  /** Torrent upload speed (bytes/s) */
  readonly upspeed: number;
}

export const enum ApiTorrentState {
  /**  Some error occurred, applies to paused torrents */
  error = 'error',
  /**  Torrent data files is missing */
  missingFiles = 'missingFiles',
  /**  Torrent is being seeded and data is being transferred */
  uploading = 'uploading',
  /**  Torrent is paused and has finished downloading */
  pausedUP = 'pausedUP',
  /**  Queuing is enabled and torrent is queued for upload */
  queuedUP = 'queuedUP',
  /**  Torrent is being seeded, but no connection were made */
  stalledUP = 'stalledUP',
  /**  Torrent has finished downloading and is being checked */
  checkingUP = 'checkingUP',
  /**  Torrent is forced to uploading and ignore queue limit */
  forcedUP = 'forcedUP',
  /**  Torrent is allocating disk space for download */
  allocating = 'allocating',
  /**  Torrent is being downloaded and data is being transferred */
  downloading = 'downloading',
  /**  Torrent has just started downloading and is fetching metadata */
  metaDL = 'metaDL',
  /**  Torrent is paused and has NOT finished downloading */
  pausedDL = 'pausedDL',
  /**  Queuing is enabled and torrent is queued for download */
  queuedDL = 'queuedDL',
  /**  Torrent is being downloaded, but no connection were made */
  stalledDL = 'stalledDL',
  /**  Same as checkingUP, but torrent has NOT finished downloading */
  checkingDL = 'checkingDL',
  /**  Torrent is forced to downloading to ignore queue limit */
  forcedDL = 'forcedDL',
  /**  Checking resume data on qBt startup */
  checkingResumeData = 'checkingResumeData',
  /**  Torrent is moving to another location */
  moving = 'moving',
  /**  Unknown status */
  unknown = 'unknown',
}

export interface AddTorrentParams {
  /** URLs separated with newlines */
  readonly urls: string;
  /** Raw data of torrent file. torrents can be presented multiple times. */
  // readonly torrents: raw;
  /** Download folder */
  readonly savepath?: string;
  /** Cookie sent to download the .torrent file */
  readonly cookie?: string;
  /** Category for the torrent */
  readonly category?: string;
  /** Tags for the torrent, split by ',' */
  readonly tags?: string;
  /** Skip hash checking. Possible values are true, false (default) */
  readonly skip_checking?: string;
  /** Add torrents in the paused state. Possible values are true, false (default) */
  readonly paused?: boolean;
  /** Create the root folder. Possible values are true, false, unset (default) */
  readonly root_folder?: string;
  /** Rename torrent */
  readonly rename?: string;
  /** Set torrent upload speed limit. Unit in bytes/second */
  readonly upLimit?: number;
  /** Set torrent download speed limit. Unit in bytes/second */
  readonly dlLimit?: number;
  /** Set torrent share ratio limit */
  readonly ratioLimit?: number;
  /** Set torrent seeding time limit. Unit in minutes */
  readonly seedingTimeLimit?: number;
  /** Whether Automatic Torrent Management should be used */
  readonly autoTMM?: boolean;
  /** Enable sequential download. Possible values are true, false (default) */
  readonly sequentialDownload?: boolean;
  /** Prioritize download first last piece. Possible values are true, false (default) */
  readonly firstLastPiecePrio?: boolean;
}

export interface ApiCategory {
  readonly name: string;
  readonly savePath: string;
}

export type ApiCategoriesResponse = Readonly<Record<string, ApiCategory>>;
