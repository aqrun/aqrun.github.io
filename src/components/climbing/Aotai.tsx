import Image from 'next/image';

export const Aotai = () => {

  return (
    <div className="mt-4">
      <p className=" mb-2 text-gray-500">
        鳌太路线手绘示意图, 仅供参考。
      </p>
      <div>
        <Image
          src='https://cdn.oicnp.com/images/2024/aotai.jpg'
          alt=''
          className='inline-block h-full w-full object-cover'
          width={1280}
          height={960}
        />
      </div>
    </div>
  );
};

