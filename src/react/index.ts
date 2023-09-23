import {useMemo, useState, useCallback} from 'react';
import TomoTypeahead, {TomoTypeaheadConfig} from '../index';

export function useTypeahead<T>(config: TomoTypeaheadConfig<T>): {
  loading: boolean;
  data: T[];
  setQuery: (q: string) => void;
} {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const typeahead = useMemo(
    () =>
      new TomoTypeahead({
        ...config,
        onDataChange: (data) => {
          setData(data);
          if (config?.onDataChange != null) {
            config?.onDataChange(data);
          }
        },
        onLoadingChange: (loading) => {
          setLoading(loading);
          if (config?.onLoadingChange != null) {
            config?.onLoadingChange(loading);
          }
        },
      }),
    [], // ignoring config here because we don't want to recreate the typeahead
  );

  const setQuery = useCallback(
    (q: string) => typeahead.setQuery(q),
    [typeahead],
  );

  return {
    loading,
    data,
    setQuery,
  };
}
