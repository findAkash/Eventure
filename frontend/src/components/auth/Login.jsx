import { useState } from 'react';
import { loginFields } from '../../constants/formFields';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';
import { Auth } from '../../api/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../utils/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const { loginSetup } = useAuth();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    Auth.Login(loginState.email, loginState.password)
      .then((res) => {
        if (res.success) {
          loginSetup(res.accessToken, res.refreshToken, res.user); // Pass user data here
          toast.success('Login Successful');
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <FormExtra />
        <FormAction handleSubmit={handleSubmit} text="Login" />
      </form>
      <ToastContainer />
    </>
  );
}
