import { HttpClient, httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLinkWithHref } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  ApiAutoDeleteMode,
  ApiBittorrentProtocol,
  ApiDyndnsService,
  ApiEncryption,
  ApiMaxRatioAction,
  ApiPreferences,
  ApiSchedulerDays,
  ApiUploadChokingAlgorithm,
  ApiUploadSlotsBehavior,
  ApiUtpTcpMixedMode,
} from '../../core/preferences';
import { withPreviousValue } from '../../core/resource';

@Component({
  selector: 'qb-preferents-page',
  templateUrl: './preferents-page.html',
  styleUrl: './preferents-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterLinkWithHref,
    FormRoot,
    FormField,
    MatIconButton,
    MatIcon,
    MatToolbar,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatHint,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatButton,
  ],
  host: {
    class: 'qb-preferents-page',
  },
})
export class PreferentsPage {
  private readonly http = inject(HttpClient);
  private readonly preferences = withPreviousValue(
    httpResource<ApiPreferences>(() => {
      return { url: '/api/v2/app/preferences' };
    }),
  );

  protected readonly autoDeleteMode = { None: 0, DeleteTorrentAfterwards: 1 } as const;
  protected readonly bittorrentProtocol = { tcpAndUtp: 0, tcp: 1, utp: 2 } as const;
  protected readonly dyndnsService = { dyndns: 0, noip: 1 } as const;
  protected readonly encryption = { prefer: 0, forceOn: 1, forceOff: 2 } as const;
  protected readonly maxRatioAction = {
    pauseTorrent: 0,
    removeTorrent: 1,
    enableSuperSeeding: 2,
    removeTorrentAndFiles: 3,
  } as const;
  protected readonly schedulerDays = {
    everyDay: 0,
    everyWeekday: 1,
    everyWeekend: 2,
    everyMonday: 3,
    everyTuesday: 4,
    everyWednesday: 5,
    everyThursday: 6,
    everyFriday: 7,
    everySaturday: 8,
    everySunday: 9,
  } as const;
  protected readonly uploadChokingAlgorithm = {
    roundRobin: 0,
    fastestUpload: 1,
    antiLeech: 2,
  } as const;
  protected readonly uploadSlotsBehavior = { fixedSlots: 0, uploadRateBased: 1 } as const;
  protected readonly utpTcpMixedMode = { preferTcp: 0, peerProportional: 1 } as const;

  private readonly formModel = linkedSignal(() => {
    const o = this.preferences.value();
    return {
      locale: o?.locale ?? 'en',
      file_log_enabled: o?.file_log_enabled ?? false,
      file_log_path: o?.file_log_path ?? '',
      file_log_backup_enabled: o?.file_log_backup_enabled ?? true,
      file_log_max_size: o?.file_log_max_size ?? 65,
      file_log_delete_old: o?.file_log_delete_old ?? true,
      file_log_age: o?.file_log_age ?? 6,
      file_log_age_type: o?.file_log_age_type ?? 1,
      performance_warning: o?.performance_warning ?? false,

      torrent_content_layout: o?.torrent_content_layout ?? 'Original',
      add_to_top_of_queue: o?.add_to_top_of_queue ?? false,
      start_paused_enabled: o?.start_paused_enabled ?? false,
      torrent_stop_condition: o?.torrent_stop_condition ?? 'None',
      auto_delete_mode: o?.auto_delete_mode ?? ApiAutoDeleteMode.None,
      preallocate_all: o?.preallocate_all ?? false,
      incomplete_files_ext: o?.incomplete_files_ext ?? false,
      auto_tmm_enabled: o?.auto_tmm_enabled ?? false,
      torrent_changed_tmm_enabled: o?.torrent_changed_tmm_enabled ?? false,
      save_path_changed_tmm_enabled: o?.save_path_changed_tmm_enabled ?? false,
      category_changed_tmm_enabled: o?.category_changed_tmm_enabled ?? false,
      use_subcategories: o?.use_subcategories ?? true,
      use_category_paths_in_manual_mode: o?.use_category_paths_in_manual_mode ?? false,
      save_path: o?.save_path ?? '',
      temp_path_enabled: o?.temp_path_enabled ?? false,
      temp_path: o?.temp_path ?? '',
      export_dir: o?.export_dir ?? '',
      export_dir_fin: o?.export_dir_fin ?? '',
      excluded_file_names_enabled: o?.excluded_file_names_enabled ?? false,
      excluded_file_names: o?.excluded_file_names ?? '',
      mail_notification_enabled: o?.mail_notification_enabled ?? false,
      mail_notification_sender: o?.mail_notification_sender ?? '',
      mail_notification_email: o?.mail_notification_email ?? '',
      mail_notification_smtp: o?.mail_notification_smtp ?? '',
      mail_notification_ssl_enabled: o?.mail_notification_ssl_enabled ?? false,
      mail_notification_auth_enabled: o?.mail_notification_auth_enabled ?? false,
      mail_notification_username: o?.mail_notification_username ?? '',
      mail_notification_password: o?.mail_notification_password ?? '',
      autorun_on_torrent_added_enabled: o?.autorun_on_torrent_added_enabled ?? false,
      autorun_on_torrent_added_program: o?.autorun_on_torrent_added_program ?? '',
      autorun_enabled: o?.autorun_enabled ?? false,
      autorun_program: o?.autorun_program ?? '',

      bittorrent_protocol: o?.bittorrent_protocol ?? ApiBittorrentProtocol.tcpAndUtp,
      listen_port: o?.listen_port ?? 0,
      upnp: o?.upnp ?? false,
      max_connec: o?.max_connec ?? -1,
      max_connec_per_torrent: o?.max_connec_per_torrent ?? -1,
      max_uploads: o?.max_uploads ?? -1,
      max_uploads_per_torrent: o?.max_uploads_per_torrent ?? -1,
      i2p_enabled: o?.i2p_enabled ?? false,
      i2p_address: o?.i2p_address ?? '127.0.0.1',
      i2p_port: o?.i2p_port ?? 7656,
      i2p_mixed_mode: o?.i2p_mixed_mode ?? false,
      proxy_type: o?.proxy_type ?? 'None',
      proxy_ip: o?.proxy_ip ?? '',
      proxy_port: o?.proxy_port ?? 8080,
      proxy_hostname_lookup: o?.proxy_hostname_lookup ?? false,
      proxy_auth_enabled: o?.proxy_auth_enabled ?? false,
      proxy_username: o?.proxy_username ?? '',
      proxy_password: o?.proxy_password ?? '',
      proxy_bittorrent: o?.proxy_bittorrent ?? false,
      proxy_peer_connections: o?.proxy_peer_connections ?? false,
      proxy_rss: o?.proxy_rss ?? false,
      proxy_misc: o?.proxy_misc ?? false,
      ip_filter_enabled: o?.ip_filter_enabled ?? false,
      ip_filter_path: o?.ip_filter_path ?? '',
      ip_filter_trackers: o?.ip_filter_trackers ?? false,
      banned_IPs: o?.banned_IPs ?? '',

      up_limit: o?.up_limit ?? 0,
      dl_limit: o?.dl_limit ?? 0,
      alt_up_limit: o?.alt_up_limit ?? 0,
      alt_dl_limit: o?.alt_dl_limit ?? 0,
      scheduler_enabled: o?.scheduler_enabled ?? false,
      schedule_from_hour: o?.schedule_from_hour ?? 8,
      schedule_from_min: o?.schedule_from_min ?? 0,
      schedule_to_hour: o?.schedule_to_hour ?? 20,
      schedule_to_min: o?.schedule_to_min ?? 0,
      scheduler_days: o?.scheduler_days ?? ApiSchedulerDays.everyDay,
      limit_utp_rate: o?.limit_utp_rate ?? true,
      limit_tcp_overhead: o?.limit_tcp_overhead ?? true,
      limit_lan_peers: o?.limit_lan_peers ?? true,

      dht: o?.dht ?? true,
      pex: o?.pex ?? true,
      lsd: o?.lsd ?? true,
      encryption: o?.encryption ?? ApiEncryption.prefer,
      anonymous_mode: o?.anonymous_mode ?? false,
      max_active_checking_torrents: o?.max_active_checking_torrents ?? 1,
      queueing_enabled: o?.queueing_enabled ?? true,
      max_active_downloads: o?.max_active_downloads ?? 3,
      max_active_uploads: o?.max_active_uploads ?? 3,
      max_active_torrents: o?.max_active_torrents ?? 5,
      dont_count_slow_torrents: o?.dont_count_slow_torrents ?? false,
      slow_torrent_dl_rate_threshold: o?.slow_torrent_dl_rate_threshold ?? 100,
      slow_torrent_ul_rate_threshold: o?.slow_torrent_ul_rate_threshold ?? 100,
      slow_torrent_inactive_timer: o?.slow_torrent_inactive_timer ?? 60,
      max_ratio_enabled: o?.max_ratio_enabled ?? false,
      max_ratio: o?.max_ratio ?? 1,
      max_seeding_time_enabled: o?.max_seeding_time_enabled ?? false,
      max_seeding_time: o?.max_seeding_time ?? 1440,
      max_inactive_seeding_time_enabled: o?.max_inactive_seeding_time_enabled ?? false,
      max_inactive_seeding_time: o?.max_inactive_seeding_time ?? 1440,
      max_ratio_act: o?.max_ratio_act ?? ApiMaxRatioAction.pauseTorrent,
      add_trackers_enabled: o?.add_trackers_enabled ?? false,
      add_trackers: o?.add_trackers ?? '',

      rss_processing_enabled: o?.rss_processing_enabled ?? false,
      rss_refresh_interval: o?.rss_refresh_interval ?? 30,
      rss_max_articles_per_feed: o?.rss_max_articles_per_feed ?? 50,
      rss_auto_downloading_enabled: o?.rss_auto_downloading_enabled ?? false,
      rss_download_repack_proper_episodes: o?.rss_download_repack_proper_episodes ?? true,
      rss_smart_episode_filters: o?.rss_smart_episode_filters ?? '',

      web_ui_address: o?.web_ui_address ?? '*',
      web_ui_port: o?.web_ui_port ?? 8080,
      web_ui_upnp: o?.web_ui_upnp ?? false,
      use_https: o?.use_https ?? false,
      web_ui_https_cert_path: o?.web_ui_https_cert_path ?? '',
      web_ui_https_key_path: o?.web_ui_https_key_path ?? '',
      web_ui_username: o?.web_ui_username ?? '',
      web_ui_password: '',
      bypass_local_auth: o?.bypass_local_auth ?? false,
      bypass_auth_subnet_whitelist_enabled: o?.bypass_auth_subnet_whitelist_enabled ?? false,
      bypass_auth_subnet_whitelist: o?.bypass_auth_subnet_whitelist ?? '',
      web_ui_max_auth_fail_count: o?.web_ui_max_auth_fail_count ?? 5,
      web_ui_ban_duration: o?.web_ui_ban_duration ?? 3600,
      web_ui_session_timeout: o?.web_ui_session_timeout ?? 3600,
      alternative_webui_enabled: o?.alternative_webui_enabled ?? false,
      alternative_webui_path: o?.alternative_webui_path ?? '',
      web_ui_clickjacking_protection_enabled: o?.web_ui_clickjacking_protection_enabled ?? true,
      web_ui_csrf_protection_enabled: o?.web_ui_csrf_protection_enabled ?? true,
      web_ui_secure_cookie_enabled: o?.web_ui_secure_cookie_enabled ?? false,
      web_ui_host_header_validation_enabled: o?.web_ui_host_header_validation_enabled ?? true,
      web_ui_domain_list: o?.web_ui_domain_list ?? '*',
      web_ui_use_custom_http_headers_enabled: o?.web_ui_use_custom_http_headers_enabled ?? false,
      web_ui_custom_http_headers: o?.web_ui_custom_http_headers ?? '',
      web_ui_reverse_proxy_enabled: o?.web_ui_reverse_proxy_enabled ?? false,
      web_ui_reverse_proxies_list: o?.web_ui_reverse_proxies_list ?? '',
      dyndns_enabled: o?.dyndns_enabled ?? false,
      dyndns_service: o?.dyndns_service ?? ApiDyndnsService.dyndns,
      dyndns_domain: o?.dyndns_domain ?? '',
      dyndns_username: o?.dyndns_username ?? '',
      dyndns_password: o?.dyndns_password ?? '',

      resume_data_storage_type: o?.resume_data_storage_type ?? 'Legacy',
      memory_working_set_limit: o?.memory_working_set_limit ?? 0,
      current_network_interface: o?.current_network_interface ?? '',
      current_interface_address: o?.current_interface_address ?? '',
      save_resume_data_interval: o?.save_resume_data_interval ?? 60,
      torrent_file_size_limit: o?.torrent_file_size_limit ?? 104857600,
      recheck_completed_torrents: o?.recheck_completed_torrents ?? false,
      refresh_interval: o?.refresh_interval ?? 1500,
      resolve_peer_countries: o?.resolve_peer_countries ?? true,
      reannounce_when_address_changed: o?.reannounce_when_address_changed ?? false,
      enable_embedded_tracker: o?.enable_embedded_tracker ?? false,
      embedded_tracker_port: o?.embedded_tracker_port ?? 9000,
      embedded_tracker_port_forwarding: o?.embedded_tracker_port_forwarding ?? false,
      bdecode_depth_limit: o?.bdecode_depth_limit ?? 100,
      bdecode_token_limit: o?.bdecode_token_limit ?? 10000000,
      async_io_threads: o?.async_io_threads ?? 10,
      hashing_threads: o?.hashing_threads ?? 1,
      file_pool_size: o?.file_pool_size ?? 100,
      checking_memory_use: o?.checking_memory_use ?? 32,
      disk_cache: o?.disk_cache ?? -1,
      disk_cache_ttl: o?.disk_cache_ttl ?? 60,
      disk_queue_size: o?.disk_queue_size ?? 1048576,
      disk_io_type: o?.disk_io_type ?? 0,
      disk_io_read_mode: o?.disk_io_read_mode ?? 1,
      disk_io_write_mode: o?.disk_io_write_mode ?? 1,
      connection_speed: o?.connection_speed ?? 30,
      enable_os_cache: o?.enable_os_cache ?? true,
      enable_coalesce_read_write: o?.enable_coalesce_read_write ?? false,
      enable_piece_extent_affinity: o?.enable_piece_extent_affinity ?? false,
      enable_upload_suggestions: o?.enable_upload_suggestions ?? false,
      enable_multi_connections_from_same_ip: o?.enable_multi_connections_from_same_ip ?? false,
      validate_https_tracker_certificate: o?.validate_https_tracker_certificate ?? true,
      ssrf_mitigation: o?.ssrf_mitigation ?? true,
      block_peers_on_privileged_ports: o?.block_peers_on_privileged_ports ?? false,
      idn_support_enabled: o?.idn_support_enabled ?? false,
      upload_choking_algorithm:
        o?.upload_choking_algorithm ?? ApiUploadChokingAlgorithm.fastestUpload,
      upload_slots_behavior: o?.upload_slots_behavior ?? ApiUploadSlotsBehavior.fixedSlots,
      utp_tcp_mixed_mode: o?.utp_tcp_mixed_mode ?? ApiUtpTcpMixedMode.preferTcp,
      announce_to_all_tiers: o?.announce_to_all_tiers ?? true,
      announce_to_all_trackers: o?.announce_to_all_trackers ?? false,
      announce_ip: o?.announce_ip ?? '',
      max_concurrent_http_announces: o?.max_concurrent_http_announces ?? 50,
      stop_tracker_timeout: o?.stop_tracker_timeout ?? 5,
      peer_tos: o?.peer_tos ?? 4,
      peer_turnover: o?.peer_turnover ?? 4,
      peer_turnover_cutoff: o?.peer_turnover_cutoff ?? 90,
      peer_turnover_interval: o?.peer_turnover_interval ?? 300,
      request_queue_size: o?.request_queue_size ?? 500,
      socket_backlog_size: o?.socket_backlog_size ?? 30,
      socket_receive_buffer_size: o?.socket_receive_buffer_size ?? 0,
      socket_send_buffer_size: o?.socket_send_buffer_size ?? 0,
      send_buffer_low_watermark: o?.send_buffer_low_watermark ?? 10,
      send_buffer_watermark: o?.send_buffer_watermark ?? 500,
      send_buffer_watermark_factor: o?.send_buffer_watermark_factor ?? 50,
      outgoing_ports_min: o?.outgoing_ports_min ?? 0,
      outgoing_ports_max: o?.outgoing_ports_max ?? 0,
      upnp_lease_duration: o?.upnp_lease_duration ?? 0,
      merge_trackers: o?.merge_trackers ?? false,
    } satisfies ApiPreferences;
  });

  protected readonly form = form(this.formModel, {
    submission: {
      action: async (root) => {
        const value = root().value();
        const preferences: Record<string, unknown> = { ...value };
        if (!preferences['web_ui_password']) {
          delete preferences['web_ui_password'];
        }

        const body = new FormData();
        body.set('json', JSON.stringify(preferences));
        const req$ = this.http.post('/api/v2/app/setPreferences', body);
        await firstValueFrom(req$);
      },
    },
  });
}
