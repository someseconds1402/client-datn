import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeLevel } from '../../store/reducer/epidemicDataAnalyseSlice';

const DropdownEpidemicAnalyse = (props) => {
  const dispatch = useDispatch();
  const options = ['Chưa xác định', 'Cấp 1', 'Cấp 2', 'Cấp 3'];
  const colors = ['white', '#b5f5e1', '#d1c7ff', '#f0b4bc'];
  const [selectedOption, setSelectedOption] = useState(options[props.selectOption]);
  // console.log('Dropdown', props, selectedOption);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    dispatch(changeLevel({province_id: props.provinceId, level: options.indexOf(value)}))
  };

  useEffect(()=>{
    if(props && props.selectOption != 0){
      setSelectedOption(options[props.selectOption])
    } else {
      setSelectedOption(options[0])
    }
  })

  return (
    <div>
        <select 
        value={selectedOption} 
        onChange={handleOptionChange} 
        className="py-2 px-4 rounded-md focus:outline-none w-full mt-4 border-2 border-gray-600">
            {options.map((option, index) => (
            <option style={{ backgroundColor: colors[index] }} key={index} value={option}>
                {option}
            </option>
            ))}
        </select>
        {/* <p>Selected option: {selectedOption}</p> */}
    </div>
  );
};

export default DropdownEpidemicAnalyse;
