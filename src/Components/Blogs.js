import React from "react";
import { Logincontext } from "../Context/Logincontext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Back from "./Back";
import { Link } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { BiBookReader } from "react-icons/bi";
import { BlogIdcontext } from "../Context/BlogIdcontext";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

function Blogs() {
  const navigate = useNavigate();
  const [showMoreMap, setShowMoreMap] = useState({});
  const [myBlogs, setBlogs] = useState([]);
  const [show, setShow] = useState(false);
  const { setBlogId } = useContext(BlogIdcontext);
  const { userInfo } = useContext(Logincontext);

  if (userInfo) {
    localStorage.setItem("username", userInfo.username);
  }
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .post("http://localhost:5555/getMyblogs", { username: username })
      .then((res) => {
        const fetchedMyBlogs = res.data.data.blogs;
        setBlogs(fetchedMyBlogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleShowMore = (blogId) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [blogId]: !prevShowMoreMap[blogId],
    }));
  };

  const removePTags = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const formatDate = (originalDate) => {
    const dateObject = new Date(originalDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const GetBlogId = (BlogId) => {
    setBlogId(BlogId);
    navigate("/Bloginfo", { replace: true });
  };

  const handleDelete = (BlogId) => {
    setShow((prevsetShow) => (prevsetShow === BlogId ? null : BlogId));
    setTimeout(() => {
      axios.delete(`http://localhost:5555/delete/${BlogId}`);
      setShow(false);
      window.location.reload();
    }, 8000);
  };

  return (
    <>
      <div className="container">
        <div className="custom-shape-divider-top-1705863480">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="blog-item">
        <h3 style={{ color: "#2AAA8A", fontFamily: "Noto Serif" }}>
        <IoIosList size={40} />
            &nbsp;My Blogs List
          </h3>
          <div className="row">
            {myBlogs.map((blogItem) => (
              <div
                key={blogItem._id}
                className="col-md-4"
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="card mb-4 mt-4"
                  style={{
                    boxShadow: "0 0 10px 0 #2AAA8A",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    style={{ height: "200px", objectFit: "cover" }}
                    src={`http://localhost:5555/${blogItem?.imagePath}`}
                    className="card-img-top"
                    alt="blog"
                  />
                  <div className="card-body">
                    <h4
                      style={{
                        color: "#2AAA8A",
                        fontFamily: "Noto Serif",
                        height: "3rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className="card-title"
                    >
                      {blogItem?.title}
                    </h4>
                    <p
                      className="card-text mt-3"
                      style={{ textAlign: "justify" }}
                    >
                      {showMoreMap[blogItem._id]
                        ? removePTags(blogItem.content)
                        : removePTags(blogItem.content).slice(0, 100)}
                      {!showMoreMap[blogItem._id] &&
                        removePTags(blogItem.content).length > 100 && (
                          <span>
                            <Link
                              style={{
                                color: "#2AAA8A",
                                fontWeight: "600",
                              }}
                              onClick={() => toggleShowMore(blogItem._id)}
                            >
                              See More
                            </Link>
                          </span>
                        )}
                      {showMoreMap[blogItem._id] && (
                        <span>
                          <Link
                            style={{
                              color: "#2AAA8A",
                              fontWeight: "600",
                            }}
                            onClick={() => toggleShowMore(blogItem._id)}
                          >
                            Show Less
                          </Link>
                        </span>
                      )}
                    </p>
                    <p>
                      Created by:-{blogItem?.username}
                      &nbsp;&nbsp;&nbsp;Created date:-
                      {formatDate(blogItem?.date)}
                    </p>
                    <div className="d-flex gap-2">
                      <Button
                        onClick={() => GetBlogId(blogItem._id)}
                        style={{
                          backgroundColor: "#2AAA8A",
                          borderColor: "#2AAA8A",
                        }}
                        className="mb-3"
                      >
                        <BiBookReader />
                        &nbsp;More Info
                      </Button>
                      <Button
                        onClick={() => handleDelete(blogItem._id)}
                        style={{
                          backgroundColor: "#2AAA8A",
                          borderColor: "#2AAA8A",
                        }}
                        className="mb-3"
                      >
                        <MdDeleteOutline />
                        &nbsp;Delete
                      </Button>
                    </div>
                    {show === blogItem._id && (
                      <div
                        className="spinner-border  mb-4"
                        role="status"
                        style={{
                          color: "#2AAA8A",
                        }}
                      >
                      <span className="sr-only">Deleting...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Back />
    </>
  );
}
export default Blogs;
