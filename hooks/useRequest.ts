import useSWR from 'swr';

export type RequestType = {
  [key:string]:string | number
}

export function getParamsUrl(params?:RequestType){
  let str = [];

  for(let key in params){
    str.push(`${key}=${params[key]}`);
  }
  if(str.length === 0){
    return '';
  }
  return "?" + str.join("&");
}

export default function useRequest(url: string,params:RequestType = {}, options: any = {},) {
  
  const encodeUrl = url + getParamsUrl(params);

  const { data, error } = useSWR(encodeUrl, options);

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