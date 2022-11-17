import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    addBlogs: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...data,
            timeTemp: serverTimestamp(),
          });
          return { data: "ok" };
        } catch (error) {
          return { err: error };
        }
      },
      invalidatesTags: ["Blog"],
    }),
    getBlogs: builder.query({
      async queryFn() {
        try {
          const blogRef = collection(db, "blogs");
          const querySnapshot = await getDocs(blogRef);
          let blogs = [];
          querySnapshot?.forEach((doc) => {
            blogs.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: blogs };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Blog"],
    }),
    deletBlog: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "blogs", id));
          return { data: "ok" };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Blog"],
    }),
    getBlog: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "blogs", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Blog"],
    }),
    upDateBlog: builder.mutation({
      async queryFn({id, data}) {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...data,
            timeTemp:serverTimestamp()
          });
          return {data:'ok'}
        } catch (error) {
          return {error:error}
        }
        
      },
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useAddBlogsMutation,
  useDeletBlogMutation,
  useGetBlogQuery,
  useUpDateBlogMutation
} = blogsApi;
