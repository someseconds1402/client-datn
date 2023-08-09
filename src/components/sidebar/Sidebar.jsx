import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logoutAction } from '../../store/reducer/changeRoleSlice';
import {sidebarMenu, role, PATH, SCREEN_PATH} from './../../constant/constant';
import Login from '../login/Login';

const MenuItem = (props) =>{
    let className = "no-underline flex items-center p-2 rounded-lg text-white hover:bg-gray-700 hover:cursor-pointer ";
    let addedClass = props.className;
    if(addedClass && addedClass == 'selected') {
        className += ' bg-gray-500';
    }
    return (
        <li className={className} onClick={props.func}>
            <h5 className="">{props.title}</h5>
        </li>
    )
}

const Sidebar = () => {
    if(!localStorage.getItem('role')){
      localStorage.setItem('role', 2);
      localStorage.setItem('menuItemOrder', 0);
    }
    const showLoadingScreen = useSelector((state) => state.showLoadingScreen.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rootRole = localStorage.getItem('role');
    const menuItemOrder = localStorage.getItem('menuItemOrder');
    const [itemOrder, setItemOrder] = useState(0);
    const [showLoginDialog, setShowLoginDialog] = useState(false);

    const logoutHandle = ()=>{
        dispatch(logoutAction());
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('role', role.GUEST);
        localStorage.setItem('email', '');
        navigate(PATH.HOME);
    }
    
    const loginHandle = ()=>{
        // navigate(PATH.LOGIN);
        setShowLoginDialog(true);
    }

    const closeDialog = ()=>{
        setShowLoginDialog(false);
    }

    useEffect(()=>{
        const pathname = window.location.pathname;
        SCREEN_PATH.forEach(paths => {
            const order = paths.indexOf(pathname);
            if(order>-1){
                setItemOrder(paths.indexOf(pathname));
                // console.log(pathname, paths.indexOf(pathname));
            } 
        })
    }, [window.location.pathname]);

    return (
        <div>
            {showLoginDialog && 
                <div>
                    <div className="absolute inset-0 h-full w-full bg-black opacity-80 z-50">
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                        <Login func={closeDialog}/>
                    </div>
                </div>
            }
            {showLoadingScreen && 
                <div className="absolute inset-0 h-full w-full bg-black opacity-80 flex items-center justify-center z-50">
                    <h1 className='absolute z-10 text-white'>Đang xử lý...</h1>
                </div>
            }
            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 relative">
                    <ul className="space-y-2 text-lg"> 
                        {
                            sidebarMenu[rootRole].map((e, index)=>
                                <MenuItem 
                                key={index}
                                className={sidebarMenu[rootRole].indexOf(e) == itemOrder ? "selected" : ""} 
                                title={e} func={()=>{
                                    const itemOrder = sidebarMenu[rootRole].indexOf(e);
                                    navigate(SCREEN_PATH[rootRole][itemOrder]);
                                }
                            }/>)
                        }
                    </ul>
                    <ul className="space-y-2 text-lg absolute bottom-9">
                        {
                            rootRole!=role.GUEST ? <MenuItem title="Đăng xuất" func={logoutHandle}/> : <MenuItem title="Đăng nhập" func={loginHandle}/>
                        }
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar