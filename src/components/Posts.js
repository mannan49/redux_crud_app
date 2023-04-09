import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));
  const [id, setId] = useState(null);
  const [textBody, setTextBody] = useState("");

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);

  // function
  const handleFetchData = (event) => {
    event.preventDefault();
    // console.log(id);
    if (!id) {
      window.alert("Please Provide User Id");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };
  //delete handler
  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
    window.alert("Post Deleted");
  };

  return (
    <>
      <div className="m-0">
        <div className="row mt-4 d-flex align-item-center justify-content-center">
          <div className="col-md-8">
            <h1 className="text-center mt-5" id='redux_crud_app'>REDUX CRUD APP</h1>
            <form action="">
              <div className="mb-3">
                <label htmlFor="numberID" id="label_style" className="form-label">
                  Search By ID{' '}: 
                </label>
                <input
                  type="number"
                  name="numberID"
                  id="numberID"
                  className="form-control"
                  value={id}
                  onChange={(event) => setId(event.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleFetchData}
              >
                Fetch Post
              </button>
              <button
                type="button"
                className="btn btn-warning ms-4"
                onClick={() => navigate("/createpost")}
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {post.length > 0 && (
                <div className="card mt-4 mx-auto w-sm-100 w-md-50 w-lg-50">
                  <div className="card-body">
                    <h5 className="card-title"> {post[0].title} </h5>
                    {edit ? (
                      <>
                        <textarea
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                          className="form-control"
                          placeholder="Add Description"
                          id="floatingTextarea"
                          defaultValue={""}
                        />
                        <div className="d-flex align-items-end justify-content-end">
                          <button
                            className="btn btn-info mt-3"
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              );
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger ms-4 mt-3"
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text"> {post[0].body} </p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-4"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
