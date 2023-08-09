import React, { useRef, useState } from 'react';
import FadeIn from '../../../effect/FadeIn';
import { insertProvinceAPI, insertDistanceAPI, 
  insertPandemicAPI, insertSupplyTypeAPI, 
  insertSupplyMapPandemicAPI, insertMedicalSupplyAPI, 
  insertInfectionSituationAPI, insertRecoveredSituationAPI, 
  insertDeathSituationAPI, insertLevelAPI, 
  insertSupplyQuantityAPI, insertSupplyAbilityAPI } from '../../../../service/userService';
import { IMPORT_PROPERTIES } from '../../../../constant/constant';
import { EXAMPLE } from '../../../../constant/example';
// Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ImportButton = (props) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const APIList = [
    insertProvinceAPI, insertDistanceAPI, 
    insertPandemicAPI, insertSupplyTypeAPI, 
    insertSupplyMapPandemicAPI, insertMedicalSupplyAPI, 
    insertInfectionSituationAPI, insertRecoveredSituationAPI, 
    insertDeathSituationAPI, insertSupplyQuantityAPI, 
    insertLevelAPI, insertSupplyAbilityAPI
  ]

  const handleImport = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check the file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'xlsx') {
      setErrorMessage('Lỗi định dạng. Hãy chọn file có phần mở rộng là \'xlsx\'');
      setSelectedFile(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      if (workbook.SheetNames.length === 0) {
        setErrorMessage('Lỗi định dạng. Hãy chọn file có phần mở rộng là \'xlsx\'');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setErrorMessage('');
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleUploadFile = async (jsonData, orderButton) => {
    let objectData = [];
    let importProp = IMPORT_PROPERTIES[orderButton];
    let properties = jsonData.shift();
  
    if (importProp.every((e) => properties.includes(e.name))) {
      for (let i = 0; i < jsonData.length; i++) {
        let e = jsonData[i];
        let element = {};
  
        for (let index = 0; index < properties.length; index++) {
          const prop = properties[index];
          const val = e[index];
          const valProp = importProp.find((m) => m.name == prop);
          if(!valProp) {
            continue;
          }
          const valType = valProp.type;
          if(val==null || val==undefined){
            setErrorMessage(`Cột ${prop} hàng ${i+2} không có giá trị.`);
            return false
          }

          switch (valType) {
            case 'int': {
              if (isNaN(val) || val % 1 !== 0) {
                setErrorMessage(`Cột ${prop} hàng ${i+2}: giá trị không phải số nguyên.`);
                return false;
              }
              break;
            }
            case 'float': {
              if (isNaN(val)) {
                setErrorMessage(`Cột ${prop} hàng ${i+2}: giá trị không phải số thực.`);
                return false;
              }
              break;
            }
            case 'date': {
              if (isNaN(Date.parse(val))) {
                setErrorMessage(`Cột ${prop} tồn tại 1 giá trị thời gian không hợp lệ (${val}).`);
                return false;
              }
              break;
            }
            default:
              break;
          }
          element[prop] = val;
        }
        objectData.push(element);
      }
      console.log('test', objectData);
      const result = await APIList[orderButton](objectData);
      if(result && result.errCode==0){
        alert('Cập nhật thành công!');
      } else {
        alert('Đã xảy ra lỗi. Đã có dữ liệu nằm ngoài phạm vi cho phép.');
      }
      setSelectedFile(null);
      setErrorMessage('');
      return true;
    } else {
      setErrorMessage('Lỗi. Các trường trong bảng đang không đúng theo định dạng. Hãy xem file mẫu để tham khảo.');
      return false;
    }
  };

  const downloadFile = async (data, filename) => {
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

  const handleReadData = () => {
    if (!selectedFile) {
      return;
    }

    const fileReader = new FileReader();
    
    fileReader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = await XLSX.read(data, { type: 'array' });

      // Đọc dữ liệu từ sheet đầu tiên (sheet index = 0)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Sử dụng XLSX.utils.sheet_to_json để chuyển đổi sheet thành mảng JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      
      if(jsonData.length > 1){
        // console.log(jsonData);
        const result = await handleUploadFile(jsonData, props.orderButton-1);
        if(!result){
          return;
        }
      } else {
        setErrorMessage('Lỗi định dạng. Hãy chọn file có phần mở rộng là \'xlsx\'');
        setSelectedFile(null);
        return;
      }
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setErrorMessage('');
  };

  return (
    <div className='col-span-1'>
      <FadeIn>
        <div className="grid grid-cols-4 mt-5">
          <div className="col-span-3 pl-4"><h5>{props.elementName}</h5></div>
          <div className="col-span-1"><hr /></div>
        </div>
        {!selectedFile && 
          <button className="border-solid border-2 border-gray-500 rounded-lg w-64 h-9 hover:bg-gray-300 ml-4" onClick={handleImport}>
            Thêm file
          </button>}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {selectedFile && (
          <div className=''>
            <p className="pl-4">Selected file: {selectedFile.name}</p>
            <button className="btn btn-danger w-64 ml-4" onClick={handleDelete}>
              Xóa
            </button>
            <button className="btn btn-success w-64 ml-4 mt-2" onClick={handleReadData}>
              Cập nhật dữ liệu lên hệ thống
            </button>
          </div>
        )}
        <p className="text-blue-500 underline cursor-pointer pl-4" onClick={()=>{downloadFile(EXAMPLE[props.orderButton-1].data, EXAMPLE[props.orderButton-1].name)}}>Download file mẫu</p>
        {errorMessage && <p className="text-red-700 px-4">{errorMessage}</p>}
      </FadeIn>
    </div>
  );
};

export default ImportButton;
