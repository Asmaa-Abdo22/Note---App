import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../Atoms/AuthenticationAtom";
export default function SideBar() {
 const [token, setToken] = useRecoilState(authState)
  const navigate = useNavigate();
  function logOut() {
    setToken(null)
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <div
        className=" d-flex flex-column justify-align-content-end align-items-center p-4"
        style={{ backgroundColor: " #7469B6" }}
      >
        <div className="imgsize">
          <img
            src={require("../../images/5807265.webp")}
            alt="note icon"
            className="w-100 "
          />
        </div>

        <ul className="mt-4 p-3">
          <li>
            <Link
              style={{ color: "#FFE5E5" }}
              // to={"/login"}
              className="logOutlink"
              onClick={logOut}
            >
              {" "}
              LogOut
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
