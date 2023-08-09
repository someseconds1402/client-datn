import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import MainFrame from '../../mainframe/MainFrame'
import ImportFrame from './importfile/ImportFrame'

function DbModify() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('role') != 1){
      navigate(PATH.HOME);
    }
  })
  return (
    <MainFrame>
      <h1>Thêm dữ liệu vào hệ thống</h1>
      <ImportFrame/>
    </MainFrame>
  )
}

export default DbModify