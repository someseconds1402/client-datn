import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getPandemicDataAPI, getSupplyQuantityOfAllProvincesAPI, getSupplyAbilityAPI, getDistributionDataAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province'
import { enebleLoadingScreen, disableLoadingScreen } from '../../../store/reducer/showLoadingScreenSlice';
import { useDispatch } from 'react-redux';
import Map from './map/Map';

function DistributionDisplay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pandemicData, setPandemicData] = useState([]);
  const [provinceSelect1, setProvinceSelect1] = useState(-1);
  const [provinceSelect2, setProvinceSelect2] = useState(-1);
  const [pandemicSelect, setPandemicSelect] = useState(0);
  const [supplyType, setSupplyType] = useState([{id: -1, name: 'Chưa có dữ liệu'}]);
  const [supplyTypeSelect, setSupplyTypeSelect] = useState(-1);

  const [provinceList1, setProvinceList1] = useState([{
      province_id: -1,
      province_name: 'Chưa có dữ liệu',
      supply_quantity: 0,
  }]);

  const [provinceList2, setProvinceList2] = useState([{
    province_id: -1,
    province_name: 'Chưa có dữ liệu',
    supply_quantity: 0,
  }]);

  const [tableData, setTableData] = useState({});
  const [firstClick, setFirstClick] = useState(false);
  const [showPath, setShowPath] = useState(false);

  const changePandemic = (option)=>{
    setPandemicSelect(pandemicData.find(e=>e.pandemic_name==option).pandemic_id);
  }

  const changeProvince1 = (option)=>{
    const province_id = province.indexOf(option)+1;
    setProvinceSelect1(province_id);
  }

  const changeProvince2 = (option)=>{
    const province_id = province.indexOf(option)+1;
    setProvinceSelect2(province_id);
  }

  const changeSupplyType = (option) => {
    setSupplyTypeSelect(supplyType.find(e=>e.name==option).id);
  }

  const distribute = async () => {
    if(!firstClick){
      setFirstClick(true);
    }
    dispatch(enebleLoadingScreen());
    const result = await getDistributionDataAPI(provinceSelect2, provinceSelect1);
    let tableData = {
      receive: province[provinceSelect1-1],
      support: province[provinceSelect2-1],
      supply_quantity: ((provinceList2.find(e=>e.province_id==provinceSelect2).supply_quantity)/10).toFixed(),
      distance: result.distance,
      path: result.path.map(e=>{
        return {
          start: province[e.start-1],
          end: province[e.end-1],
          distance: e.distance
        }
      })
    };
    setTableData(tableData);
    dispatch(disableLoadingScreen());
    console.log(tableData);
  }

  useEffect(() => {
    if(localStorage.getItem('role') != 2){
      navigate(PATH.HOME);
    }
    const fetchData = async () => {
      try {
        dispatch(enebleLoadingScreen());
        const pandemicDataSrevice = await getPandemicDataAPI();
        setPandemicData(pandemicDataSrevice);
        dispatch(disableLoadingScreen());
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSupplyQuantityOfAllProvincesAPI(pandemicSelect);
        // console.log(data);
        if(data.listSupplyType.length > 0){
          setSupplyType(data.listSupplyType);
          setSupplyTypeSelect(data.listSupplyType[0].id);
        } else {
          setSupplyTypeSelect(-1);
          setSupplyType([{id: -1, name: 'Chưa có dữ liệu'}]);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pandemicSelect]);

  useEffect(() => {
    const nullData = [{
      province_id: -1,
      province_name: 'Chưa có dữ liệu',
      supply_quantity: 0,
    }];

    if(supplyTypeSelect != -1){
      const fetchData = async () => {
        try {
          dispatch(enebleLoadingScreen());
          const data = await getSupplyAbilityAPI(pandemicSelect, supplyTypeSelect);
          // console.log(1, data);
          let province1 = [], province2 = [];
          data.forEach(e=>{
            if(e.ability==1){
              province1.push({
                province_id: e.province_id,
                province_name: province[e.province_id-1],
                supply_quantity: e.supply_quantity
              });
            } else if(e.ability==3){
              province2.push({
                province_id: e.province_id,
                province_name: province[e.province_id-1],
                supply_quantity: e.supply_quantity
              });
            }
          })
          setProvinceList1(province1.length ? province1 : nullData);
          setProvinceList2(province2.length ? province2 : nullData);
          dispatch(disableLoadingScreen());
          // console.log(province1, province2);
          
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {
      setProvinceList1(nullData);
      setProvinceList2(nullData);
    }
  }, [supplyTypeSelect]);

  useEffect(()=>{
    setProvinceSelect1(provinceList1[0].province_id);
    setProvinceSelect2(provinceList2[0].province_id);
  }, [provinceList1, provinceList2]);

  return (
    <MainFrame>
      <h1>Tra cứu đề xuất phân bổ VTYT</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 ">
          <Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} />
          <div className="mt-3"><strong>Loại vật tư y tế</strong></div>
          <div ><Dropdown data={supplyType.map(e=>e.name)} func={changeSupplyType}/></div>
          
        </div>
      </div>
      {supplyTypeSelect != -1 && 
      <div className="grid grid-cols-4 mt-5 border-t-2 border-gray-500 rounded-lg">
        <div className="col-span-1 mt-3">
          <div className='receive-list'>
            <div className=""><strong>Tỉnh thành nhận</strong></div>
            <Dropdown data={provinceList1.map(e=>e.province_name)} func={changeProvince1} />
          </div>
          <div className='support-list mt-3'>
            <div className=""><strong>Tỉnh thành hỗ trợ</strong></div>
            <Dropdown data={provinceList2.map(e=>e.province_name)} func={changeProvince2} />
          </div>
          <div className={"btn btn-primary w-full mt-4 "+
            (provinceSelect1==-1 || provinceSelect2==-1 ?'disabled':'')} onClick={distribute}>Tra cứu</div>
        </div>
        { (provinceSelect1!=-1 || provinceSelect2!=-1) && firstClick &&
          <div className="col-span-3 mt-3 ml-5">
            <div className="mx-3"><strong>Thông tin chi tiết</strong></div>
            <div className="grid grid-cols-3">
              <div className='col-span-1 ml-5 pl-2 h-14 flex items-center border shadow-xl rounded-l-lg bg-gray-700 text-white'>
                <strong>Tỉnh thành hỗ trợ</strong></div>
              <div className='col-span-2 pl-3 h-14 flex items-center border shadow-xl rounded-r-lg bg-white'><strong>{tableData.support}</strong></div>

              <div className='col-span-1 ml-5 pl-2 h-14 flex items-center border shadow-xl rounded-l-lg bg-gray-700 text-white'>
                <strong>Tỉnh thành nhận</strong></div>
              <div className='col-span-2 pl-3 h-14 flex items-center border shadow-xl rounded-r-lg bg-white'><strong>{tableData.receive}</strong></div>

              <div className='col-span-1 ml-5 pl-2 h-14 flex items-center border shadow-xl rounded-l-lg bg-gray-700 text-white'>
                <strong>Số lượng VTYT hỗ trợ</strong></div>
              <div className='col-span-2 pl-3 h-14 flex items-center border shadow-xl rounded-r-lg bg-white'><strong>{tableData.supply_quantity}</strong></div>

              <div className='col-span-1 ml-5 pl-2 h-18 flex items-center border shadow-xl rounded-l-lg bg-gray-700 text-white'>
                <strong>Quãng đường</strong></div>
              <div className='col-span-2 pl-3 h-min-18 flex items-center border shadow-xl rounded-b-lg rounded-r-lg bg-white'>
                <div className='mt-2'>
                  <strong>{tableData.distance} km</strong> (Tính theo lộ trình đường bộ)
                  {!showPath ? 
                    <p className="text-blue-500 underline cursor-pointer pl-1"onClick={()=>{setShowPath(true)}} ><strong>Xem lộ trình</strong></p>:
                    <div>
                      <p className="text-blue-500 underline cursor-pointer pl-1 mt-2"onClick={()=>{setShowPath(false)}} ><strong>Ẩn</strong></p>
                      {tableData.path.map((e, index)=>{
                        return <p className='pl-3'>{index}. {e.start} -&gt; {e.end} : <strong>{e.distance}</strong>km</p>
                      })}
                    </div>
                  }
                </div>

              </div>
            </div>
          </div>
        }
      </div>}
    </MainFrame>
  )
}

export default DistributionDisplay