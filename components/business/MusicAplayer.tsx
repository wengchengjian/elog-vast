import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';

const ReactAplayer = dynamic(import('react-aplayer'), { ssr: false });

export type AudioProps = {
  id?: number;
  name?: string;
  artist?: string;
  url?: string;
  cover?: string;
  lrc?: string;
};

export type AplayerAudioProps = {
  audio?: AudioProps[];
};

export default function MusicAplayer({ audio }: AplayerAudioProps) {
  const [selfAudio, setAudio] = useState(audio ?? []);

  useEffect(() => {
    setAudio(audio ?? []);
  }, [audio]);

  const onInit = (ap: any) => {};

  const onPlay = () => {};

  const onPause = () => {};
  return (
    <>
      <div id="aplayer">
        <ReactAplayer
          lrcType={1}
          fixed={true}
          audio={selfAudio}
          onInit={onInit}
          onPlay={onPlay}
          onPause={onPause}
        />
      </div>
    </>
  );
}
