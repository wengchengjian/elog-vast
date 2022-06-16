import useSWR from 'swr';
export default function useRequest(url: string, options: any = {}) {

  const { data, error } = useSWR(url, options);

  let loading = false;
  if (!data) {
    loading = true;
  }
  return {
    data,
    error,
    loading
  }

}