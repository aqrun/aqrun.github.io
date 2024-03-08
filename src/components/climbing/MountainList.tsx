'use client';

import { useState, useMemo } from 'react';

import {
  usePersistFn,
} from '@/utils/common';

import {
  Mountain,
} from './mountains';
import {
  getLocationList,
} from './utils';
import { FilterLocationList } from './FilterLocationList';
import { locations } from './locations';

export interface MountainListProps {
  mountains: Mountain[];
}

export const MountainList: React.FC<MountainListProps> = ({
  mountains,
}) => {
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');

  const cityList = useMemo(() => getLocationList(mountains, 'city'), [mountains]);
  const countyList = useMemo(() => getLocationList(mountains, 'county'), [mountains]);

  const subCounties = useMemo(() => {
    const province = locations?.find((item) => {
      return item?.name === '陕西省';
    });

    const targetCity = province?.children?.find((item) => {
      return item?.name === city;
    });

    const targetCountyList = targetCity?.children?.map((item) => {
      return item?.name;
    });
    return targetCountyList;
  }, [city]);

  const filterMountains = useMemo(() => {
    let validList = mountains;

    if (city) {
      validList = validList?.filter((item) => {
        return item?.city === city;
      });
    }

    if (county) {
      validList = validList?.filter((item) => {
        return item?.county === county;
      });
    }

    return validList;
  }, [city, county, mountains]);

  const cityClick = usePersistFn((name: string) => {
    setCity(city === name ? '' : name);
    setCounty('');
  });

  const countyClick = usePersistFn((name: string) => {
    setCounty(county === name ? '' : name);
  });

  return (
    <div>
      <div>
        <h4
          className="leading-8 mb-2 text-gray-500"
        >
          Mountains
        </h4>
      </div>
      <div
        className="mountain-filters"
      >
        <FilterLocationList
          dataList={cityList}
          name="市"
          onClick={cityClick}
          selectedName={city}
        />
        <FilterLocationList
          dataList={countyList}
          name="县/区"
          onClick={countyClick}
          selectedName={county}
          validDataList={subCounties}
        />
      </div>
      <div className="mount-list-content">
        <div className="list-w grid grid-cols-2 lg:grid-cols-4 gap-2">
          {filterMountains?.map((item) => {
            return (
              <MountainItem
                key={item?.id}
                mountain={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export interface MountainItemProps {
  mountain: Mountain;
}

const MountainItem: React.FC<MountainItemProps> = ({
  mountain,
}) => {
  return (
    <div
      className="mountain-item px-2 py-1 bg-gray-100 rounded-lg hover:bg-indigo-200 hover:cursor-pointer"
    >
      <div
        className="mountain-title text-base"
      >
        {mountain?.name}
      </div>
      <div
        className="mountain-extras flex gap-2 text-gray-500 text-xs"
      >
        <p>
          {mountain?.high} 米
        </p>
        <p>
          {mountain?.city} {mountain?.county}
        </p>
      </div>
    </div>
  );
};