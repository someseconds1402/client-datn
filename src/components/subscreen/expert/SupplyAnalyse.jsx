import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getPandemicDataAPI, getEpidemicDataOfAllProvincesAPI, getSupplyQuantityOfAllProvincesAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import MyDatePicker from '../../datepicker/DatePicker';
import SupplyTable from './supplytable/SupplyTable';

// Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function SupplyAnalyse() {
  const navigate = useNavigate();

  const [pandemicData, setPandemicData] = useState([]);
  
  const [provinceSelect, setProvinceSelect] = useState(0);
  const [pandemicSelect, setPandemicSelect] = useState(0);
  const [dateSelect, setDateSelect] = useState("2022-07-15");

  const [superData, setSuperData] = useState([]);
  const [tableData, setTableData] = useState({});
  const abilityList = ['Chưa xác định', 'Cần hỗ trợ', 'Tự cung ứng', 'Có khả năng hỗ trợ'];
  const [abilitySelect, setAbilitySelect] = useState(abilityList[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [canDownload, setCanDownload] = useState(false);

  const [ability1, setAbility1] = useState(0);
  const [ability2, setAbility2] = useState(0);
  const [ability3, setAbility3] = useState(0);
  
  const changePandemic = (option)=>{
    setPandemicSelect(2)
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    setAbilitySelect(0)
    setProvinceSelect(province_id);
  }

  const changeAbility = (option) => {
    setSuperData((prevData) => {
      const newData = prevData.map((e) => {
        if (e.province_id === provinceSelect) {
          return { ...e, ability: abilityList.indexOf(option) };
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
            if (!e.ability) {
              // console.log((e.data[0].quantity % 19) % 3 + 1);
              const ability = (e.data[0].quantity % 19) % 3 + 1;
              return { ...e, ability: ability };
            } else {
              return e;
            }
          });
          return newData;
        });

        resolve();
      }, 3000);
    });
    
    setIsLoading(false);
    alert('Đã phân cụm xong. Có thể tải xuống file dữ liệu được phân tích');
    setCanDownload(true);
    // console.log(superData);
  }

  const downloadFile = () => {
    const currentTime = new Date().getTime();
    const fileName = `${currentTime}_SupplySupport.xlsx`;
    // Tạo workbook mới
    const workbook = XLSX.utils.book_new();

    // Biến đổi dữ liệu superData
    const transformedData = superData.map((data) => {
      const transformedObj = {
        province_id: data.province_id,
        level: data.level,
        ability: data.ability,
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
        const data = await getSupplyQuantityOfAllProvincesAPI(pandemicSelect);
        data.forEach(e=>{
          if(!e.ability){
            e.ability = 0;
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
  }, [pandemicSelect]);

  useEffect(() => {
    if(superData && superData.length > 0){
      let data = superData.find(e=>e.province_id==provinceSelect);
      if (data) {
        setAbilitySelect(data.ability);
        setTableData(data);
      }
    }
  }, [provinceSelect]);
  
  useEffect(()=>{
    setAbility1(superData.filter(e=>e.ability==1).length);
    setAbility2(superData.filter(e=>e.ability==2).length);
    setAbility3(superData.filter(e=>e.ability==3).length);
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
        <h1>Phân tích khả năng hỗ trợ VTYT</h1>
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
            <div className="mt-3">Cần hỗ trợ        : <strong className='text-red-900'>{ability1}</strong></div>
            <div className="mt-3">Tự cung ứng       : <strong className='text-blue-900'>{ability2}</strong></div>
            <div className="mt-3">Có khả năng hỗ trợ: <strong className='text-green-900'>{ability3}</strong></div>
            {(ability1>1 && ability2>1 && ability3>1) ? (
              <><span className="btn btn-primary mt-5 w-36" onClick={analyseData}>Phân cụm</span>
              {canDownload && <span className="btn btn-success mt-5 ml-4 w-36" onClick={downloadFile}>Tải file phân tích</span>}
              </>
            ) : (
              <div className="mt-4 text-blue-900">Khi đã xác định được mỗi mục có ít nhất 2 tỉnh thành, có thể thực hiện phân cụm nhanh.</div>
            )
            }
            
          </div>
          <div className="col-span-2 mt-4">
            <SupplyTable data={tableData} func={changeAbility} selectOption={abilitySelect}/>
          </div>
        </div>
      </div>
    </MainFrame>
  )
}

export default SupplyAnalyse