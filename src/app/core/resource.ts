import { linkedSignal, Resource, resourceFromSnapshots, ResourceSnapshot } from '@angular/core';

export function withPreviousValue<T>(input: Resource<T>): Resource<T> {
  const derived = linkedSignal<ResourceSnapshot<T>, ResourceSnapshot<T>>({
    source: input.snapshot,
    computation: (source, prev) => {
      if (source.status === 'loading' && prev && prev.value.status !== 'error') {
        return { status: 'loading', value: prev.value.value };
      }

      return source;
    },
  });

  return resourceFromSnapshots(derived);
}
