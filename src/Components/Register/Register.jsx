import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
const mySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, " Enter at least 3 characters")
    .max(20, "Name must be less than 20 char"),
  email: yup
    .string()
    .email("Enter A Valid Email")
    .required("Email is required "),
  phone: yup.string().required("Egyptian Phone Is Required "),
  password: yup.string().required(" Password is required"),
  age: yup
    .number()
    .required("Your Age is required")
    .min(10, " min age is 10")
    .max(80, " max age is 80"),
});
export default function Register() {
  const navigate = useNavigate()
  let userData = {
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  };
  async function mySubmit(values) {
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .then((response) => {
        console.log(response);
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
          navigate("/login")
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
    onSubmit: mySubmit,
    validationSchema: mySchema,
  });
  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-4">
            <img
              src={require("../../images/register.png")}
              alt="register logo"
              className="w-100"
            />
          </div>
          <div className="col-md-8">
            <div className="p-3 text-center w-75 m-auto">
              <h2 className="mb-4">Sign Up Now </h2>
              <form onSubmit={myFormik.handleSubmit}>
                <div className="name">
                  <input
                    onBlur={myFormik.handleBlur}
                    onChange={myFormik.handleChange}
                    value={myFormik.values.name}
                    type="text"
                    id="name"
                    className="form-control mb-2"
                    placeholder="Enter Your Name"
                  />
                  {myFormik.errors.name && myFormik.touched.name ? (
                    <div className="alert alert-danger">
                      {myFormik.errors.name}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
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
                <div className="age">
                  <input
                    onBlur={myFormik.handleBlur}
                    onChange={myFormik.handleChange}
                    value={myFormik.values.age}
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Enter Your Age"
                    className="form-control my-2"
                  />
                  {myFormik.errors.age && myFormik.touched.age ? (
                    <div className="alert alert-danger">
                      {myFormik.errors.age}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="phone">
                  <input
                    onBlur={myFormik.handleBlur}
                    onChange={myFormik.handleChange}
                    value={myFormik.values.phone}
                    type="text"
                    id="phone"
                    placeholder="Enter Your Phone"
                    className="form-control mt-2"
                  />
                  {myFormik.errors.phone && myFormik.touched.phone ? (
                    <div className="alert alert-danger">
                      {myFormik.errors.phone}
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
                  Sign Up{" "}
                </button>
                <p>
                  Already Have Account ?{" "}
                  <Link style={{ color: " #FFE5E5" }} to={"/login"}>
                    Log In{" "}
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
