import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getPandemicDataAPI, getEpidemicDataOfAllProvincesAPI, clusterAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from '../../../constant/province'
import MyDatePicker from '../../datepicker/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { changeEpidemicDataAnalyse, sortWithLevel, resetAllLevel } from '../../../store/reducer/epidemicDataAnalyseSlice';
import { enebleLoadingScreen, disableLoadingScreen } from '../../../store/reducer/showLoadingScreenSlice';

// Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import EpidemicTable_New from './epidemictable/EpidemicTable_New';
// import S_SMC_FCM from '../../../logic/sSMC_FCM';
import WeightTableEpidemic from './epidemictable/WeightTableEpidemic';

function EpidemicAnalyse_New() {
  const navigate = useNavigate();
  const EpidemicData = useSelector((state) => state.epidemicDataAnalyse.data);
  const dispatch = useDispatch();

  const [pandemicData, setPandemicData] = useState([]);
  
  const [pandemicSelect, setPandemicSelect] = useState(0);
  const [dateSelect, setDateSelect] = useState("2023-07-15");

  const [showTip, setShowTip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWeightTable, setShowWeightTable] = useState(false);
  const [weight, setWeight] = useState([0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1]);
  const [isShowWeight, setIsShowWeight] = useState(false);
  const [showResetData, setShowResetData] = useState(false);
  const [weightList, setWeightList] = useState({
    infection_new: 1,
    infection_average: 1,
    infection_total: 1,
    recovered_new: 1,
    recovered_average: 1,
    recovered_total: 1,
    death_new: 1,
    death_average: 1,
    death_total: 1,
    population: 1,
    population_density: 1,
  });

  const weightLabel = [
    'infection_new',
    'infection_average',
    'infection_total',
    'recovered_new',
    'recovered_average',
    'recovered_total',
    'death_new',
    'death_average',
    'death_total',
    'population',
    'population_density',
  ]

  const changePandemic = (option)=>{
    // console.log('pandemic', pandemicData);
    setPandemicSelect(pandemicData.find(e=>e.pandemic_name==option).pandemic_id)
  }

  const changeDate = (date) => {
    setDateSelect(date);
  }

  const changeIsShowWeight = (event) => {
    setIsShowWeight(event.target.checked);
  }

  const closeDialog = (data)=>{
    if(data){
      setWeight(data);
      let weightListTmp = weightList;
      weightLabel.forEach((e, index)=>{
        weightListTmp[e] = data[index];
      });
      setWeightList(weightListTmp);
      // console.log(weightList);
    }
    setShowWeightTable(false);
  }

  const Clust = async () => {
    let U = EpidemicData.map(e=>{
      return {
        "province_id": e.province_id,
        "province_name": e.province_name,
        "population": (e.population)/1000000,
        "population_density": e.population_density,
        "level": e.level,
        "infection_new": e.infection_new,
        "infection_total": e.infection_total,
        "infection_average": e.infection_average,
        "recovered_new": e.recovered_new,
        "recovered_total": e.recovered_total,
        "recovered_average": e.recovered_average,
        "death_new": e.death_new,
        "death_total": e.death_total,
        "death_average": e.death_average,
      }
    });
    // console.log(U, weightList);
    const C = [1, 2, 3]; // Danh sách các nhãn cần phân cụm
    
    const tagField = 'level'; // Trường dữ liệu chứa nhãn
    
    const keys = ['province_name', 'province_id']; // Các trường dữ liệu không tham gia vào việc phân cụm
    
    dispatch(enebleLoadingScreen());
    clusterAPI(U, C, tagField, keys, weightList)
      .then(data => {
        // console.log(data);
        dispatch(changeEpidemicDataAnalyse({data: data.map(e=>{
          return {
            "province_id": e.province_id,
            "province_name": e.province_name,
            "population": (e.population)*1000000,
            "population_density": e.population_density,
            "level": e.cluster_label,
            "infection_new": e.infection_new,
            "infection_total": e.infection_total,
            "infection_average": e.infection_average,
            "recovered_new": e.recovered_new,
            "recovered_total": e.recovered_total,
            "recovered_average": e.recovered_average,
            "death_new": e.death_new,
            "death_total": e.death_total,
            "death_average": e.death_average,
          }
        })}))
        dispatch(sortWithLevel());
        dispatch(disableLoadingScreen());
        setShowResetData(true);
      })
      .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
      });
  }

  const resetData = () => {
    dispatch(resetAllLevel());
    setShowResetData(false);
  }

  const downloadFile = () => {
    const currentTime = new Date().getTime();
    const fileName = `EpidemicAnalyse_${currentTime}.xlsx`;
    // Tạo workbook mới
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet format
    const worksheet = XLSX.utils.json_to_sheet(EpidemicData.map(e=>{
      return {
        province_id: e.province_id,
        province_name: e.province_name,
        pandemic_id: pandemicData[pandemicSelect].pandemic_id,
        pandemic_name: pandemicData[pandemicSelect].pandemic_name,
        date: dateSelect,
        level: e.level
      }
    }));
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
        dispatch(enebleLoadingScreen());
        const data = await getEpidemicDataOfAllProvincesAPI(pandemicSelect, dateSelect);
        data.forEach(e=>{
          if(!e.level){
            e.level = 0;
          }
        })
        // console.log(data);
        const res = data.map(dt=>{
          const infectionLst = dt.infection.list;
          const recoveredLst = dt.recovered.list;
          const deathLst = dt.death.list;
          let infection_average = 0, recovered_average = 0, death_average = 0, 
          infection_new = 0, infection_total = 0, 
          recovered_new = 0, recovered_total = 0,
          death_new = 0, death_total = 0;
          
          if(infectionLst.length){
            infectionLst.forEach(e=>{
              infection_average += e.quantity_in_today;
            });
            infection_new = infectionLst[infectionLst.length-1].quantity_in_today;
            infection_total = infectionLst[infectionLst.length-1].total_quantity;
            infection_average = parseFloat((infection_average/(infectionLst.length)).toFixed(2));
          } else {
            infection_new = -1;
            infection_total = -1;
            infection_average = -1;
          }
          if(recoveredLst.length){
            recoveredLst.forEach(e=>{
              recovered_average += e.quantity_in_today;
            });
            recovered_new = recoveredLst[recoveredLst.length-1].quantity_in_today;
            recovered_total = recoveredLst[recoveredLst.length-1].total_quantity;
            recovered_average = parseFloat((recovered_average/(recoveredLst.length)).toFixed(2));
          } else {
            recovered_new = -1;
            recovered_total = -1;
            recovered_average = -1;
          }
          if(deathLst.length){
            deathLst.forEach(e=>{
              death_average += e.quantity_in_today;
            });
            death_new = deathLst[deathLst.length-1].quantity_in_today;
            death_total = deathLst[deathLst.length-1].total_quantity;
            death_average = parseFloat((death_average/(deathLst.length)).toFixed(2));
          } else {
            death_new = -1;
            death_total = -1;
            death_average = -1;
          }
          
          return {
            province_id: dt.province_id,
            province_name: province[dt.province_id-1],
            population: dt.population,
            population_density: dt.population_density,
            level: dt.level,
            infection_new: infection_new,
            infection_total: infection_total,
            infection_average: infection_average,
            recovered_new: recovered_new,
            recovered_total: recovered_total,
            recovered_average: recovered_average,
            death_new: death_new,
            death_total: death_total,
            death_average: death_average,
          }
        });
        console.log('res', res);
        dispatch(changeEpidemicDataAnalyse({data: res}));
        dispatch(disableLoadingScreen());
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pandemicSelect, dateSelect]);


  return (
    <MainFrame>
      <h1>Phân tích tình hình dịch bệnh</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="col-span-1">
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic}/>
          <MyDatePicker func={changeDate}/>
          <div className="w-full mt-4">
            <label className='text-lg flex items-center'>
              <input className='h-6 w-6' type="checkbox" checked={isShowWeight} onChange={changeIsShowWeight} />
              {/* <span className='ml-1'>Xem trọng số</span> */}
            </label>
          </div>
          <div className="mt-4 cursor-pointer" onClick={()=>{setShowTip(!showTip)}}>
            {showTip ? 
            <div className=" text-green-900">
              Việc đánh giá cấp độ dịch có thể tham khảo công thức sau: 
              <br />Giá trị đánh giá = α * (Hồi phục)/(Nhiễm * Tử vong * Mật độ dân số). 
              <br />Với α là hệ số do chuyên viên quyết định. 
              <br />Nếu Giá trị đánh giá &lt; 0.1 thì sẽ được coi là cấp độ 1 (An toàn)
              <br />Nếu 0.1 &lt; Giá trị đánh giá &lt; 0.15 thì sẽ được coi là cấp độ 2 (Chú ý)
              <br />Nếu Giá trị đánh giá &gt; 0.15 thì sẽ được coi là cấp độ 3 (Nguy hiểm)
            </div> : <div className="text-blue-500 underline">Xem gợi ý đánh giá</div>}
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          {/* <div className="btn btn-primary w-full" onClick={()=>{setShowWeightTable(true)}}>Thiết lập trọng số</div> */}
          {showWeightTable && <WeightTableEpidemic data={weight} func={closeDialog}/>}
          {!showResetData ? 
            <div className="btn btn-primary w-full mt-4" onClick={Clust}>Phân cụm</div>
            :
            <div className="btn btn-success w-full mt-4" onClick={resetData}>Reset dữ liệu</div>
          }
          <div className="btn btn-success w-full mt-4" onClick={downloadFile}>Download dữ liệu</div>
        </div>
      </div>

      <div className="mt-5">
        <EpidemicTable_New weightData={weight} isShowWeight={isShowWeight} />

      </div>
    </MainFrame>
  )
}

export default EpidemicAnalyse_New