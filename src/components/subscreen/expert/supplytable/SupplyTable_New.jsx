import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DropdownSupplyAnalyse from '../../../dropdown/DropdownSupplyAnalyse';

const SupplyTable_New = (props) => {
  const SupplyData = useSelector((state) => state.supplyDataAnalyse.data);
  const colors = ['white', '#b5f5e1', '#d1c7ff', '#f0b4bc'];
  const [labelProps, setLabelProps] = useState([])

  useEffect(() => {
    if (SupplyData && SupplyData.length > 0) {
      const supplyType = SupplyData[0].supply_name;
      setLabelProps([
        // 'Số lượng ' + supplyType,
        'Số lượng ' + supplyType + ' /người',
        'Dân số',
        'Mật độ dân cư',
        'Cấp độ dịch',
      ]);
    }
  }, [SupplyData]);

  return (
    <table className="border w-full">
      <thead className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
        <tr>
          <th className="border border-black p-2">Thành phố</th>
          {labelProps.map((label, index)=>(
            <th className="border border-black p-2">{label} 
              <span className=' text-blue-800'>{props.isShowWeight? (' ('+props.weightData[index]+')') : ''}</span></th>
          ))}
          <th className="border border-black p-2">Khả năng hỗ trợ VTYT</th>
        </tr>
      </thead>
      <tbody>
        {SupplyData.map((row, index) => (
          <tr key={index} style={{ backgroundColor: colors[row.ability] }}>
            <td className="border border-black p-2">{row.province_name}</td>
            {/* <td className="border border-black p-2">{row.supply_quantity}</td> */}
            <td className="border border-black p-2">{row.supply_quatity_per_person}</td>
            <td className="border border-black p-2">{row.population}</td>
            <td className="border border-black p-2">{row.population_density}</td>
            <td className="border border-black p-2">{row.level}</td>
            <td className="border border-black p-2"><DropdownSupplyAnalyse selectOption={row.ability} provinceId={row.province_id} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SupplyTable_New;
