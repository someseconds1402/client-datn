import React, {useEffect, useState} from 'react';
import Dropdown from '../../../dropdown/Dropdown';

const SupplyTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [rowNum, setRowNum] = useState(0);
  const [abilityList, setAbilityList] = useState(['Chưa xác định', 'Cần hỗ trợ', 'Tự cung ứng', 'Có khả năng hỗ trợ']);

  useEffect(()=>{
    // console.log('SupplyTable: ', props);
    // console.log(Object.keys(props.data).length);
    // console.log(props.data);
    if(Object.keys(props.data).length){
      const data = props.data;
      if(data.data && data.data.length > 0){
        // console.log(data.data);
        const tableDataTable = data.data;
        setTableData(tableDataTable)
        setRowNum(tableDataTable.length)
        // console.log(tableDataTable.length);
      }
    }
  }, [props.data]);

  return (
    <table className="border border-black w-full">
      <thead className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
        <tr>
          <th className="border border-black p-2">Tên</th>
          <th className="border border-black p-2">Loại</th>
          <th className="border border-black p-2">Số lượng</th>
          <th className="border border-black p-2">Cấp độ dịch</th>
          <th className="border border-black p-2">Khả năng hỗ trợ</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td className="border border-black p-2">{row.supply_name}</td>
            <td className="border border-black p-2">{row.supply_type}</td>
            <td className="border border-black p-2">{row.quantity}</td>
            {index==0 ?
              (<>
                <td className="p-2 border-l border-r border-black text-center "><strong className='text-red-900'>{props.data.level}</strong></td>
                <td className="p-2"><Dropdown data={abilityList} selectOption={props.selectOption} func={props.func} /></td>
              </>) : (
                <td className="border-l border-r border-black "></td>
              )
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SupplyTable;
