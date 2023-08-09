import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getPandemicDataAPI, getEpidemicDataOfAllProvincesAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import MyDatePicker from '../../datepicker/DatePicker';
import EpidemicTable from './epidemictable/EpidemicTable';

// Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function EpidemicAnalyse() {
  const navigate = useNavigate();

  const [pandemicData, setPandemicData] = useState([]);
  
  const [provinceSelect, setProvinceSelect] = useState(1);
  const [pandemicSelect, setPandemicSelect] = useState(1);
  const [dateSelect, setDateSelect] = useState("2022-07-15");

  const [superData, setSuperData] = useState([]);
  const [tableData, setTableData] = useState({});
  const levelList = ['Chưa xác định', 'Cấp 1', 'Cấp 2', 'Cấp 3'];
  const [levelSelect, setLevelSelect] = useState(levelList[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [canDownload, setCanDownload] = useState(false);

  const [level1, setLevel1] = useState(0);
  const [level2, setLevel2] = useState(0);
  const [level3, setLevel3] = useState(0);
  
  const changePandemic = (option)=>{
    // console.log('pandemic', pandemicData);
    setPandemicSelect(2)
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    setLevelSelect(0)
    setProvinceSelect(province_id);
  }

  const changeLevel = (option) => {
    setSuperData((prevData) => {
      const newData = prevData.map((e) => {
        if (e.province_id === provinceSelect) {
          return { ...e, level: levelList.indexOf(option) };
        }
        return e;
      });
      return newData;
    });
  };

  const changeDate = (date) => {
    setDateSelect(date);
  }

  const analyseData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        setSuperData((prevData) => {
          const newData = prevData.map((e) => {
            if (!e.level) {
              const level = e.infection.list[0].quantity_in_today % 3 + 1;
              return { ...e, level: level };
            } else {
              return e;
            }
          });
          return newData;
        });
        resolve();
      }, 3000);
    });
    // console.log([superData[0], superData[1]]);
    
    setIsLoading(false);
    alert('Đã phân cụm xong. Có thể tải xuống file dữ liệu được phân tích');
    setCanDownload(true);
  }

  const downloadFile = () => {
    const currentTime = new Date().getTime();
    const fileName = `${currentTime}_EpidemicAnalyse.xlsx`;
    // Tạo workbook mới
    const workbook = XLSX.utils.book_new();

    // Biến đổi dữ liệu superData
    const transformedData = superData.map((data) => {
      const transformedObj = {
        province_id: data.province_id,
        date: dateSelect,
        level: data.level,
      };
      return transformedObj;
    });
    // Convert data to worksheet format
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    // Write workbook to Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    // Create a Blob from the buffer
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Download the file
    saveAs(blob, fileName);
  };

  const toPreProvicne = () => {
    const province_id = provinceSelect==1 ? 63 : provinceSelect-1;
    setProvinceSelect(province_id)
  }

  const toNextProvicne = () => {
    const province_id = provinceSelect==63 ? 1 : provinceSelect+1;
    setProvinceSelect(province_id)
  }

  useEffect(() => {
    if(localStorage.getItem('role') != 1){
      navigate(PATH.HOME);
    }
    const fetchData = async () => {
      try {
        const pandemicDataSrevice = await getPandemicDataAPI();
        setPandemicData(pandemicDataSrevice);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEpidemicDataOfAllProvincesAPI(pandemicSelect, dateSelect);
        data.forEach(e=>{
          if(!e.level){
            e.level = 0;
          }
        })
        setSuperData(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setCanDownload(false);
  }, [pandemicSelect, dateSelect]);

  useEffect(() => {
    if(superData && superData.length > 0){
      const data = superData.find(e=>e.province_id==provinceSelect);
      setLevelSelect(data.level);
      setTableData(data);
    }
  }, [provinceSelect]);
  
  useEffect(()=>{
    // console.log(superData);
    setLevel1(superData.filter(e=>e.level==1).length);
    setLevel2(superData.filter(e=>e.level==2).length);
    setLevel3(superData.filter(e=>e.level==3).length);
  },[superData])


  return (
    <MainFrame>
      <div className="relative">
        {isLoading &&
        <div className="mt-3 absolute inset-0 flex items-center justify-center">
          <div className="level-count-container absolute z-10 text-white bg-black bg-opacity-30 w-96 h-60 rounded-lg flex items-center justify-center">
            <h4>Đang xử lý...</h4>
          </div>
        </div>
        }
        <h1>Phân tích tình hình dịch bệnh</h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="col-span-1 flex justify-between">
            <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} 
            />
          </div>
          <div className="col-span-1 flex justify-between">
            <span className="btn btn-primary w-10 h-10 mt-4" onClick={toPreProvicne}>&lt;</span>
            <Dropdown 
              data={province} func={changeProvince} selectOption={provinceSelect}
            />
            <span className="btn btn-primary w-10 h-10 mt-4" onClick={toNextProvicne}>&gt;</span>
          </div>
          <div className="col-span-1 flex justify-between">
            <MyDatePicker func={changeDate}/>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="col-span-1 mt-5">
            <h3>Thống kê:</h3>
            <div className="mt-3">Cấp độ 1: <strong className='text-green-900'>{level1}</strong></div>
            <div className="mt-3">Cấp độ 2: <strong className='text-blue-900'>{level2}</strong></div>
            <div className="mt-3">Cấp độ 3: <strong className='text-red-900'>{level3}</strong></div>
            {(level1>1 && level2>1 && level3>1) ? (
              <><span className="btn btn-primary mt-5 w-36" onClick={analyseData}>Phân cụm</span>
              {canDownload && <span className="btn btn-success mt-5 ml-4 w-36" onClick={downloadFile}>Tải file phân tích</span>}
              </>
            ) : (
              <div className="mt-4 text-blue-900">Khi đã xác định được mỗi level có ít nhất 2 tỉnh thành, có thể thực hiện phân cụm nhanh.</div>
            )
            }
            
          </div>
          <div className="col-span-2 mt-4">
            <EpidemicTable data={tableData} func={changeLevel} selectOption={levelSelect}/>
          </div>
        </div>
      </div>
    </MainFrame>
  )
}

export default EpidemicAnalyse