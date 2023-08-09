import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date('2023-07-15'));
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.func(date ? date.toString() : '2023-07-15');
  };

  return (
    <div className='rounded-md focus:outline-none w-full mt-4 border-2 py-1 px-2 border-gray-600'>
        <DatePicker 
        selected={selectedDate} 
        onChange={handleDateChange} 
        dateFormat="dd/MM/yyyy"
        placeholderText="Chọn thời gian"
        className='py-1 px-2 '
        />
    </div>
  );
};

export default MyDatePicker;
