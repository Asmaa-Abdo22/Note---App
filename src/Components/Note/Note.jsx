import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { Slide } from "react-awesome-reveal";
const mySchema = yup.object({
  title: yup.string().required("Title is required "),
  content: yup.string().required(" Content is required"),
});
export default function Note({ note, getUserNotes }) {
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
    onSubmit: updateNote,
  });
  // &-----------Update Note ---------
  async function updateNote(values) {
    await axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("token")}`,
          },
        }
      )
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
  // &-----------Delete Note ---------
  async function deleteNote() {
    await axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        toast.success("Deleted Sussessfully", {
          duration: 2000,
          position: "top-center",
          style: {
            marginTop: "50px",
            backgroundColor: "green",
            color: "white",
          },
        });
        getUserNotes();
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
  return (
    <>
      <div className="col-md-4 ">
        <Slide>
          <div className="p-3">
            <Card style={{ backgroundColor: "#ffe5e5" }}>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <Button
                  className="bg-warning"
                  variant="primary"
                  onClick={handleShow}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Button>
                <Button className="ms-3 bg-danger" onClick={deleteNote}>
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </Card.Body>
            </Card>
            {/* ---------Modal-------------  */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton style={{ backgroundColor: " #392467" }}>
                <Modal.Title>Update Note</Modal.Title>
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
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Slide>
      </div>
    </>
  );
}
