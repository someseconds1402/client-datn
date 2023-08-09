import React from 'react';
import { useSelector } from 'react-redux';
import DropdownEpidemicAnalyse from '../../../dropdown/DropdownEpidemicAnalyse';

const EpidemicTable_New = (props) => {
  const EpidemicData = useSelector((state) => state.epidemicDataAnalyse.data);
  const colors = ['white', '#b5f5e1', '#d1c7ff', '#f0b4bc'];

  const labelProps = [
    'Số lượng ca nhiễm mới',
    'Số lượng ca nhiễm trung bình 7 ngày',
    'Tổng số ca nhiễm',
    'Số lượng ca hồi phục mới',
    'Số lượng ca hồi phục trung bình 7 ngày',
    'Tổng số ca hồi phục',
    'Số lượng ca tử vong mới',
    'Số lượng ca tử vong trung bình 7 ngày',
    'Tổng số ca tử vong',
    'Dân số',
    'Mật độ dân cư',
  ]

  return (
    <table className="border w-full">
      <thead className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
        <tr>
          <th className="border border-black p-2">Thành phố</th>
          {labelProps.map((label, index)=>(
            <th className="border border-black p-2">{label} 
              <span className=' text-blue-800'>{props.isShowWeight? (' ('+props.weightData[index]+')') : ''}</span></th>
          ))}
          <th className="border border-black p-2" style={{'minWidth': '120px'}}>Cấp độ dịch</th>
        </tr>
      </thead>
      <tbody>
        {EpidemicData.map((row, index) => (
          <tr key={index} style={{ backgroundColor: colors[row.level] }}>
            <td className="border border-black p-2">{row.province_name}</td>
            <td className="border border-black p-2">{row.infection_new}</td>
            <td className="border border-black p-2">{row.infection_average}</td>
            <td className="border border-black p-2">{row.infection_total}</td>
            <td className="border border-black p-2">{row.recovered_new}</td>
            <td className="border border-black p-2">{row.recovered_average}</td>
            <td className="border border-black p-2">{row.recovered_total}</td>
            <td className="border border-black p-2">{row.death_new}</td>
            <td className="border border-black p-2">{row.death_average}</td>
            <td className="border border-black p-2">{row.death_total}</td>
            <td className="border border-black p-2">{row.population}</td>
            <td className="border border-black p-2">{row.population_density}</td>
            <td className="border border-black p-2"><DropdownEpidemicAnalyse selectOption={row.level} provinceId={row.province_id} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EpidemicTable_New;
