import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getEpidemicDataAPI, getPandemicDataAPI } from '../../../service/userService'
import { useDispatch } from 'react-redux';
import { changeEpidemicData, changeEpidemicOption } from '../../../store/reducer/changeEpidemicDataSlice';
import { enebleLoadingScreen, disableLoadingScreen } from '../../../store/reducer/showLoadingScreenSlice';
// import { changePandemicData } from '../../../store/reducer/getPandemicDataSlice';
import LineChart from '../../chart/LineChart';
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import MyDatePicker from '../../datepicker/DatePicker';

function EpidemicDisplay() {
  const navigate = useNavigate();

  const [pandemicData, setPandemicData] = useState([]);
  
  const [provinceSelect, setProvinceSelect] = useState(1);
  const [pandemicSelect, setPandemicSelect] = useState(0);
  const [dateSelect, setDateSelect] = useState("2023-07-15");

  const dispatch = useDispatch();
  const [chartData, setChartData] = useState({
    labels: ['No name'],
    datasets: [
      {
        label: "No name",
        data: [0],
      }
    ]
  });

  const [isShowLevel, setIsShowLevel] = useState(false);
  const [chartLevelData, setChartLevelData] = useState({
    labels: ['No name'],
    datasets: [
      {
        label: "No name",
        data: [0],
      }
    ]
  });

  const getEpidemicData = async (province_id, pandemic_id, date) => {
    dispatch(enebleLoadingScreen());
    const data = await getEpidemicDataAPI(province_id, pandemic_id, date);
    console.log(data);
    dispatch(changeEpidemicData({data}));
    setChartData({
      labels: data.dateRange,
      datasets: [
        {
          label: data.infection.title,
          data: data.infection.list.map(e=>e.quantity_in_today),
          borderColor: 'blue',
          backgroundColor: 'blue'
        },
        {
          label: data.recovered.title,
          data: data.recovered.list.map(e=>e.quantity_in_today),
          borderColor: 'green',
          backgroundColor: 'green'
        },
        {
          label: data.death.title,
          data: data.death.list.map(e=>e.quantity_in_today),
          borderColor: 'red',
          backgroundColor: 'red'
        },
      ]
    })

    setChartLevelData({
      labels: data.dateRange,
      datasets: [
        {
          label: "Cấp độ dịch",
          data: data.level.list.map(e=>e.level),
          borderColor: 'blue',
          backgroundColor: 'blue'
        }
      ]
    })
    dispatch(disableLoadingScreen());
  }

  const changeOption = (order) => {
    dispatch(changeEpidemicOption({order: order}));
  }

  const changePandemic = (option)=>{
    // console.log(pandemicData.find(e=>e.pandemic_name==option).pandemic_id);
    setPandemicSelect(pandemicData.find(e=>e.pandemic_name==option).pandemic_id);
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    setProvinceSelect(province_id);
  }

  const changeDate = (date) => {
    setDateSelect(date);
  }

  const changeIsShowLevel = (event) => {
    setIsShowLevel(event.target.checked);
  };

  useEffect(()=>{
    if(localStorage.getItem('role') != 2){
      navigate(PATH.HOME);
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pandemicDataSrevice = await getPandemicDataAPI();
        setPandemicData(pandemicDataSrevice);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    getEpidemicData(provinceSelect, pandemicSelect, dateSelect );
  }, [provinceSelect, pandemicSelect, dateSelect]);

  return (
    <MainFrame>
      <h1>Tra cứu tình hình dịch bệnh</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 ">
          <Dropdown data={province} func={changeProvince} />
          <div className="mt-4"><Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} /></div>
          <MyDatePicker func={changeDate}/>

          <div className="w-full mt-4">
            <label className='text-lg flex items-center'>
              <input className='h-6 w-6' type="checkbox" checked={isShowLevel} onChange={changeIsShowLevel} />
              <span className='ml-1'>Xem cấp độ dịch</span>
            </label>
          </div>
        </div>
        { !isShowLevel ? 
        (<div className="col-span-3">
          <LineChart data={chartData} />
        </div>):(
        <div className="col-span-3">
          <LineChart data={chartLevelData} />
        </div>)}
      </div>
    </MainFrame>
  )
}

export default EpidemicDisplay