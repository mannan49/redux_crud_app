import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [showPost, setShowPost] = useState(false);

  const [values, setValues] = useState({ title: "", body: "" });
  // Destructing the object of values
  const { title, body } = values;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  // function of handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };
  // function of showing the recent created Post

  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-4 mx-auto w-sm-100 w-md-50 w-lg-50">
            <div className="card-body">
              <h5 className="card-title"> {post[0].title} </h5>
              <p className="card-text"> {post[0].body} </p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="row mt-4 d-flex align-item-center justify-content-center">
      <h1 className="text-center  mt-5">Create Post</h1>
      <form className="col-md-8">
        <div className="mb-3">
          <label htmlFor="input_title" id="label_style" className="form-label">
            Enter Post Title:
          </label>
          <input
            type="text"
            name="input_title"
            id="input_title"
            className="form-control"
            placeholder="Your Title"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </div>
        <div className="form-floating">
          <textarea
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            className="form-control"
            placeholder="Add Description"
            id="floatingTextarea"
            defaultValue={""}
          />
          <label htmlFor="floatingTextarea">Add Description</label>
        </div>
        <div className="d-flex mt-3 align-items-end justify-content-end">
          <button className="btn btn-info" onClick={() => navigate("/")}>
            Go Home
          </button>
          <button
            type="sumbit"
            className="btn btn-danger ms-4"
            onClick={handleSubmit}
          >
            Done
          </button>
        </div>
      </form>
      <div className="mt-4">
        {
          showPost && <div> {showCreatedPost()} </div>
        }
      </div>
    </div>
  );
};

export default CreatePost;
