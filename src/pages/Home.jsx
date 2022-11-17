import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner/Spinner";
import {
  useDeletBlogMutation,
  useGetBlogsQuery,
} from "../redux/services/bglogsApi";

export const Home = () => {
  const { data, isLoading } = useGetBlogsQuery();
  const [deletBlog] = useDeletBlogMutation();

  if (isLoading) {
    return <Spinner />;
  }
  const excert = (str, count) => {
    if (str.length > count) {
      str = str.substring(0, count) + "...";
    }
    return str;
  };
  const deleteBlogs = async (id) => {
    await deletBlog(id);
  };
  return (
    <>
      <div>
        {data?.map((item) => (
          <>
            <div key={item.id}>
              <img src={item.imgUrl} alt="" />
              <h1> {item.title} </h1>
              <p> {excert(item.description, 80)} </p>
              <div style={{ display: "flex" }}>
                <h2
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteBlogs(item.id)}
                >
                  Удалить
                </h2>
                <Link to={`/update/${item.id}`}>
                  <h2
                    style={{
                      cursor: "pointer",
                      marginLeft: "20px",
                      color: "black",
                    }}
                  >
                    Изменить
                  </h2>
                </Link>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </>
  );
};
