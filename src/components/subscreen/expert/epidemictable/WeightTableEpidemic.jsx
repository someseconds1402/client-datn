import React, {useState} from 'react';
import FadeIn from '../../../effect/FadeIn';

const WeightTableEpidemic = (props) => {
    const [weight, setWeight] = useState(props.data);
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

    const submit = () => {
        props.func(weight.map(e=>parseFloat(e)));
    }

    const cancel = () => {
        props.func();
    }

    const drawTable = (label, index) => {
        return (
            <div className="col-span-1 grid grid-cols-3 items-center mx-2 px-1 mb-1 h-24
            border shadow-xl rounded-lg dark:border-gray-700 bg-white">
                <div className='col-span-2'><strong>{label}</strong></div>
                <div className='col-span-1'><input
                        type="Weight"
                        placeholder=""
                        className="w-full sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 h-16 
                            focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-xl bg-gray-50"
                        value={weight[index]}
                        onChange={(e)=>{handleChange(e, index)}}
                    /></div>
            </div>
        )
    }

    return (
        <>
            <div className="absolute inset-0 h-full w-full bg-black opacity-20 z-50">
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-50">
                    <div className="main-frame shadow text-center pt-5 h-4/5 w-1/2 level-count-container absolute z-10">
                    <FadeIn>
                        <div className="grid grid-cols-3">
                            {labelProps.map((e, index)=>drawTable(e, index))}
                        </div>

                        <div className="flex justify-center mt-5">
                            <div className=" w-72 btn btn-primary mr-3" onClick={submit}>
                                Xác Nhận
                            </div>
                            <div className=" w-72 btn btn-danger ml-3" onClick={cancel}>
                                Thoát
                            </div>
                        </div>
                    </FadeIn>
                    </div>
            </div>
        </>
        
    );
};

export default WeightTableEpidemic;
