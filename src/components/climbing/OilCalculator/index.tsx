'use client';

import { useMemoizedFn } from 'ahooks';
import { useState } from 'react';

import { InputItem } from './InputItem';
import { ResultItem } from './ResultItem';
import { EnumOilName,OilFormData, OilFormDataDefaultValue } from './types';

/**
 * 油费计算
 */
export const OilCalculator = () => {
  const [oilData, setOilData] = useState<OilFormData>(OilFormDataDefaultValue);

  const onDataChange = useMemoizedFn((itemData: Partial<OilFormData>) => {
    setOilData({
      ...oilData,
      ...itemData,
    });
  });

  // 总油耗
  const totalOil = oilData.totalRoads * oilData.oilPerHundred / 100;
  // 总油费
  const totalOilCost = totalOil * oilData.oilPrice;
  // 总计
  const totalCost = oilData.highwayCost + totalOilCost + oilData.extraCost;
  // 每人平均
  const costPerPeople = totalCost / oilData.people;

  return (
    <div className="mt-4">
      <p className=" mb-2 text-gray-500">
        油费估算
      </p>
      <div>
        <form
          className="flex flex-row py-6 md:py-0 flex-wrap"
        >
          <InputItem
            name={EnumOilName.highwayCost}
            value={oilData.highwayCost}
            label="高速过路费"
            placeHolder="高速过路费"
            unit="元"
            onChange={onDataChange}
          />
          <InputItem
            name={EnumOilName.totalRoads}
            value={oilData.totalRoads}
            label="总里程"
            placeHolder="总里程"
            unit="公里(km)"
            onChange={onDataChange}
          />
          <InputItem
            name={EnumOilName.oilPrice}
            value={oilData.oilPrice}
            label="当前油价"
            placeHolder="当前油价"
            unit="元/升"
            extra="如当前92号汽油油价"
            onChange={onDataChange}
          />
          <InputItem
            name={EnumOilName.oilPerHundred}
            value={oilData.oilPerHundred}
            label="百公里油耗"
            placeHolder="百公里油耗"
            unit="升/百公里"
            extra="目前大部分轿车8升左右"
            onChange={onDataChange}
          />
          <InputItem
            name={EnumOilName.extraCost}
            value={oilData.extraCost}
            label="附加费用"
            placeHolder="附加费用"
            unit="元"
            extra="额外附加，如食材、水果"
            onChange={onDataChange}
          />
          <InputItem
            name={EnumOilName.people}
            value={oilData.people}
            label="人数"
            placeHolder="人数"
            unit="人"
            onChange={onDataChange}
          />
        </form>

        <div className="mt flex flex-wrap">
          <ResultItem
            name="总油耗"
            value={totalOil}
            unit="升"
          />
          <ResultItem
            name="总油费"
            value={totalOilCost.toFixed(2)}
            unit="元"
          />
          <ResultItem
            name="总计"
            value={totalCost.toFixed(2)}
            unit="元"
          />
          <ResultItem
            name="平均费用"
            value={costPerPeople.toFixed(2)}
            unit="元"
          />
        </div>
        <div className="mt-4 text-gray-600">
          <div className="font-medium">
            计算方式说明：
          </div>
          <div className="mt-2 leading-6">
            <p>
              总油耗 {totalOil.toFixed(2)} = 总里程 {oilData.totalRoads} * 百公里油耗 {oilData.oilPerHundred} / 100
            </p>
            <p>
              总油费 {totalOilCost.toFixed(2)} = 总油耗 {totalOil.toFixed(2)} * 当前油价 {oilData.oilPrice.toFixed(2)}
            </p>
            <p>
              总计 {totalCost.toFixed(2)} = 高速过路费 {oilData.highwayCost.toFixed(2)} + 总油费 {totalOilCost.toFixed(2)} + 附加费用 {oilData.extraCost.toFixed(2)}
            </p>
            <p>
              人均 {costPerPeople.toFixed(2)} = 高速过路费 {totalCost.toFixed(2)} / 人数 {oilData.people}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



