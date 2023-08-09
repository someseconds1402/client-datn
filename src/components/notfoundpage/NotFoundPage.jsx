import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constant/constant';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="text-center h-screen w-screen pt-32">
      <h1>TRANG WEB KHÔNG TỒN TẠI!!!!!</h1>
      <h2 className='mt-4'>Quay lại <a className=' no-underline cursor-pointer' onClick={e=>navigate(PATH.HOME)}>Trang chủ</a></h2>
    </div>
  )
}

export default NotFoundPage