import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getPandemicDataAPI, getSupplyQuantityOfAllProvincesAPI, clusterAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from '../../../constant/province'
import { useSelector, useDispatch } from 'react-redux';
import { changeSupplyDataAnalyse, sortWithAbility, resetAllAbility } from '../../../store/reducer/supplyDataAnalyseSlice';
import { enebleLoadingScreen, disableLoadingScreen } from '../../../store/reducer/showLoadingScreenSlice';

// Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import SupplyTable_New from './supplytable/SupplyTable_New';
// import S_SMC_FCM from '../../../logic/sSMC_FCM';
import WeightTableSupply from './supplytable/WeightTableSupply';

function SupplyAnalyse_New() {
  const navigate = useNavigate();
  const SupplyData = useSelector((state) => state.supplyDataAnalyse.data);
  const dispatch = useDispatch();

  const [superData, setSuperData] = useState([]);
  const [pandemicData, setPandemicData] = useState([]);
  
  const [pandemicSelect, setPandemicSelect] = useState(0);

  const [showWeightTable, setShowWeightTable] = useState(false);
  const [showResetData, setShowResetData] = useState(false);
  const [weight, setWeight] = useState([0.1,0.1,0.1,0.1]);
  const [isShowWeight, setIsShowWeight] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const [supplyType, setSupplyType] = useState([{id: -1, name: 'Chưa có dữ liệu'}]);
  const [supplyTypeSelect, setSupplyTypeSelect] = useState(-1);

  const [weightList, setWeightList] = useState({
    // supply_quatity: 1,
    supply_quatity_per_person: 1,
    population: 1,
    population_density: 1,
    level: 1,
  });

  const weightLabel = [
    // 'supply_quatity',
    'supply_quatity_per_person',
    'population',
    'population_density',
    'level',
  ]

  const changePandemic = (option) => {
    setPandemicSelect(pandemicData.find(e=>e.pandemic_name==option).pandemic_id);
  }

  const changeSupplyType = (option) => {
    setSupplyTypeSelect(supplyType.find(e=>e.name==option).id);
  }

  const changeIsShowWeight = (event) => {
    setIsShowWeight(event.target.checked);
  }

  const closeDialog = (data)=>{
    // console.log(data);
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
    // console.log(SupplyData);
    let U = SupplyData.map(e=>{
      return {
        province_id: e.province_id,
        province_name: e.province_name,
        population: (e.population)/1000000,
        population_density: e.population_density,
        level: e.level,
        supply_name: e.supply_name,
        supply_quantity: e.supply_quantity,
        supply_quatity_per_person: e.supply_quatity_per_person,
        ability: e.ability,
      }
    });
    const C = [1, 2, 3]; // Danh sách các nhãn cần phân cụm
    
    const tagField = 'ability'; // Trường dữ liệu chứa nhãn
    
    const keys = ['province_name', 'province_id', 'supply_name', 'supply_quantity']; // Các trường dữ liệu không tham gia vào việc phân cụm
    
    dispatch(enebleLoadingScreen());
    clusterAPI(U, C, tagField, keys, weightList)
      .then(data => {
        // console.log(data);
        dispatch(changeSupplyDataAnalyse({data: data.map(e=>{
          return {
            province_id: e.province_id,
            province_name: e.province_name,
            population: (e.population)*1000000,
            population_density: e.population_density,
            level: e.level,
            supply_name: e.supply_name,
            supply_quantity: e.supply_quantity,
            supply_quatity_per_person: e.supply_quatity_per_person,
            ability: e.cluster_label,
          }
        })}))
        dispatch(sortWithAbility())
        dispatch(disableLoadingScreen());
        setShowResetData(true);
      })
      .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
      });
  }

  const resetData = () => {
    dispatch(resetAllAbility());
    setShowResetData(false);
  }

  const downloadFile = () => {
    const currentTime = new Date().getTime();
    const fileName = `SupplyAnalyse_${currentTime}.xlsx`;
    // Tạo workbook mới
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet format
    console.log(SupplyData);
    const worksheet = XLSX.utils.json_to_sheet(SupplyData.map(e=>{
      return {
        pandemic_id: pandemicSelect,
        pandemic_name: pandemicData.find(m=>m.pandemic_id==pandemicSelect).pandemic_name,
        province_id: e.province_id,
        province_name: e.province_name,
        supply_type_id: supplyTypeSelect,
        supply_name: e.supply_name,
        supply_quantity: e.supply_quantity,
        ability: e.ability,
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
        const data = await getSupplyQuantityOfAllProvincesAPI(pandemicSelect);
        console.log(data, pandemicData);
        setSupplyTypeSelect(-1);
        setSupplyType(data.listSupplyType.length > 0 ? 
          data.listSupplyType : [{id: -1, name: 'Chưa có dữ liệu'}]);

        data.data.forEach(e=>{
          if(!e.ability){
            e.ability = 0;
          }
        })
        setSuperData(data.data);
        
        dispatch(disableLoadingScreen());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pandemicSelect]);

  useEffect(()=>{
    setSupplyTypeSelect(supplyType[0].id);
  }, [supplyType])

  useEffect(()=>{
    // console.log(superData);
    const data = superData.map(dt=>{
      let supply_name = '', supply_quantity = 0, supply_quatity_per_person = 0;
      if(supplyTypeSelect != -1 && dt.data.length > 0){
        const findItem = dt.data.find(e=>e.supply_type_id==supplyTypeSelect);
        supply_name = findItem.supply_type_name;
        supply_quantity = findItem.supply_quantity;
        supply_quatity_per_person = parseFloat((supply_quantity/dt.population).toFixed(2));
      }
      return {
        province_id: dt.province_id,
        province_name: province[dt.province_id-1],
        population: dt.population,
        population_density: dt.population_density,
        level: dt.level,
        ability: dt.ability,
        supply_name: supply_name,
        supply_quantity: supply_quantity,
        supply_quatity_per_person: supply_quatity_per_person,
      }
    });
    // console.log(data);
    dispatch(changeSupplyDataAnalyse({data: data}));
  }, [superData, supplyTypeSelect])

  return (
    <MainFrame>
      <h1>Phân tích khả năng hỗ trợ VTYT</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="col-span-1">
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic}/>
          <div className="mt-4"><Dropdown data={supplyType.map(e=>e.name)} func={changeSupplyType}/></div>
          <div className="w-full mt-4">
            <label className='text-lg flex items-center'>
              <input className='h-6 w-6' type="checkbox" checked={isShowWeight} onChange={changeIsShowWeight} />
              <span className='ml-1'>Xem trọng số</span>
            </label>
          </div>
          <div className="mt-4 cursor-pointer" onClick={()=>{setShowTip(!showTip)}}>
            {showTip ? 
            <div className=" text-green-900">
              Với các loại vật tư y tế như vắc xin hoặc kit test, 
              việc đánh giá khả năng hỗ trợ VTYT có thể tham khảo công thức sau: 
              <br />Giá trị đánh giá = α * (Số lượng VTYT /người)/(Mật độ dân cư * Cấp độ dịch). 
              <br />Với α là hệ số do chuyên viên quyết định. 
              <br />Một tỉnh thành phố được đánh giá là tự cung ứng nếu 0.1 &lt; Giá trị đánh giá &lt; 0.15
              <br />Nếu nhỏ hơn 0.1 sẽ được coi là cần hỗ trợ VTYT, nếu lớn hơn 0.15 sẽ được coi là có thể hỗ trợ VTYT tới các tỉnh thành khác.
            </div> : <div className="text-blue-500 underline">Xem gợi ý đánh giá</div>}
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <div className={"btn btn-primary w-full "+(supplyTypeSelect==-1?'disabled':'')} onClick={()=>{setShowWeightTable(true)}}>Thiết lập trọng số</div>
          {showWeightTable && <WeightTableSupply data={weight} supplyTypeSelect={supplyType.find(e=>e.id==supplyTypeSelect).name} func={closeDialog} />}
          {!showResetData ?
            <div className={"btn btn-primary w-full mt-4 "+(supplyTypeSelect==-1?'disabled':'')} onClick={Clust}>Phân cụm</div>
            :
            <div className="btn btn-success w-full mt-4" onClick={resetData}>Reset dữ liệu</div>
          }
          <div className="btn btn-success w-full mt-4" onClick={downloadFile}>Download dữ liệu</div>
        </div>
      </div>
      {supplyTypeSelect!=-1 && <div className="mt-5">
        <SupplyTable_New weightData={weight} isShowWeight={isShowWeight} />
      </div>}
      
    </MainFrame>
  )
}

export default SupplyAnalyse_New