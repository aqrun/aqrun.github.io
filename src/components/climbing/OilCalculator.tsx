'use client';

import { ChangeEvent, useState } from 'react';

/**
 * 油费计算
 */
export const OilCalculator = () => {
  // 高速费
  const [highwayCost, setHighwayCost] = useState(20);
  // 总里程
  const [totalRoads, setTotalRoads] = useState(100);
  // 油价
  const [oilPrice, setOilPrice] = useState(7);
  // 百公时油耗
  const [oilPerHundred, setOilPerHundred] = useState(8);
  // 乘坐人数
  const [people, setPeople] = useState(1);

  // 总油耗
  const totalOil = totalRoads * oilPerHundred / 100;
  // 总油费
  const totalOilCost = totalOil * oilPrice;
  // 总计
  const totalCost = highwayCost + totalOilCost;
  // 每人平均
  const costPerPeople = totalCost / people;

  const handleHighwayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    setHighwayCost(Number(val) || 0);
  };

  const handleTotalRoadsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    setTotalRoads(Number(val) || 0);
  };

  const handleOilPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    setOilPrice(Number(val) || 0);
  };

  const handleOilPerHundredChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    setOilPerHundred(Number(val) || 0);
  };

  const handlePeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    setPeople(Number(val) || 0);
  };

  return (
    <div className="mt-4">
      <p className=" mb-2 text-gray-500">
        油费估算
      </p>
      <div>
        <form
          className="flex flex-col py-6 space-y-6 md:py-0"
        >
          <label className="flex items-start flex-col">
            <span className="mb-1 text-gray-500 w-28">高速过路费</span>
            <span className="mt-1 flex items-center">
              <input
                type="number"
                placeholder="高速过路费"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                onChange={handleHighwayChange}
                value={highwayCost}
              />
              <span className="block ml-2 text-slate-400">
                元
              </span>
            </span>
          </label>
          <label className="flex items-start flex-col">
            <span className="mb-1 text-gray-500 w-28">总里程</span>
            <span className="mt-1 flex items-center">
              <input
                type="number"
                placeholder="总里程"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                value={totalRoads}
                onChange={handleTotalRoadsChange}
              />
              <span className="block ml-2 min-w-[5rem] text-slate-400">
                公里(km)
              </span>
            </span>
          </label>
          <label className="flex items-start flex-col">
            <span className="mb-1 text-gray-500 w-28">当前油价</span>
            <span className="mt-1 flex items-center">
              <input
                type="number"
                placeholder="当前油价"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                value={oilPrice}
                onChange={handleOilPriceChange}
              />
              <span className="block ml-2 min-w-[5rem] text-slate-400">
                元/升
              </span>
            </span>
            <span className="text-gray-400 mt-2 font-normal text-sm">
              当前92或95号汽油油价,价格会有波动.
            </span>
          </label>
          <label className="flex items-start flex-col">
            <span className="mb-1 text-gray-500 w-28">百公里油耗</span>
            <span className="mt-1 flex items-center">
              <input
                type="number"
                placeholder="百公里油耗"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                value={oilPerHundred}
                onChange={handleOilPerHundredChange}
              />
              <span className="block ml-2 min-w-[5.5rem] text-slate-400">
                升/100公里
              </span>
            </span>
          </label>
          <label className="flex items-start flex-col">
            <span className="mb-1 text-gray-500 w-28">人数</span>
            <span className="mt-1 flex items-center">
              <input
                type="number"
                placeholder="人数"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
                value={people}
                onChange={handlePeopleChange}
              />
              <span className="block ml-2 min-w-[5rem] text-slate-400">
                人
              </span>
            </span>
          </label>
        </form>

        <div className="mt-4">
          <div className="flex items-center mt-2">
            <div className="w-24 text-gray-500">
              总油耗 
            </div>
            <div className="w-28 text-gray-900 font-medium">
              {totalOil}
            </div>
            <div className="text-gray-400">
              升 （总里程 * 百公里油耗 / 100）
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-24 text-gray-500">
              总油费
            </div>
            <div className="w-28 text-gray-900 font-medium">
              {totalOilCost.toFixed(2)}
            </div>
            <div className="text-gray-400">
              元 （总油耗 * 当前油价）
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-24 text-gray-500">
              总计
            </div>
            <div className="w-28 text-red-700 font-medium text-lg">
              {totalCost.toFixed(2)}
            </div>
            <div className="text-gray-400">
              元 （高速过路费 + 总油费）
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-24 text-gray-500">
              平均费用
            </div>
            <div className="w-28 text-red-700 font-medium text-lg">
              {costPerPeople.toFixed(2)}
            </div>
            <div className="text-gray-400">
              元 （{people}人）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


