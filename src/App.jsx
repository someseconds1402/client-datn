import React, {useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/login/Login'
import FadeIn from './components/effect/FadeIn';
import NotFoundPage from './components/notfoundpage/NotFoundPage';
import {PATH} from './constant/constant';
import SubscreenComponents from './components/subscreen/SubscreenComponents';
import { useSelector, useDispatch } from 'react-redux';
// import {changePandemicData} from './store/reducer/getPandemicDataSlice';
import { getPandemicDataAPI } from './service/userService';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const role = useSelector(state => state.changeRole.role);
  // const dispatch = useDispatch();

  useEffect(()=>{
    if(!localStorage.getItem('role')){
      localStorage.setItem('role', 2);
    }
    localStorage.setItem('menuItemOrder', 0);

    // async function getPandemicData() {
    //   const pandemicData = await getPandemicDataAPI();
    //   let pandemicDataStr = ''; 
    //   pandemicData.forEach(e=>{
    //     pandemicDataStr += e.pandemic_id + ':' + e.pandemic_name + '2018@4139,.abc/&xyz';
    //   })
    //   localStorage.setItem('pandemicData', pandemicDataStr);
    // }
    // getPandemicData();

    // localStorage.setItem('epidemicDisplay_selectedProvinceId', 1);
    // localStorage.setItem('suppliesDisplay_selectedProvinceId', 1);
  }, []);
  return (
    <React.StrictMode>
      <div className="root-page">
        <FadeIn>
          <Router>
            <Sidebar/>
            <Routes>
              <Route exact path={PATH.HOME} element={<Home role={role}/>}/>
              {/* <Route path={PATH.LOGIN} element={<Login/>}/> */}
              <Route path={PATH.ACCOUNT_MANAGE} element={<SubscreenComponents.ADMIN.AccManage/>}/>
              <Route path={PATH.DB_MODYFY} element={<SubscreenComponents.EXPERT.DbModify/>}/>
              <Route path={PATH.DISTRIBUTION_ANALYSE} element={<SubscreenComponents.EXPERT.DistributionAnalyse/>}/>
              <Route path={PATH.EPIDEMIC_ANALYSE} element={<SubscreenComponents.EXPERT.EpidemicAnalyse/>}/>
              <Route path={PATH.SUPPLIES_ANALYSE} element={<SubscreenComponents.EXPERT.SupplyAnalyse/>}/>
              <Route path={PATH.DISTRIBUTION_DISPLAY} element={<SubscreenComponents.GUEST.DistributionDisplay/>}/>
              <Route path={PATH.EPIDEMIC_DISPLAY} element={<SubscreenComponents.GUEST.EpidemicDisplay/>}/>
              <Route path={PATH.SUPPLIES_DISPLAY} element={<SubscreenComponents.GUEST.SuppliesDisplay/>}/>

              <Route path={PATH.NOT_FOUND} element={<NotFoundPage/>}/>
            
            </Routes>
          </Router>
        </FadeIn>
      </div>
    </React.StrictMode>

  );
}

export default App;
