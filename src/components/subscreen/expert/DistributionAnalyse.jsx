import MainFrame from '../../mainframe/MainFrame'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';

function DistributionAnalyse() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('role') != 1){
      navigate(PATH.HOME);
    }
  })
  return (
    <MainFrame>
      <h1>DistributionAnalyse</h1>
    </MainFrame>
  )
}

export default DistributionAnalyse