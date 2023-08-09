import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { role, SCREEN_PATH } from '../constant/constant'

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    let role = localStorage.getItem('role');
    role = role? role:2;
    navigate(SCREEN_PATH[role][0]);
  });

  return (
    <></>
  )
}

export default Home;
