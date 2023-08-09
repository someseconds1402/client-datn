import React, { useEffect, useState } from 'react';

const Dropdown = (props) => {
  const options = props.data;
  const [selectedOption, setSelectedOption] = useState(options[0]);
  // console.log('Dropdown', props, selectedOption);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    props.func(value);
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
        className="py-2 px-4 rounded-md focus:outline-none w-full border-2 border-gray-600">
            {options.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
            ))}
        </select>
        {/* <p>Selected option: {selectedOption}</p> */}
    </div>
  );
};

export default Dropdown;
