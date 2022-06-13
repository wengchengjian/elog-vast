import axios, { AxiosResponse } from 'axios';
import { Toast } from "@douyinfe/semi-ui";
import { MUSIC_APP_URL, MUSIC_CACHE, MUSIC_CACHE_STR, ACCOUNT_CACHE_STR } from '../constants';
import { AudioProps } from '../components/business/MusicAplayer';

// axios.defaults.baseURL = "http://localhost:7895/api";

axios.defaults.headers.common['Authorization'] = "adadadadadaddad";


export const fetcher = async (url: string) => {

  const res = await axios.get(url)

  // 如果状态码不在 200-299 的范围内，
  // 我们仍然尝试解析并抛出它。
  if (res.data.code !== 0 || !res.data.success) {
    // 将额外的信息附加到错误对象上。
    const error = new Error(res.data.msg)

    Toast.error(res.data.msg);

    throw error
  }
  return res.data.data;
}

export const music_axios = axios.create({
  baseURL: MUSIC_APP_URL,
  withCredentials: true,
})

export const set_axios_cookie = (cookie: string) => {
  music_axios.interceptors.request.use(function (config) {
    // 在发送请求之前设置cookie
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        cookie,
      }
    } else if (config.method === 'get') {
      config.params = {
        ...config.params,
        cookie: encodeURIComponent(cookie),
      }
    }
    return config;
  }, function (error: any) {
    // 对请求错误拒绝
    return Promise.reject(error);
  });
}

const phone = 18682766240;

const password = "d9e045d78d88a2d059770f8fb190bac8";

export type MusicAccount = {
  "id": number,
  "userName": string,
  "type": number,
  "status": number,
  "whitelistAuthority": number,
  "createTime": number,
  "salt": string,
  "tokenVersion": number,
  "ban": string,
  "baoyueVersion": number,
  "donateVersion": number,
  "vipType": number,
  "viptypeVersion": number,
  "anonimousUser": boolean,
  "uninitialized": boolean
}


export async function login() {
  const data: AxiosResponse<any> = await music_axios.post('/login/cellphone', {
    md5_password: password,
    phone
  })
  MUSIC_CACHE.set(ACCOUNT_CACHE_STR, data.data.account);
  // 设置cookie
  set_axios_cookie(data.data.cookie);
}

export async function refresh() {
  const data: AxiosResponse<any> = await music_axios.get('/login/refresh');
}

export async function playListDetail(id: number) {
  if (!id) {
    return [];
  }
  const data: AxiosResponse<any> = await music_axios.get("/playlist/detail", {
    params: {
      id
    }
  })

  const musicIds: number[] = data.data.playlist.trackIds.map((item: any) => item.id);

  return musicIds
}

export type MusicPlay = {
  id: number;
}

export type PlayListResponse = {
  code: number;
  more: boolean;
  playlist: MusicPlay[];
  version: string;
}

export async function getAllPlayList() {

  const musicAccount = MUSIC_CACHE.get(ACCOUNT_CACHE_STR) as MusicAccount;

  if (!musicAccount) {
    return []
  }

  const data: AxiosResponse<PlayListResponse> = await music_axios.get("/user/playlist", {
    params: {
      uid: musicAccount?.id
    }
  })

  let playListIds: number[] = data.data.playlist.map((item: { id: any; }) => item.id);
  return playListIds
}

export type SongDetailResponse = {
  id: number;
  name: string;
  picUrl: string;
}

export async function getSongDetail(ids: string) {


  if (!ids) {
    return []
  }

  const data: AxiosResponse<any> = await music_axios.get("/song/detail", {
    params: {
      ids
    }
  })

  const result: SongDetailResponse[] = data.data.songs.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      author: item.ar.map((item: any) => item.name).join("/")
    }
  });

  return result;
}

export async function getSongLyric(id: string) {

  if (!id) {
    return ""
  }

  const data: AxiosResponse<any> = await music_axios.get("/lyric", {
    params: {
      id
    }
  })

  const result: string = data.data.lrc.lyric;

  return result;
}

export type SongUrlResponse = {
  id: number;
  url: string;
}

export async function getSongUrl(id: string) {

  if (!id) {
    return []
  }

  const data: AxiosResponse<any> = await music_axios.get("/song/url", {
    params: {
      id
    }
  })

  const result: SongUrlResponse[] = data.data.data.map((item: any) => {
    return {
      id: item.id,
      url: item.url,
    }
  });

  return result;
}

export async function getMusic() {
  // 登录网易云
  await login();
  // 获取歌单id
  const playListIds: number[] = await getAllPlayList();

  console.log("playListIds", playListIds);

  const res: AudioProps[] = [];

  playListIds.forEach(async (id) => {
    let songDetails: SongDetailResponse[] = [];

    let songUrls: SongUrlResponse[] = [];

    let songLyics: { id: number; lrc: string }[] = [];

    const musicIds = await playListDetail(id);
    const task: Promise<any>[] = [];
    const songDetailPromise = getSongDetail(musicIds.join(',')).then(
      (res) => {
        songDetails = res;
      }
    );
    task.push(songDetailPromise);
    const songUrlsPromise = getSongUrl(musicIds.join(',')).then((res) => {
      songUrls = res;
    });
    task.push(songUrlsPromise);

    musicIds.forEach((id) => {
      const songLyricPromise = getSongLyric(musicIds.join(',')).then(
        (res) => {
          songLyics.push({ id, lrc: res });
        }
      );
      task.push(songLyricPromise);
    });
    await Promise.all(task);

    const map = new Map<number, AudioProps>();

    songDetails.forEach((songDetail) => {
      map.set(songDetail.id, { ...songDetail });
    });

    songUrls.forEach((songUrl) => {
      map.set(songUrl.id, { ...songUrl });
    });

    songLyics.forEach((songLyic) => {
      map.set(songLyic.id, { ...songLyic });
    });
    console.log(map);

    res.push.apply(res, Array.from(map.values()));
  });

  MUSIC_CACHE.set(MUSIC_CACHE_STR, res);

  return res;
}