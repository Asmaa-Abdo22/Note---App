import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { noteState } from "../../Atoms/NoteAtom";
import Note from "../Note/Note";
import { authState } from "../../Atoms/AuthenticationAtom";

const mySchema = yup.object({
  title: yup.string().required("Title is required "),
  content: yup.string().required(" Content is required"),
});
export default function Home() {
 
  const [noteLength, setNoteLength] = useRecoilState(noteState);
  const [allNotes, setAllNotes] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let noteData = {
    title: "",
    content: "",
  };
  const myFormik = useFormik({
    initialValues: noteData,
    validationSchema: mySchema,
    onSubmit: addNote,
  });
  // &--------------ADD Note --------------
  async function addNote(values) {
    console.log(values);
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
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
        getUserNotes();
        function clearform(values) {
          values.title = "";
          values.content = "";
        }
        clearform(values);
      })
      .catch((error) => {
        console.log(error);
        toast.error("no", {
          duration: 2000,
          position: "top-center",
          style: { marginTop: "50px", backgroundColor: "red", color: "white" },
        });
      })
      .finally(() => {
        handleClose();
      });
  }
  // &-----------Get User Notes ---------
  async function getUserNotes() {
    await axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setAllNotes(res.data.notes);
        setNoteLength(res.data.notes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserNotes();
  }, []);

  return (
    <>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10 p-5 px-lg-5 px-2 py-5 position-relative">
            <div className="row g-1">
              {allNotes.map((note) => (
                <Note key={note._id} note={note} getUserNotes={getUserNotes} />
              ))}
            </div>
            <div className="position-absolute top-0 end-1 ">
              <button
                variant="primary"
                onClick={handleShow}
                className="btn text-white"
                style={{ backgroundColor: " #FC4100" }}
              >
                <i className="fa-solid fa-plus me-2"></i>
                Add Note
              </button>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton style={{ backgroundColor: " #392467" }}>
                <Modal.Title>Add Note</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: " #392467" }}>
                <form>
                  <input
                    value={myFormik.values.title}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                    type="text"
                    name="title"
                    id="title"
                    className="form-control mb-3"
                    placeholder="Note Title"
                  />
                  {myFormik.errors.title && myFormik.touched.title ? (
                    <div className="alert alert-danger">
                      {myFormik.errors.title}
                    </div>
                  ) : (
                    ""
                  )}
                  <textarea
                    value={myFormik.values.content}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                    name="content"
                    id="content"
                    className="form-control mb-3"
                    placeholder="Note Content"
                  ></textarea>
                  {myFormik.errors.content && myFormik.touched.content ? (
                    <div className="alert alert-danger">
                      {myFormik.errors.content}
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: " #392467" }}>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={myFormik.handleSubmit}
                  style={{ backgroundColor: " #FC4100" }}
                >
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
