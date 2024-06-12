import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { noteState } from "../../Atoms/NoteAtom";
import { authState } from "../../Atoms/AuthenticationAtom";

export default function Layout() {
  const [noteLength, setNoteLength] = useRecoilState(noteState);
  const [mytoken, setToken] = useRecoilState(authState);
  return (
    <>
      {mytoken ? (
        <div
          className="d-flex p-2 fixed-top w-100  "
          style={{ backgroundColor: " #756AB6" }}
        >
          <div className="logo logofont ms-4"> Notes </div>
          <div className="title m-auto">Number Of Notes : {noteLength}</div>
        </div>
      ) : (
        ""
      )}
      <Outlet />
    </>
  );
}
