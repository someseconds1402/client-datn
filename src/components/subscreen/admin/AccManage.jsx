import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constant/constant';
import MainFrame from '../../mainframe/MainFrame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllEmail, deleteUser } from '../../../service/userService';
import AddAccForm from './AddAccForm';

function AccManage() {
    const navigate = useNavigate();
    const [allEmail, setAllEmail] = useState([]);
  // localStorage.setItem('allEmail', JSON.stringify([]));
  // const listEmail = JSON.parse(localStorage.getItem('allEmail'));
  const [inputSearch, setInputSearch] = useState('');
  const [displayEmailList, setDisplayEmailList] = useState(allEmail);

  // console.log(displayEmailList);

  const filterEmail = (event) => {
    console.log(displayEmailList);
    const inputValue = event.target.value;
    setInputSearch(event.target.value);
    const filterList = allEmail.filter(e=>e.email.includes(inputValue));
    setDisplayEmailList(filterList);
  }

  const handleDeleteEmail = (order)=>{
    const selectedEmail = allEmail.find(e=>e.order == order);
    const confirmCheck = window.confirm("Xóa email " + selectedEmail.email + " ?");
    // console.log(order);
    if(confirmCheck){
      const data = deleteUser(selectedEmail.email);
      if(data.errorCode == 1){
        alert(" Tài khoản không còn tồn tại trong hệ thống.\nCó quản trị viên khác đã xóa tài khoản đó.")
      } else {
        navigate(PATH.HOME);
      }
    }
  }

  useEffect(() => {
    if(localStorage.getItem('role') != 0){
      // localStorage.setItem('role', 2);
      navigate(PATH.HOME);
    }
    // localStorage.setItem('menuItemOrder', 0);
    const fetchData = async () => {
      try {
        const allEmailService = await getAllEmail(localStorage.getItem('email'));
        setAllEmail(allEmailService);
        setDisplayEmailList(allEmailService)
        // localStorage.setItem('allEmail', JSON.stringify(allEmail));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <MainFrame>
      <h1>Quản lý tài khoản</h1>
      <div className="grid grid-cols-1 gap-4 mt-5">
        <div className="col-span-1">
          <input
            type="text"
            value={inputSearch}
            className="border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full h-14"
            placeholder="Tìm kiếm"
            onChange={filterEmail}
          />
        </div>
      </div>
      <div className="mt-4">
        <AddAccForm/>
      </div>
      <div className="">
        <h3 className="shadow-md sm:rounded-lg mt-10">Danh sách tài khoản</h3>
        <div className="shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-lg text-left">
            <tbody>
              {displayEmailList.map(e=>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th className="px-6 py-4 ">
                    {e.email}
                  </th>
                  <td className="px-6 py-4">
                    <button onClick={()=>handleDeleteEmail(e.order)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </MainFrame>
      
  )
}

export default AccManage