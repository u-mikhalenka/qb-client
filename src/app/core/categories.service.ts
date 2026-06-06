import { httpResource } from '@angular/common/http';
import { computed, Service } from '@angular/core';
import { withPreviousValue } from './resource';
import { ApiCategoriesResponse, ApiCategory } from './api-objects';

@Service()
export class CategoriesService {
  private readonly resource = withPreviousValue(
    httpResource<ApiCategoriesResponse>(() => ({
      url: '/api/v2/torrents/categories',
    })),
  );

  public readonly categories = computed<ReadonlyArray<ApiCategory>>(() =>
    Object.values(this.resource.value() ?? {}),
  );
}
