import { useState } from 'react';
import { signupFields } from '../../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { Auth } from '../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };

  // Handle Signup API Integration here
  const createAccount = () => {
    Auth.Signup(signupState)
      .then((res) => {
        if (res.success) {
          toast.success('Signup Successful');
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        // console.log(err);
      });
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
