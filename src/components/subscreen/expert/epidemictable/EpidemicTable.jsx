import React, {useEffect, useState} from 'react';
import Dropdown from '../../../dropdown/Dropdown';

const EpidemicTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [rowNum, setRowNum] = useState(0);
  const [levelList, setLevelList] = useState(['Chưa xác định', 'Cấp 1', 'Cấp 2', 'Cấp 3']);

  useEffect(()=>{
    // console.log('EpidemicTable: ', props);
    // console.log(Object.keys(props.data).length);
    // console.log(props.data);
    if(Object.keys(props.data).length){
      const data = props.data;
      const tableDataTable = data.dateRange.map(e=>{return {date: e}});
      setRowNum(tableDataTable.length);
      tableDataTable.forEach( e=>{
        // const eDate = new Date(e.date);
        const infection = data.infection.list.find( m=>{
          // const mDate = new Date(m.date);
          return e.date==m.date
        })
        const recovered = data.recovered.list.find( m=>{
          // const mDate = new Date(m.date);
          return e.date==m.date
        })
        const death = data.death.list.find( m=>{
          // const mDate = new Date(m.date);
          return e.date==m.date
        })
        e.infection = infection;
        e.recovered = recovered;
        e.death = death;
      })
      // console.log(tableDataTable);
      setTableData(tableDataTable)
    }
  }, [props.data]);

  return (
    <table className="border w-full">
      <thead className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
        <tr>
          <th className="border border-black p-2" rowSpan="2">Thời gian</th>
          <th className="border border-black p-2" colSpan="2">Số ca nhiễm</th>
          <th className="border border-black p-2" colSpan="2">Số ca khỏi bệnh</th>
          <th className="border border-black p-2" colSpan="2">Số ca tử vong</th>
          <th className="border border-black p-2" rowSpan="2">Cấp độ dịch</th>
        </tr>
        <tr>
          <th className="border border-black p-2">Mới</th>
          <th className="border border-black p-2">Tổng</th>
          <th className="border border-black p-2">Mới</th>
          <th className="border border-black p-2">Tổng</th>
          <th className="border border-black p-2">Mới</th>
          <th className="border border-black p-2">Tổng</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td className="border border-black p-2">{row.date}</td>
            <td className="border border-black p-2">{row.infection.quantity_in_today}</td>
            <td className="border border-black p-2">{row.infection.total_quantity}</td>
            <td className="border border-black p-2">{row.recovered.quantity_in_today}</td>
            <td className="border border-black p-2">{row.recovered.total_quantity}</td>
            <td className="border border-black p-2">{row.death.quantity_in_today}</td>
            <td className="border border-black p-2">{row.death.total_quantity}</td>
            {index==0 && 
              <td className="border border-black p-2" rowSpan={rowNum}><Dropdown data={levelList} selectOption={props.selectOption} func={props.func} /></td>
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EpidemicTable;
