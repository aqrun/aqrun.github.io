export const HeaderBg = () => {
  return (
    <div className='absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none'>
      <div className='w-[108rem] flex-none flex justify-end'>
        <picture>
          <img
            src='/images/headimg1.png'
            alt=''
            className='w-[71.75rem] flex-none max-w-none dark:hidden'
            decoding='async'
          />
        </picture>
        <picture>
          <img
            src='/images/headimg1.png'
            alt=''
            className='w-[90rem] flex-none max-w-none hidden dark:block'
            decoding='async'
          />
        </picture>
      </div>
    </div>
  );
};
