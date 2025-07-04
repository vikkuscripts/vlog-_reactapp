import { createContext, useReducer } from "react";

export const PostList = createContext({
  PostList: [],
  addPost: () => {},
  deletePost: () => {},
});
const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }else if (action.type === "ADD_POST") {
    newPostList =[ action.payload, ...currPostList,];}
  return newPostList;
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going t Mumbai",
    body: " Hi Freinds I am going to Mumbai for vacations.Hope to enjoy a lot .Peace out",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "mumbai", "fun"],
  },
  {
    id: "2",
    title: "pass",
    body: " 4 sal2,ki masti ke bad bhi pas ",
    reactions: 15,
    userId: "user-12",
    tags: ["graduate", "fun", "college"],
  },
];
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
   dispatchPostList({
      type: "ADD_POST",
      payload:{
        id: Date.now(),
        title:  postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,


      }
   });
  }
 
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };
  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );

}

export default PostListProvider;
