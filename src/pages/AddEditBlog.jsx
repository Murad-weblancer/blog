import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./all.scss";
import { storage } from "../firebase";
import {
  useAddBlogsMutation,
  useGetBlogQuery,
  useUpDateBlogMutation,
} from "../redux/services/bglogsApi";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
const initialState = {
  title: "",
  description: "",
};

export const AddEditBlog = () => {
  const [data, setData] = useState(initialState);
  const { title, description } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const [addBlogs] = useAddBlogsMutation();
  const { id } = useParams();
  const { data: blog } = useGetBlogQuery(id ? id : skipToken);
  const [upDateBlog] = useUpDateBlogMutation();
  useEffect(() => {
    if (id && blog) {
      setData({ ...blog });
    }
  }, [id, blog]);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("is paused");
              break;
            case "running":
              console.log("is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // toast.info("Image upload succesfully")
            setData((prev) => ({ ...prev, imgUrl: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && file) {
      if (!id) {
        await addBlogs(data);
        navigate("/");
        alert('Created')
      } else {
        await upDateBlog({id, data});
        navigate("/");
        alert('Updated')
      }
    }
    else if (!title) {
      alert("title empty");
    } else if (!description) {
      alert("tex is empty");
    }else if (!file){
      alert('File empty')
    }
  };
  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h3> Создать </h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Заголовок"
          className="create-title"
        />
        <textarea
          cols="30"
          rows="10"
          value={description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="Описание"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          placeholder="Choose File"
        />
        <div>
          <button>
            Подтвердить
          </button>
        </div>
      </form>
    </div>
  );
};
