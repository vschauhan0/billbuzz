import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { handleLogin } = useAuth(); // from AuthContext


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/loginuser", form);
      handleLogin(res.data.email, res.data.authToken);
      alert("Loged in sucessfully")
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
      console.log(err);
    }
  };

  return (
    <>
      <div className="shadow-2xl rounded-4xl items-center h-[60vh] w-[30vw] relative left-[37vw] top-[12vh] overflow-hidden">
        <div>
          <h1 className="text-3xl font-bold pl-28 pt-8">Account Details :</h1>
        </div>
        <div className="mt-5">
          <form action="" onSubmit={handleSubmit}>
            <div className="pl-10 pr-10 pt-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter your Email :
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div className=" pl-10 pr-10 pt-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter your password :
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
              <span className="text-sm text-blue-700 left-10">
                Forget password?
              </span>
            </div>
            <div className="pl-30 pr-10 pt-10">
              <button type="submit" className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 ">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Log In
                </span>
              </button>

              <button className=" relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 ">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Create Acount
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
