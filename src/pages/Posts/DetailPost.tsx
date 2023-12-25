import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal, message } from "antd";

import {
  createNewComment,
  deleteCommentById,
  fetchCommentsByPostId,
  fetchPostById,
  fetchUsers,
  updateCommentById,
} from "../../utils/http";
import { CommentType, UserType } from "../../utils/type";
import LoadingScreen from "../../components/UI/LoadingScreen";
import PostArticle from "../../components/Post/PostArticle";
import CommentModal from "../../components/Comment/CommentModal";
import ListComment from "../../components/Comment/ListComment";

export default function DetailPostPage() {
  const { postId } = useParams();
  const [showModal, setShowModal] = useState<{
    status: boolean;
    data: CommentType | undefined;
  }>({
    status: false,
    data: undefined,
  });

  const handleOpenModal = (value?: CommentType | undefined) => {
    setShowModal({
      status: true,
      data: value,
    });
  };

  const handleCloseModal = () => {
    setShowModal({
      status: false,
      data: undefined,
    });
  };

  // Fetch Posts
  const { data: dataPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["posts", postId],
    queryFn: ({ signal }) => fetchPostById({ signal: signal, id: postId }),
  });

  // Fetch Users
  const { data: dataUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers({ signal: signal }),
  });

  // Fetch Comments
  const {
    data: dataComments,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", { postId: postId }],
    queryFn: ({ signal }) =>
      fetchCommentsByPostId({ signal: signal, id: postId }),
  });

  // Create New Comment
  const { mutate: mutateCreateComment, isPending: isPendingCreateComment } =
    useMutation({
      mutationFn: createNewComment,
      onSuccess: () => {
        message.success("Successfully create a comment");
      },
      onError: () => {
        message.error("Failed to create a comment");
      },
      onSettled: () => {
        refetchComments();
        handleCloseModal();
      },
    });

  // Edit Comment By Id
  const { mutate: mutateUpdateComment, isPending: isPendingUpdateComment } =
    useMutation({
      mutationFn: updateCommentById,
      onSuccess: () => {
        message.success("Successfully edit a comment");
      },
      onError: () => {
        message.error("Failed to edit a comment");
      },
      onSettled: () => {
        refetchComments();
        handleCloseModal();
      },
    });

  // Delete Comment By Id
  const { mutate: mutateDeleteComment, isPending: isPendingDeleteComment } =
    useMutation({
      mutationFn: deleteCommentById,
      onSuccess: () => {
        message.success("Successfully delete a comment");
      },
      onError: () => {
        message.error("Failed to delete a comment");
      },
      onSettled: () => {
        refetchComments();
        Modal.destroyAll();
      },
    });

  if (isLoadingPost || isLoadingUsers || isLoadingComments) {
    return <LoadingScreen />;
  }

  if (dataPost && dataUsers && dataComments) {
    const findUser = dataUsers.find(
      (user: UserType) => user.id === dataPost.userId
    );

    return (
      <>
        <PostArticle
          data={dataPost}
          user={findUser}
          comments={dataComments}
          onOpenModal={handleOpenModal}
        />
        <ListComment
          data={dataComments}
          onOpenModal={handleOpenModal}
          mutateDeleteComment={mutateDeleteComment}
          isPendingDeleteComment={isPendingDeleteComment}
        />
        <CommentModal
          key={showModal.data ? showModal.data.id : "new"}
          isOpen={showModal.status}
          data={showModal.data}
          onClose={handleCloseModal}
          isPending={isPendingCreateComment || isPendingUpdateComment}
          mutateCreateComment={mutateCreateComment}
          mutateUpdateComment={mutateUpdateComment}
        />
      </>
    );
  }
}
