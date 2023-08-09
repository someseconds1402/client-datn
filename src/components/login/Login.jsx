import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/reducer/changeRoleSlice';
import FadeIn from '../effect/FadeIn'
import './Login.css'
import { Form } from 'react-bootstrap';
import { handleLoginAPI } from '../../service/userService';
import { loginCondition, PATH, role, SCREEN_PATH } from '../../constant/constant';


export default function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    // event.preventDefault();
    setErrorMsg('');
    if(email && password){
      const data = await handleLoginAPI(email, password);
      // console.log(data);
      // console.log({email, password});
      if(data.loginCondition == loginCondition.EMAIL_NOT_EXIST){
        setErrorMsg("Email không tồn tại.");
      } else if(data.loginCondition == loginCondition.FAILED_PASSWORD){
        setErrorMsg("Mật khẩu không chính xác.");
      } else {
        dispatch(loginAction({roleId: data.roleId, email}));
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', data.roleId);
        localStorage.setItem('email', email);
        localStorage.setItem('menuItemOrder', 0);
        props.func();
        navigate(PATH.HOME);
      }
    }else {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin đăng nhập.')
    }
  }

  const handleEnterKeyPress = (event)=>{
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  }

  return (
    <div className="main-frame shadow text-center pt-5 h-2/3 level-count-container absolute z-10">
      <FadeIn>

        <span className="lead text-9xl mt-12">ĐĂNG NHẬP</span>

        <Form className=" mt-12">
          <Form.Group className="grid grid-cols-4 mr-8" controlId="email">
            <div className="col-span-1"><Form.Label >Email</Form.Label></div>
            <div className="col-span-3">
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={handleEmailChange} />
            </div>
          </Form.Group>

          <Form.Group className="grid grid-cols-4 mr-8 mt-4" controlId="password">
            <div className="col-span-1"><Form.Label>Mật Khẩu</Form.Label></div>
            <div className="col-span-3">
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={handlePasswordChange} 
                onKeyPress={handleEnterKeyPress} />
            </div>
          </Form.Group>
          <div className='text-center mt-3 text-danger'>{errorMsg}</div>
          <div className="grid grid-cols-2">
            <div className="col-span-1 mt-3 ml-14 login btn btn-primary" onClick={handleLogin}>
              Đăng Nhập
            </div>
            <div className="col-span-1 mt-3 ml-4 login btn btn-danger" onClick={props.func}>
              Thoát
            </div>
          </div>
        </Form>

        <div className="mt-4 text-right text-xs mr-8"><a href="http://">Quên mật khẩu?</a></div>
      </FadeIn>
    </div>

  )
}
