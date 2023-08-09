import React, {useState} from 'react';
import ImportButton from './ImportButton';
import DownloadDataFrame from './DownloadDataFrame';

const ImportFrame = () => {
    const [buttonChange, setButtonChange] = useState(1);

    const handleButton1 = ()=>{
        setButtonChange(1);
    }

    const handleButton2 = ()=>{
        setButtonChange(2);
    }

    return (
        <div className="mt-5">
            <DownloadDataFrame/>
            <div className="flex justify-center items-end mt-5">
                <button className={
                    "rounded-t-lg " + (buttonChange==1 ? 'border-solid border-2 border-gray-500 w-40 h-11':' bg-gray-300 w-36 h-10')
                } onClick={handleButton1}>Dữ liệu tĩnh</button>
                <button className={
                    "rounded-t-lg " + (buttonChange==2 ? 'border-solid border-2 border-gray-500 w-40 h-11':' bg-gray-300 w-36 h-10')
                } onClick={handleButton2}>Dữ liệu động</button>
            </div>
            {buttonChange==1 && <div className="grid grid-cols-3 border-t-2 border-gray-500 rounded-lg">
                <ImportButton elementName="TỈnh thành phố" orderButton='1'/>
                <ImportButton elementName="Khoảng cách" orderButton='2'/>
                <ImportButton elementName="Các loại bệnh dịch" orderButton='3'/>
                <ImportButton elementName="Phân loại VTYT" orderButton='4'/>
                <ImportButton elementName="Đối ứng bệnh dịch và VTYT" orderButton='5'/>
                <ImportButton elementName="Các sản phẩm VTYT" orderButton='6'/>
            </div>}
            {buttonChange==2 && <div className="grid grid-cols-3 border-t-2 border-gray-500 rounded-lg">
                <ImportButton elementName="Số lượng nhiễm" orderButton='7'/>
                <ImportButton elementName="Số lượng hồi phục" orderButton='8'/>
                <ImportButton elementName="Số lượng tử vong" orderButton='9'/>
                <ImportButton elementName="Số lượng vật tư y tế" orderButton='10'/>
                <ImportButton elementName="Cấp độ dịch" orderButton='11'/>
                <ImportButton elementName="Khả năng cung ứng VTYT" orderButton='12'/>
            </div>}
        </div>
    );
};

export default ImportFrame;
