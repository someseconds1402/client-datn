import React, {useEffect, useState} from 'react';
import Dropdown from '../../../dropdown/Dropdown';

const WeightTable = (props) => {
  const [weight, setWeight] = useState([0,0,0,0,0,0,0,0,0,0,0]);
  
  const handleChange = (event, index) => {
    const inputValue = event.target.value;
    const updatedWeight = [...weight]; // Tạo một bản sao của mảng weight
    // if (!isNaN(inputValue)) {
      updatedWeight[index] = inputValue;
    // } else {
      // updatedWeight[index] = 0;
    // }
    // console.log(inputValue);
    setWeight(updatedWeight);
  };

  const test = () => {
    console.log(weight);
  }

  return (
    <table className="border w-full shadow-xl rounded-lg border-b dark:border-gray-700 bg-white" >
      <thead className=''>
        <tr className="h-10 border-b border-black bg-blue-300">
          <th className='pl-3'>Thuộc tính</th>
          <th>Trọng số</th>
        </tr>
      </thead>
      <tbody className="max-h-100 overflow-y-auto">
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Số lượng ca nhiễm mới</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[0]}
                onChange={(e)=>{handleChange(e, 0)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Số lượng ca nhiễm trung bình 7 ngày</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[1]}
                onChange={(e)=>{handleChange(e, 1)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Tổng số ca nhiễm</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[2]}
                onChange={(e)=>{handleChange(e, 2)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Số lượng ca hồi phục mới</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[3]}
                onChange={(e)=>{handleChange(e, 3)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Số lượng ca hồi phục trung bình 7 ngày</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[4]}
                onChange={(e)=>{handleChange(e, 4)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Tổng số ca hồi phục</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[5]}
                onChange={(e)=>{handleChange(e, 5)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Số lượng ca tử vong mới</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[6]}
                onChange={(e)=>{handleChange(e, 6)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Số lượng ca tử vong trung bình 7 ngày</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[7]}
                onChange={(e)=>{handleChange(e, 7)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Tổng số ca tử vong</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[8]}
                onChange={(e)=>{handleChange(e, 8)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Dân số</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[9]}
                onChange={(e)=>{handleChange(e, 9)}}
              /></td>
        </tr>
        <tr className="border-t border-gray">
          <td className='pl-3 border-r border-gray'>Mật độ dân cư</td>
          <td className='pl-5'><input
                type="Weight"
                placeholder=""
                className="w-fullshadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-96 shadow-xl"
                value={weight[10]}
                onChange={(e)=>{handleChange(e, 10)}}
              /></td>
        </tr>
      </tbody>
    </table>
  );
};

export default WeightTable;
