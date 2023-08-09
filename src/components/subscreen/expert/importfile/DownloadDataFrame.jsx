import React, {useState} from 'react';
import { getProvinceDataAPI, getPandemicDataAPI, getSupplyTypeDataAPI, getMedicalSupplyDataAPI } from '../../../../service/userService';
// Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DownloadDataFrame = () => {
    const [showTip, setShowTip] = useState(false);

    const downloadFile = (data, filename) => {
        const currentTime = new Date().getTime();
        const fileName = `${filename}_${currentTime}.xlsx`;
        // Tạo workbook mới
        const workbook = XLSX.utils.book_new();
    
        // Convert data to worksheet format
        // console.log(data);
        const worksheet = XLSX.utils.json_to_sheet(data);
        // console.log(fileName, workbook, worksheet);
        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        // Write workbook to Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        // Create a Blob from the buffer
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // Download the file
        saveAs(blob, fileName);
    };

    const getProvinceData = async () => {
        const provinceData = await getProvinceDataAPI();
        // console.log(provinceData);
        downloadFile(provinceData.map(e=>{
            return {
                province_id: e.province_id,
                province_name: e.province_name,
            }
        }), 'Province')
    }

    const getPandemicData = async () => {
        const pandemicData = await getPandemicDataAPI();
        // console.log(pandemicData);
        downloadFile(pandemicData.map(e=>{
            return {
                pandemic_id: e.pandemic_id,
                pandemic_name: e.pandemic_name,
            }
        }), 'Pandemic');
    }
    
    const getSupplyTypeData = async () => {
        const supplyTypeData = await getSupplyTypeDataAPI();
        // console.log(supplyTypeData);
        downloadFile(supplyTypeData, 'SupplyType');
    }

    const getMedicalSupplyData = async () => {
        const medicalSupplyData = await getMedicalSupplyDataAPI();
        // console.log(medicalSupplyData);
        downloadFile(medicalSupplyData, 'MedicalSupply');
    }

    return (
        <div className="mt-4">
            {showTip ? 
            <div className=" text-green-900 ">
                <div className="cursor-pointer underline" onClick={getProvinceData}>Tỉnh thành phố</div>
                <div className="cursor-pointer underline" onClick={getPandemicData}>Loại dịch bệnh</div>
                <div className="cursor-pointer underline" onClick={getSupplyTypeData}>Phân loại VTYT</div>
                <div className="cursor-pointer underline" onClick={getMedicalSupplyData}>Sản phẩm VTYT</div>
                <div className="cursor-pointer text-red-900 underline" onClick={()=>{setShowTip(false)}}><strong>Ẩn</strong></div>
            </div> : <div className="text-blue-500 underline cursor-pointer" onClick={()=>{setShowTip(true)}}>Download các file dữ liệu</div>}
        </div>
    );
};

export default DownloadDataFrame;
