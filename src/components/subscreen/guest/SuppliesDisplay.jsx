import { useState, useEffect } from 'react';
import MainFrame from '../../mainframe/MainFrame'
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import { getSupplyQuantityAPI, getPandemicDataAPI } from '../../../service/userService'
import Dropdown from '../../dropdown/Dropdown';
import province from './../../../constant/province';
import { useDispatch } from 'react-redux';
import { enebleLoadingScreen, disableLoadingScreen } from '../../../store/reducer/showLoadingScreenSlice';

function SuppliesDisplay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [supplyQuantity, setSupplyQuantity] = useState([]);
  const [pandemicData, setPandemicData] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState(1);
  const [pandemicSelect, setPandemicSelect] = useState(0);
  const [displayOption, setDisplayOption] = useState([]);
  const [showAbility, setShowAbility] = useState(false);

  const getSupplyQuantityData = async (province_id, pandemic_id) => {
    dispatch(enebleLoadingScreen());
    const data = await getSupplyQuantityAPI(province_id, pandemic_id);
    setSupplyQuantity(data);
    dispatch(disableLoadingScreen());
    // console.log(data);
  }

  const changePandemic = (option)=>{
    const pandemic_id = pandemicData.find(e=>e.pandemic_name==option).pandemic_id;
    setPandemicSelect(pandemic_id)
  }

  const changeProvince = (option)=>{
    const province_id = province.indexOf(option) + 1;
    setProvinceSelect(province_id);
  }

  const drawTableData = ()=>{
    // console.log(supplyQuantity);
    if(supplyQuantity.length == 0){
      return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <td className="px-6 py-4 text-center" colSpan={3}><strong>Chưa có dữ liệu</strong></td>
        </tr>
      );
    }
    return (
      <tbody>
      {supplyQuantity.map((d, index) => {
        const display = displayOption.find((e) => e.id === d.supply_type_id);
        if (display && display.isCheck) {
          if (d.supply_quantity.length === 0 && display) {
            return (
              <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th className="px-6 py-4"></th>
                <td className="px-6 py-4">{d.supply_type_name}</td>
                <td className="px-6 py-4">Chưa có dữ liệu</td>
              </tr>
            );
          }
          return d.supply_quantity.map((e, subIndex) => (
            <tr key={`${index}-${subIndex}`} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th className="px-6 py-4">{e.supply_name}</th>
              <td className="px-6 py-4">{d.supply_type_name}</td>
              <td className="px-6 py-4">{e.quantity}</td>
            </tr>
          ));
        }
        return null;
      })}
    </tbody>
    )
  }

  const drawAbilityTableData = ()=>{
    const abilityLabel = ['Chưa có dữ liệu', 'Cần hỗ trợ', 'Tự cung ứng', 'Có thể hỗ trợ'];
    if(supplyQuantity.length == 0){
      return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <td className="px-6 py-4 text-center" colSpan={3}><strong>Chưa có dữ liệu</strong></td>
        </tr>
      );
    }
    return (
      <tbody>
      {supplyQuantity.map((d, index) => {
        const display = displayOption.find((e) => e.id === d.supply_type_id);
        if (display && display.isCheck) {
          return (
            <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th className="px-6 py-4">{d.supply_type_name}</th>
              <td className="px-6 py-4">{d.total_quantity == -1 ? 'Chưa có dữ liệu' : d.total_quantity}</td>
              <td className="px-6 py-4">{abilityLabel[d.ability]}</td>
            </tr>
          );
        }
        return null;
      })}
    </tbody>
    )
  }

  const drawDisplayOption = () => {
    const handleChangeCheckbox = (event, index) => {
      setDisplayOption((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index].isCheck = event.target.checked;
        return updatedOptions;
      });
    };
  
    return (
      <div className="w-full mt-4">
        {displayOption.map((option, index) => (
          <div className="text-lg flex items-center mb-3" key={index}>
            <input
              className="h-6 w-6"
              type="checkbox"
              checked={option.isCheck}
              onChange={(event) => handleChangeCheckbox(event, index)}
            />
            <span className="ml-1">{option.name}</span>
          </div>
        ))}
      </div>
    );
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
    getSupplyQuantityData(provinceSelect, pandemicSelect );
  }, [provinceSelect, pandemicSelect]);

  useEffect(()=>{
    setDisplayOption(supplyQuantity.map(e=>{
      return {
        id: e.supply_type_id,
        name: e.supply_type_name,
        isCheck: true,
      }
    }));

  }, [supplyQuantity]);

  return (
    <MainFrame>
      <h1>Tra cứu số liệu Vật tư y tế</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 mt-4 ">
          <Dropdown data={province} func={changeProvince} />
          <div className="mt-4"><Dropdown data={pandemicData.map(e=>e.pandemic_name)} func={changePandemic} /></div>
          {drawDisplayOption()}
          <div className="w-full mt-2">
            <hr />
            <label className='text-lg flex items-center mt-2'>
              <input className='h-6 w-6' type="checkbox" checked={showAbility} onChange={(e)=> {setShowAbility(e.target.checked)}} />
              <span className='ml-1'>Xem khả năng hỗ trợ VTYT</span>
            </label>
          </div>
        </div>
        <div className="col-span-3">
          
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-lg text-left">
            <thead className="text-lg uppercase dark:bg-gray-900 dark:text-white dark:border-gray-700 border-b">
              {showAbility ? 
                <tr>
                  <th className="px-6 py-3">Phân loại</th>
                  <th className="px-6 py-3">Số lượng</th>
                  <th className="px-6 py-3">Khả năng hỗ trợ VTYT</th>
                </tr> : <tr>
                  <th className="px-6 py-3">Tên</th>
                  <th className="px-6 py-3">Phân loại</th>
                  <th className="px-6 py-3">Số lượng</th>
                </tr>
              }
            </thead>
            {showAbility ? drawAbilityTableData() : drawTableData()}
          </table>
        </div>
        </div>
      </div>
    </MainFrame>
  )
}

export default SuppliesDisplay