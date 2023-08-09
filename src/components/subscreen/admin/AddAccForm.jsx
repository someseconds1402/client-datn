import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PATH } from '../../../constant/constant';
import { addUser } from '../../../service/userService';

function AddAccForm() {
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [showEror, setShowEror] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const checkValidInput = () => {
        if(!email || !password){
            setErrorMsg('Email/password không được bỏ trống.');
            setShowEror(true);
            return false;
        }
        if(!email.endsWith("@gmail.com")){
            setErrorMsg('Email phải có định dạng email@gmail.com.');
            setShowEror(true);
            return false;
        }
        if(password.length < 6){
            setErrorMsg('Password phải chứa ít nhất 6 ký tự');
            setShowEror(true);
            return false;
        }

        // Kiểm tra account và password có chứa ký tự hợp lệ hay không
        const validCharsRegex = /^[a-zA-Z0-9.@_]+$/;
        const isAccountValid = validCharsRegex.test(email);
        const isPasswordValid = validCharsRegex.test(password);

        if (isAccountValid && isPasswordValid) {
            // Xử lý logic khi cả hai input hợp lệ
            setShowEror(false);
            // console.log('Dữ liệu hợp lệ');
            return true;
        } else {
            // Xử lý logic khi có ít nhất một input không hợp lệ
            setErrorMsg('Username và mật khẩu chỉ được chứa các chữ cái, số, dấu @._');
            setShowEror(true);
            return false;
        }
    }

    const handleAddAccount = async () => {
        // Xử lý logic khi thêm tài khoản vào danh sách
        const check = checkValidInput();

        if(check){
            // console.log(email, password);
            const data = await addUser(email, password);
            // console.log(data);
            if(data.errorCode == 0){
                alert("Thêm tài khoản thành công!")
                navigate(PATH.HOME);
            } else {
                setErrorMsg('Tài khoản đã tồn tại!');
                setShowEror(true);
            }
        }
    };

    const handleCancel = () => {
        // Hủy bỏ thêm tài khoản, ẩn form
        setEmail('');
        setPassword('');
        setShowForm(false);
        setShowEror(false);
    };

    return (
        <div>
        {showForm && (
            <div className="shadow-md sm:rounded-lg border p-8">
                <h3>Thêm tài khoản</h3>
                <div className="mt-2">
                    <input
                        type="email"
                        placeholder="Tài khoản"
                        className="shadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 h-10 w-80"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <input
                        type="text"
                        placeholder="Mật khẩu"
                        className="shadow-md sm:rounded-lg border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 h-10 w-80"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {showEror && <div className="mt-2 text-red-500">{errorMsg}</div>}
                <button className='btn btn-primary mt-4 mr-3 w-40' onClick={handleAddAccount}>Xác nhận</button>
                <button className='btn btn-danger mt-4 w-40' onClick={handleCancel}>Hủy bỏ</button>
            </div>
        )}

        {/* Icon dấu + */}
        {!showForm && 
            <FontAwesomeIcon 
                icon={faPlus}
                style={{ padding: '5px', width: '30px', height: '30px'}}
                onClick={() => setShowForm(true)}
                className='btn btn-primary'
                />
        }
        
        </div>
    );
}

export default AddAccForm;
