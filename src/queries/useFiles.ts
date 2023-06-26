import { getStorages } from '@/services/secrecyHeavenApi';
import { useQuery } from '@tanstack/react-query';

export function useFiles() {
  const query = useQuery({
    queryKey: ['files'],
    queryFn: getStorages,
  });

  return { ...query, files: query.data };
}
