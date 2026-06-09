export const enum ApiScanDirDestination {
  /** Download to the monitored folder. */
  monitoredFolder = 0,
  /** Download to the default save path. */
  defaultSavePath = 1,
}

/** Watched directory path mapped to a download destination or explicit download path. */
export type ApiScanDirs = Readonly<Record<string, ApiScanDirDestination | string>>;

export const enum ApiSchedulerDays {
  /** Every day. */
  everyDay = 0,
  /** Every weekday. */
  everyWeekday = 1,
  /** Every weekend. */
  everyWeekend = 2,
  /** Every Monday. */
  everyMonday = 3,
  /** Every Tuesday. */
  everyTuesday = 4,
  /** Every Wednesday. */
  everyWednesday = 5,
  /** Every Thursday. */
  everyThursday = 6,
  /** Every Friday. */
  everyFriday = 7,
  /** Every Saturday. */
  everySaturday = 8,
  /** Every Sunday. */
  everySunday = 9,
}

export const enum ApiEncryption {
  /** Prefer encryption. */
  prefer = 0,
  /** Force encryption on. */
  forceOn = 1,
  /** Force encryption off. */
  forceOff = 2,
}

export const enum ApiProxyType {
  /** Proxy is disabled. */
  disabled = -1,
  /** HTTP proxy without authentication. */
  httpWithoutAuthentication = 1,
  /** SOCKS5 proxy without authentication. */
  socks5WithoutAuthentication = 2,
  /** HTTP proxy with authentication. */
  httpWithAuthentication = 3,
  /** SOCKS5 proxy with authentication. */
  socks5WithAuthentication = 4,
  /** SOCKS4 proxy without authentication. */
  socks4WithoutAuthentication = 5,
}

export type ApiProxyTypeValue = ApiProxyType | 'None' | 'SOCKS4' | 'SOCKS5' | 'HTTP';

export const enum ApiDyndnsService {
  /** Use DyDNS. */
  dyndns = 0,
  /** Use NOIP. */
  noip = 1,
}

export const enum ApiMaxRatioAction {
  /** Pause torrent. */
  pauseTorrent = 0,
  /** Remove torrent. */
  removeTorrent = 1,
  /** Enable super seeding for torrent. */
  enableSuperSeeding = 2,
  /** Remove torrent and its files. */
  removeTorrentAndFiles = 3,
}

export type ApiResumeDataStorageType = 'Legacy' | 'SQLite';

export const enum ApiBittorrentProtocol {
  /** TCP and uTP. */
  tcpAndUtp = 0,
  /** TCP. */
  tcp = 1,
  /** uTP. */
  utp = 2,
}

export const enum ApiUploadChokingAlgorithm {
  /** Round-robin. */
  roundRobin = 0,
  /** Fastest upload. */
  fastestUpload = 1,
  /** Anti-leech. */
  antiLeech = 2,
}

export const enum ApiUploadSlotsBehavior {
  /** Fixed slots. */
  fixedSlots = 0,
  /** Upload rate based. */
  uploadRateBased = 1,
}

export const enum ApiUtpTcpMixedMode {
  /** Prefer TCP. */
  preferTcp = 0,
  /** Peer proportional. */
  peerProportional = 1,
}

export const enum ApiAutoDeleteMode {
  None = 0,
  DeleteTorrentAfterwards = 1,
}

export interface ApiPreferences {
  readonly torrent_content_layout?: 'Original' | 'Subfolder' | 'NoSubfolder';
  readonly add_to_top_of_queue?: boolean;
  readonly torrent_stop_condition?: 'None' | 'MetadataReceived' | 'FilesChecked';
  /** Currently selected language, e.g. en_GB for English. */
  readonly locale?: string;
  /** True if a subfolder should be created when adding a torrent. */
  readonly create_subfolder_enabled?: boolean;
  /** True if torrents should be added in a paused state. */
  readonly start_paused_enabled?: boolean;
  /** TODO. */
  readonly auto_delete_mode?: ApiAutoDeleteMode;
  /** True if disk space should be pre-allocated for all files. */
  readonly preallocate_all?: boolean;
  /** True if .!qB should be appended to incomplete files. */
  readonly incomplete_files_ext?: boolean;
  /** True if file logging is enabled. */
  readonly file_log_enabled?: boolean;
  /** Path for qBittorrent log files. */
  readonly file_log_path?: string;
  /** True if the log file should be backed up when it reaches the size limit. */
  readonly file_log_backup_enabled?: boolean;
  /** Log file size limit in KiB before backup. */
  readonly file_log_max_size?: number;
  /** True if old backup logs should be deleted. */
  readonly file_log_delete_old?: boolean;
  /** Age of backup logs before deletion. */
  readonly file_log_age?: number;
  /** Unit for file_log_age: 0 days, 1 months, 2 years. */
  readonly file_log_age_type?: number;
  /** True if performance warnings should be logged. */
  readonly performance_warning?: boolean;
  /** True if Automatic Torrent Management is enabled by default. */
  readonly auto_tmm_enabled?: boolean;
  /** True if torrent should be relocated when its category changes. */
  readonly torrent_changed_tmm_enabled?: boolean;
  /** True if torrent should be relocated when the default save path changes. */
  readonly save_path_changed_tmm_enabled?: boolean;
  /** True if torrent should be relocated when its category's save path changes. */
  readonly category_changed_tmm_enabled?: boolean;
  /** True if subcategories should be displayed as category paths. */
  readonly use_subcategories?: boolean;
  /** True if category paths should be used in manual mode. */
  readonly use_category_paths_in_manual_mode?: boolean;
  /** Default save path for torrents, separated by slashes. */
  readonly save_path?: string;
  /** True if folder for incomplete torrents is enabled. */
  readonly temp_path_enabled?: boolean;
  /** Path for incomplete torrents, separated by slashes. */
  readonly temp_path?: string;
  /** Watched directories mapped to where torrents loaded from each directory should be downloaded. */
  readonly scan_dirs?: ApiScanDirs;
  /** True if excluded file name patterns should be applied. */
  readonly excluded_file_names_enabled?: boolean;
  /** Excluded file name patterns, one per line. */
  readonly excluded_file_names?: string;
  /** Path to directory to copy .torrent files to. Slashes are used as path separators. */
  readonly export_dir?: string;
  /** Path to directory to copy .torrent files of completed downloads to. Slashes are used as path separators. */
  readonly export_dir_fin?: string;
  /** True if e-mail notification should be enabled. */
  readonly mail_notification_enabled?: boolean;
  /** E-mail where notifications should originate from. */
  readonly mail_notification_sender?: string;
  /** E-mail to send notifications to. */
  readonly mail_notification_email?: string;
  /** SMTP server for e-mail notifications. */
  readonly mail_notification_smtp?: string;
  /** True if SMTP server requires SSL connection. */
  readonly mail_notification_ssl_enabled?: boolean;
  /** True if SMTP server requires authentication. */
  readonly mail_notification_auth_enabled?: boolean;
  /** Username for SMTP authentication. */
  readonly mail_notification_username?: string;
  /** Password for SMTP authentication. */
  readonly mail_notification_password?: string;
  /** True if external program should be run after torrent has finished downloading. */
  readonly autorun_enabled?: boolean;
  /** Program path/name/arguments to run after download finishes when autorun is enabled. */
  readonly autorun_program?: string;
  /** True if external program should be run when a torrent is added. */
  readonly autorun_on_torrent_added_enabled?: boolean;
  /** Program path/name/arguments to run after torrent is added when enabled. */
  readonly autorun_on_torrent_added_program?: string;
  /** True if torrent queuing is enabled. */
  readonly queueing_enabled?: boolean;
  /** Maximum number of active torrents being checked. */
  readonly max_active_checking_torrents?: number;
  /** Maximum number of active simultaneous downloads. */
  readonly max_active_downloads?: number;
  /** Maximum number of active simultaneous downloads and uploads. */
  readonly max_active_torrents?: number;
  /** Maximum number of active simultaneous uploads. */
  readonly max_active_uploads?: number;
  /** True if stalled torrents are not counted towards max_active_* limits. */
  readonly dont_count_slow_torrents?: boolean;
  /** Download rate in KiB/s for a torrent to be considered slow. */
  readonly slow_torrent_dl_rate_threshold?: number;
  /** Upload rate in KiB/s for a torrent to be considered slow. */
  readonly slow_torrent_ul_rate_threshold?: number;
  /** Seconds a torrent should be inactive before being considered slow. */
  readonly slow_torrent_inactive_timer?: number;
  /** True if share ratio limit is enabled. */
  readonly max_ratio_enabled?: boolean;
  /** Global share ratio limit. */
  readonly max_ratio?: number;
  /** Action performed when a torrent reaches the maximum share ratio. */
  readonly max_ratio_act?: ApiMaxRatioAction;
  /** True enables max inactive seeding time. */
  readonly max_inactive_seeding_time_enabled?: boolean;
  /** Number of minutes of inactive seeding before applying the seeding limit action. */
  readonly max_inactive_seeding_time?: number;
  /** Port for incoming connections. */
  readonly listen_port?: number;
  /** True if UPnP/NAT-PMP is enabled. */
  readonly upnp?: boolean;
  /** True if the port is randomly selected. */
  readonly random_port?: boolean;
  /** Global download speed limit in KiB/s; -1 means no limit is applied. */
  readonly dl_limit?: number;
  /** Global upload speed limit in KiB/s; -1 means no limit is applied. */
  readonly up_limit?: number;
  /** Maximum global number of simultaneous connections. */
  readonly max_connec?: number;
  /** Maximum number of simultaneous connections per torrent. */
  readonly max_connec_per_torrent?: number;
  /** Maximum number of upload slots. */
  readonly max_uploads?: number;
  /** Maximum number of upload slots per torrent. */
  readonly max_uploads_per_torrent?: number;
  /** Timeout in seconds for a stopped announce request to trackers. */
  readonly stop_tracker_timeout?: number;
  /** True if the advanced libtorrent option piece_extent_affinity is enabled. */
  readonly enable_piece_extent_affinity?: boolean;
  /** Bittorrent protocol to use. */
  readonly bittorrent_protocol?: ApiBittorrentProtocol;
  /** True if download/upload limits should be applied to uTP connections. */
  readonly limit_utp_rate?: boolean;
  /** True if download/upload limits should be applied to estimated TCP overhead. */
  readonly limit_tcp_overhead?: boolean;
  /** True if download/upload limits should be applied to peers on the LAN. */
  readonly limit_lan_peers?: boolean;
  /** Alternative global download speed limit in KiB/s. */
  readonly alt_dl_limit?: number;
  /** Alternative global upload speed limit in KiB/s. */
  readonly alt_up_limit?: number;
  /** True if alternative limits should be applied according to schedule. */
  readonly scheduler_enabled?: boolean;
  /** Scheduler starting hour. */
  readonly schedule_from_hour?: number;
  /** Scheduler starting minute. */
  readonly schedule_from_min?: number;
  /** Scheduler ending hour. */
  readonly schedule_to_hour?: number;
  /** Scheduler ending minute. */
  readonly schedule_to_min?: number;
  /** Scheduler days. */
  readonly scheduler_days?: ApiSchedulerDays;
  /** True if DHT is enabled. */
  readonly dht?: boolean;
  /** True if PeX is enabled. */
  readonly pex?: boolean;
  /** True if LSD is enabled. */
  readonly lsd?: boolean;
  /** Encryption mode. */
  readonly encryption?: ApiEncryption;
  /** True if anonymous mode is enabled. */
  readonly anonymous_mode?: boolean;
  /** Proxy type. */
  readonly proxy_type?: ApiProxyTypeValue;
  /** Proxy IP address or domain name. */
  readonly proxy_ip?: string;
  /** Proxy port. */
  readonly proxy_port?: number;
  /** True if peer and web seed connections should be proxified. */
  readonly proxy_peer_connections?: boolean;
  /** True if proxy requires authentication; does not apply to SOCKS4 proxies. */
  readonly proxy_auth_enabled?: boolean;
  /** Username for proxy authentication. */
  readonly proxy_username?: string;
  /** Password for proxy authentication. */
  readonly proxy_password?: string;
  /** True if proxy is only used for torrents. */
  readonly proxy_torrents_only?: boolean;
  /** True if hostname lookups should be performed via proxy. */
  readonly proxy_hostname_lookup?: boolean;
  /** True if proxy should be used for BitTorrent purposes. */
  readonly proxy_bittorrent?: boolean;
  /** True if proxy should be used for RSS purposes. */
  readonly proxy_rss?: boolean;
  /** True if proxy should be used for general purposes. */
  readonly proxy_misc?: boolean;
  /** True if I2P support is enabled. */
  readonly i2p_enabled?: boolean;
  /** I2P SAM bridge host. */
  readonly i2p_address?: string;
  /** I2P SAM bridge port. */
  readonly i2p_port?: number;
  /** True if I2P mixed mode is enabled. */
  readonly i2p_mixed_mode?: boolean;
  /** I2P inbound tunnel length. */
  readonly i2p_inbound_length?: number;
  /** I2P inbound tunnel quantity. */
  readonly i2p_inbound_quantity?: number;
  /** I2P outbound tunnel length. */
  readonly i2p_outbound_length?: number;
  /** I2P outbound tunnel quantity. */
  readonly i2p_outbound_quantity?: number;
  /** True if external IP filter should be enabled. */
  readonly ip_filter_enabled?: boolean;
  /** Path to IP filter file. */
  readonly ip_filter_path?: string;
  /** True if IP filters are applied to trackers. */
  readonly ip_filter_trackers?: boolean;
  /** Semicolon-separated list of domains to accept when performing Host header validation. */
  readonly web_ui_domain_list?: string;
  /** IP address to use for the WebUI. */
  readonly web_ui_address?: string;
  /** WebUI port. */
  readonly web_ui_port?: number;
  /** True if UPnP is used for the WebUI port. */
  readonly web_ui_upnp?: boolean;
  /** WebUI username. */
  readonly web_ui_username?: string;
  /** WebUI password; plaintext and write-only for API v2.3.0 and newer. */
  readonly web_ui_password?: string;
  /** True if WebUI CSRF protection is enabled. */
  readonly web_ui_csrf_protection_enabled?: boolean;
  /** True if WebUI clickjacking protection is enabled. */
  readonly web_ui_clickjacking_protection_enabled?: boolean;
  /** True if WebUI cookie Secure flag is enabled. */
  readonly web_ui_secure_cookie_enabled?: boolean;
  /** Maximum number of authentication failures before WebUI access ban. */
  readonly web_ui_max_auth_fail_count?: number;
  /** WebUI access ban duration in seconds. */
  readonly web_ui_ban_duration?: number;
  /** Seconds until WebUI is automatically signed off. */
  readonly web_ui_session_timeout?: number;
  /** True if WebUI host header validation is enabled. */
  readonly web_ui_host_header_validation_enabled?: boolean;
  /** True if authentication challenge for loopback address should be disabled. */
  readonly bypass_local_auth?: boolean;
  /** True if WebUI authentication should be bypassed for clients in whitelisted subnets. */
  readonly bypass_auth_subnet_whitelist_enabled?: boolean;
  /** Comma-separated IPv4/IPv6 subnet whitelist for bypassing WebUI authentication. */
  readonly bypass_auth_subnet_whitelist?: string;
  /** True if an alternative WebUI should be used. */
  readonly alternative_webui_enabled?: boolean;
  /** File path to the alternative WebUI. */
  readonly alternative_webui_path?: string;
  /** True if WebUI HTTPS access is enabled. */
  readonly use_https?: boolean;
  /** SSL keyfile contents for API versions older than v2.0.1; not a path. */
  readonly ssl_key?: string;
  /** SSL certificate contents for API versions older than v2.0.1; not a path. */
  readonly ssl_cert?: string;
  /** Path to SSL keyfile for API v2.0.1 and newer. */
  readonly web_ui_https_key_path?: string;
  /** Path to SSL certificate for API v2.0.1 and newer. */
  readonly web_ui_https_cert_path?: string;
  /** True if server DNS should be updated dynamically. */
  readonly dyndns_enabled?: boolean;
  /** Dynamic DNS service. */
  readonly dyndns_service?: ApiDyndnsService;
  /** Username for DDNS service. */
  readonly dyndns_username?: string;
  /** Password for DDNS service. */
  readonly dyndns_password?: string;
  /** DDNS domain name. */
  readonly dyndns_domain?: string;
  /** RSS refresh interval. */
  readonly rss_refresh_interval?: number;
  /** Max stored articles per RSS feed. */
  readonly rss_max_articles_per_feed?: number;
  /** Enable processing of RSS feeds. */
  readonly rss_processing_enabled?: boolean;
  /** Enable auto-downloading of torrents from RSS feeds. */
  readonly rss_auto_downloading_enabled?: boolean;
  /** Enable downloading of repack/proper episodes for API v2.5.1 and newer. */
  readonly rss_download_repack_proper_episodes?: boolean;
  /** List of RSS Smart Episode Filters for API v2.5.1 and newer. */
  readonly rss_smart_episode_filters?: string;
  /** Enable automatic adding of trackers to new torrents. */
  readonly add_trackers_enabled?: boolean;
  /** List of trackers to add to new torrent. */
  readonly add_trackers?: string;
  /** Enable custom HTTP headers for API v2.5.1 and newer. */
  readonly web_ui_use_custom_http_headers_enabled?: boolean;
  /** List of custom HTTP headers for API v2.5.1 and newer. */
  readonly web_ui_custom_http_headers?: string;
  /** True if reverse proxy support should be enabled. */
  readonly web_ui_reverse_proxy_enabled?: boolean;
  /** Semicolon-separated list of trusted reverse proxies. */
  readonly web_ui_reverse_proxies_list?: string;
  /** True enables max seeding time. */
  readonly max_seeding_time_enabled?: boolean;
  /** Number of minutes to seed a torrent. */
  readonly max_seeding_time?: number;
  /** TODO. */
  readonly announce_ip?: string;
  /** True reannounces to all trackers when IP or port changes. */
  readonly reannounce_when_address_changed?: boolean;
  /** True always announce to all tiers. */
  readonly announce_to_all_tiers?: boolean;
  /** True always announce to all trackers in a tier. */
  readonly announce_to_all_trackers?: boolean;
  /** Number of asynchronous I/O threads. */
  readonly async_io_threads?: number;
  /** Resume data storage backend. */
  readonly resume_data_storage_type?: ApiResumeDataStorageType;
  /** Physical memory usage limit in MiB. */
  readonly memory_working_set_limit?: number;
  /** UI/server refresh interval in milliseconds. */
  readonly refresh_interval?: number;
  /** Maximum .torrent file size in bytes. */
  readonly torrent_file_size_limit?: number;
  /** Bdecode depth limit. */
  readonly bdecode_depth_limit?: number;
  /** Bdecode token limit. */
  readonly bdecode_token_limit?: number;
  /** Disk queue size. */
  readonly disk_queue_size?: number;
  /** Disk I/O type. */
  readonly disk_io_type?: number;
  /** Disk I/O read mode. */
  readonly disk_io_read_mode?: number;
  /** Disk I/O write mode. */
  readonly disk_io_write_mode?: number;
  /** Number of hashing threads. */
  readonly hashing_threads?: number;
  /** Upload connection speed. */
  readonly connection_speed?: number;
  /** Maximum concurrent HTTP announces. */
  readonly max_concurrent_http_announces?: number;
  /** Peer traffic class/TOS value. */
  readonly peer_tos?: number;
  /** Peer turnover percentage. */
  readonly peer_turnover?: number;
  /** Peer turnover cutoff percentage. */
  readonly peer_turnover_cutoff?: number;
  /** Peer turnover interval in seconds. */
  readonly peer_turnover_interval?: number;
  /** Request queue size. */
  readonly request_queue_size?: number;
  /** Socket receive buffer size. */
  readonly socket_receive_buffer_size?: number;
  /** Socket send buffer size. */
  readonly socket_send_buffer_size?: number;
  /** True enables IDN support. */
  readonly idn_support_enabled?: boolean;
  /** True blocks peers on privileged ports. */
  readonly block_peers_on_privileged_ports?: boolean;
  /** True validates HTTPS tracker certificates. */
  readonly validate_https_tracker_certificate?: boolean;
  /** True enables SSRF mitigation. */
  readonly ssrf_mitigation?: boolean;
  /** True merges trackers from same domain. */
  readonly merge_trackers?: boolean;
  /** True enables embedded tracker port forwarding. */
  readonly embedded_tracker_port_forwarding?: boolean;
  /** List of banned IPs. */
  readonly banned_IPs?: string;
  /** Outstanding memory when checking torrents in MiB. */
  readonly checking_memory_use?: number;
  /** IP address to bind to. Empty string means all addresses. */
  readonly current_interface_address?: string;
  /** Network interface used. */
  readonly current_network_interface?: string;
  /** Disk cache used in MiB. */
  readonly disk_cache?: number;
  /** Disk cache expiry interval in seconds. */
  readonly disk_cache_ttl?: number;
  /** Port used for embedded tracker. */
  readonly embedded_tracker_port?: number;
  /** True enables coalesce reads and writes. */
  readonly enable_coalesce_read_write?: boolean;
  /** True enables embedded tracker. */
  readonly enable_embedded_tracker?: boolean;
  /** True allows multiple connections from the same IP address. */
  readonly enable_multi_connections_from_same_ip?: boolean;
  /** True enables OS cache. */
  readonly enable_os_cache?: boolean;
  /** True enables sending of upload piece suggestions. */
  readonly enable_upload_suggestions?: boolean;
  /** File pool size. */
  readonly file_pool_size?: number;
  /** Maximal outgoing port; 0 means disabled. */
  readonly outgoing_ports_max?: number;
  /** Minimal outgoing port; 0 means disabled. */
  readonly outgoing_ports_min?: number;
  /** True rechecks torrents on completion. */
  readonly recheck_completed_torrents?: boolean;
  /** True resolves peer countries. */
  readonly resolve_peer_countries?: boolean;
  /** Save resume data interval in minutes. */
  readonly save_resume_data_interval?: number;
  /** Send buffer low watermark in KiB. */
  readonly send_buffer_low_watermark?: number;
  /** Send buffer watermark in KiB. */
  readonly send_buffer_watermark?: number;
  /** Send buffer watermark factor in percent. */
  readonly send_buffer_watermark_factor?: number;
  /** Socket backlog size. */
  readonly socket_backlog_size?: number;
  /** Upload choking algorithm used. */
  readonly upload_choking_algorithm?: ApiUploadChokingAlgorithm;
  /** Upload slots behavior used. */
  readonly upload_slots_behavior?: ApiUploadSlotsBehavior;
  /** UPnP lease duration; 0 means permanent lease. */
  readonly upnp_lease_duration?: number;
  /** uTP-TCP mixed mode algorithm. */
  readonly utp_tcp_mixed_mode?: ApiUtpTcpMixedMode;
}
