/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";

import { useRouter } from "expo-router";
import { Comment, Post } from "@/types";
import { axios } from "@/lib/axios.config";
import { postId } from "@/lib/atoms";
import { useRecoilState } from "recoil";
import { View } from "@/components/View";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "@/components/Text";

export default function usePosts() {
  const toast = useToast();
  const router = useRouter();
  const [creatingPost, setCreatingPost] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const [gettingPosts, setGettingPosts] = useState(false);
  const [availablePosts, setAvailablePosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [gettingComments, setGettingComments] = useState(false);
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<Post[]>("/posts", async (url: string) => {
    const { data } = await axios.get(url);
    return data.posts;
  });
  const [post_id, setPostId] = useRecoilState(postId);
  //Creating the post
  const createPost = async (
    post: { title: string; body: string; userId: number },
    redirect?: boolean
  ) => {
    setCreatingPost(true);
    try {
      const { data } = await axios.post("/posts", post);
      console.log(data);

      if (data) {
        toast.show("Post created successfully", {
          type: "success",
        });
        mutate([...(posts || []), data.post]);
        if (redirect) {
          router.push(`(tabs)/explore`);
        }
      } else {
        toast.show("An error occurred", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setCreatingPost(false);
    }
  };
  // get all posts and loading them
  const getCreatedPosts = async () => {
    setGettingPosts(true);
    try {
      const { data } = await axios.get("/posts");

      if (data) {
        setAvailablePosts(data);
      } else {
        toast.show("An error occurred", {
          type: "danger",
          
        });
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setGettingPosts(false);
    }
  };
  // get comments on a given post using the post Id
  const getComments = async (postId: number) => {
    setGettingComments(true);
    try {
      const { data } = await axios.get(`/posts/${postId}/comments`);
      if (data) {
        setComments(data);
      } else {
        toast.show("An error occurred", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setGettingComments(false);
    }
  };
  useEffect(() => {
    getCreatedPosts();
    getComments(post_id);
  }, []);
// Deleting the post using the post Id
  const deletePost = async (id: number, redirect?: boolean) => {
    setDeletingPost(true);
    try {
      const { data } = await axios.delete(`/posts/${id}`);
      console.log(data);

      if (data) {
        toast.show("Post deleted successfully", {
          type: "success",
        });

        mutate();
        if (redirect) {
          router.push(`(tabs)/posts`);
        }
      } else {
        toast.show("An error occurred", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setDeletingPost(false);
    }
  };

  return {
    posts,
    isLoading,
    error,
    deletePost,
    createPost,
    creatingPost,
    deletingPost,
    availablePosts,
    gettingPosts,
    getComments,
    comments,
    gettingComments,
  };
}
