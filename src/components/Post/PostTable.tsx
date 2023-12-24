import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Flex, Modal, message } from "antd";
import Table, { ColumnsType } from "antd/es/table";

import { PostType, UserType } from "../../utils/type";
import {
  createNewPost,
  deletePostById,
  fetchPosts,
  fetchUsers,
  updatePostById,
} from "../../utils/http";
import LoadingScreen from "../UI/LoadingScreen";
import PostModal, { modalDeletePost } from "./PostModal";

interface PostTableProps {
  isModalOpen: { status: boolean; data: PostType | undefined };
  onOpenModal: (value?: PostType | undefined) => void;
  onCloseModal: () => void;
  selectedUserId: number | undefined;
}

const PostTable: React.FC<PostTableProps> = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
  selectedUserId,
}) => {
  const navigate = useNavigate();

  // Fetch Posts
  const {
    data: dataPosts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts", { userId: selectedUserId }],
    queryFn: ({ signal }) =>
      fetchPosts({ signal: signal, userId: selectedUserId }),
  });

  // Fetch Users
  const { data: dataUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers({ signal: signal }),
  });

  // Create New Post
  const { mutate: mutateCreatePost, isPending: isPendingCreatePost } =
    useMutation({
      mutationFn: createNewPost,
      onSuccess: () => {
        message.success("Successfully create a post");
      },
      onError: () => {
        message.error("Failed to create a post");
      },
      onSettled: () => {
        refetchPosts();
        onCloseModal();
      },
    });

  // Update Post by Id
  const { mutate: mutateUpdatePost, isPending: isPendingUpdatePost } =
    useMutation({
      mutationFn: updatePostById,
      onSuccess: () => {
        message.success("Successfully update a post");
      },
      onError: () => {
        message.error("Failed to update a post");
      },
      onSettled: () => {
        refetchPosts();
        onCloseModal();
      },
    });

  // Delete Post by Id
  const { mutate: mutateDeletePost, isPending: isPendingDeletePost } =
    useMutation({
      mutationFn: deletePostById,
      onSuccess: () => {
        message.success("Successfully delete a post");
      },
      onError: () => {
        message.error("Failed to delete a post");
      },
      onSettled: () => {
        refetchPosts();
        Modal.destroyAll();
      },
    });

  // Format Select User
  const listUser = useMemo(() => {
    return dataUsers?.map((item: UserType) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataUsers]);

  if (isLoadingPosts || isLoadingUsers) {
    return <LoadingScreen />;
  }

  if (dataPosts && listUser) {
    const columns: ColumnsType<PostType> = [
      {
        title: "Title",
        dataIndex: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
      },
      {
        title: "User",
        dataIndex: "userId",
        width: 250,
        render: (text) => {
          const findUser = dataUsers.find((user: UserType) => user.id === text);
          return findUser ? findUser.name : "Unknown User";
        },
      },
      {
        title: "Action",
        width: 250,
        render: (record) => {
          const handleDeletePost = () => {
            mutateDeletePost(record.id);
          };

          return (
            <Flex gap="small">
              <Button onClick={() => navigate(`${record.id}`)}>Detail</Button>
              <Button type="primary" onClick={() => onOpenModal(record)}>
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={() =>
                  modalDeletePost(handleDeletePost, isPendingDeletePost)
                }
              >
                Remove
              </Button>
            </Flex>
          );
        },
      },
    ];

    return (
      <>
        {/* Table Post */}
        <div
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          <Table
            rowKey="id"
            loading={isFetchingPosts}
            columns={columns}
            dataSource={dataPosts}
            bordered
          />
        </div>
        {/* Modal Create & Edit Post */}
        <PostModal
          key={isModalOpen.data ? isModalOpen.data.id : "new"}
          isOpen={isModalOpen.status}
          data={isModalOpen.data}
          users={listUser}
          onClose={onCloseModal}
          isPending={isPendingCreatePost || isPendingUpdatePost}
          mutateCreatePost={mutateCreatePost}
          mutateUpdatePost={mutateUpdatePost}
        />
      </>
    );
  }
};

export default PostTable;
