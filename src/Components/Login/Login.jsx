import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as yup from "yup";
import { authState } from "../../Atoms/AuthenticationAtom";
const mySchema = yup.object({
  email: yup
    .string()
    .email("Enter A Valid Email")
    .required("Email is required "),
  password: yup.string().required(" Password is required"),
});
export default function Login() {
 const [mytoken, setToken]=  useRecoilState(authState)
  const navigate = useNavigate();
  let userData = {
    email: "",
    password: "",
  };
  async function logIn(values) {
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token)
        console.log(localStorage.getItem("token"));
        toast.success(response.data.msg, {
          duration: 2000,
          position: "top-center",
          style: {
            marginTop: "50px",
            backgroundColor: "green",
            color: "white",
          },
        });
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.msg, {
          duration: 2000,
          position: "top-center",
          style: { marginTop: "50px", backgroundColor: "red", color: "white" },
        });
      });
  }
  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: logIn,
    validationSchema: mySchema,
  });
  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-4">
            <img
              src={require("../../images/login-Photoroom (1).png")}
              alt="register logo"
              className="w-100"
            />
          </div>
          <div className="col-md-8">
            <div className="p-3 text-center w-75 m-auto">
              <h2 className="mb-4">Log In Now </h2>
              <form onSubmit={myFormik.handleSubmit}>
                <div className="email">
                  <input
                    onBlur={myFormik.handleBlur}
                    onChange={myFormik.handleChange}
                    value={myFormik.values.email}
                    type="email"
                    id="email"
                    className="form-control mb-2"
                    placeholder="Enter Your Email"
                  />
                  {myFormik.errors.email && myFormik.touched.email ? (
                    <div className="alert alert-danger">
                      {myFormik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="password">
                  <input
                    value={myFormik.values.password}
                    onBlur={myFormik.handleBlur}
                    onChange={myFormik.handleChange}
                    type="password"
                    id="password"
                    placeholder="Enter Your Password"
                    className="form-control my-2"
                  />
                  {myFormik.errors.password && myFormik.touched.password ? (
                    <div className="alert alert-danger">
                      {myFormik.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <button
                  type="submit"
                  className="  btn w-100 text-white my-3"
                  style={{ backgroundColor: " #756AB6" }}
                >
                  Log In{" "}
                </button>
                <p>
                  Don't Have Account ?{" "}
                  <Link style={{ color: " #FFE5E5" }} to={"/register"}>
                    Register{" "}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
