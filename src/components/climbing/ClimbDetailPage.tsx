import {
  Footer,
  Header,
  HeaderBg,
  SideBar,
} from '@/components/HomePage';

import {
  MountainList,
} from './MountainList';
import {
  mountains,
} from './mountains';

export interface ClimbDetailPageProps {
  _?: string;
}

export const ClimbDetailPage: React.FC<ClimbDetailPageProps> = () => {
  return (
    <main>
      <Header />
      <HeaderBg />

      <section className='bg-white'>
        <div className='layout py-12 flex flex-col lg:flex-row gap-8'>
          <div className='oic-layout-content flex flex-col w-[calc(100% - 22rem)]'>
            
            <MountainList
              mountains={mountains}
            />

          </div>
          <div className='lg:w-80'>
            <SideBar />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};