import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { FaMailBulk } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [formData, setFormData] = useState({});
  const navigate=useNavigate()
  function onChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, formData.email);
      toast.info("Check your email inbox")
      navigate('/signin')
    } catch (error) {
      toast.error('Unknown Email')
    }
  };
  return (
    <div className="sign-in p-6 h-screen">
      <h2 className="text-center text-violet-700 head-title	mb-20	">
        Welcome to House Marketplace
      </h2>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="my-8 flex items-center">
            <FaMailBulk className="icon text-warning" />
            <input
              type="email"
              placeholder="Email"
              className="form-control rounded-full placeholder:text-slate-400 border-0 px-16 py-3"
              id="email"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="buttons flex gap-3 flex-col items-center ">
            <button className="btn btn-success hover:bg-green-700 px-32 text-white">
              Send reset link
            </button>
            <Link
              className=" text-green-500	 hover:text-green-700 text-lg font-bold self-end"
              to="/signin"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
