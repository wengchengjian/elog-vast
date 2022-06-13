import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

const ReactLive2d = dynamic(() => import('react-live2d'), {
  ssr: false,
  suspense: true,
});

export type Live2DProps = {
  model?: string[];
};
export default function Live2DComponent({ model }: Live2DProps) {
  const [selfModel, setModel] = useState(model ?? []);

  useEffect(() => {
    (async function getModel() {
      const model = await fetch('/api/model');
      setModel(await model.json());
    })();
  }, []);

  useEffect(() => {
    setModel(model ?? []);
  }, [model]);

  return (
    <>
      <Suspense fallback={'loading'}>
        <ReactLive2d
          width={300}
          height={500}
          ModelList={selfModel}
          TouchHead={['别摸我头']}
          menuList={['Mtab']}
          TouchBody={['啊啊啊啊啊你要干嘛', '哎呦', '基尼太美']}
          PathFull="http://localhost:3000/Resources/"
        />
      </Suspense>
    </>
  );
}
