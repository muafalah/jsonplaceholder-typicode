import { useState } from "react";
import { Button, Flex } from "antd";

import { PostType } from "../../utils/type";
import SelectUser from "../../components/UI/SelectUser";
import PostTable from "../../components/Post/PostTable";

export default function PostsPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [showModal, setShowModal] = useState<{
    status: boolean;
    data: PostType | undefined;
  }>({
    status: false,
    data: undefined,
  });

  const handleSelectUser = (value: number) => {
    setSelectedUserId(value);
  };

  const handleOpenModal = (value?: PostType | undefined) => {
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

  return (
    <>
      <Flex
        wrap="wrap"
        gap="middle"
        align="center"
        justify="space-between"
        style={{ marginBottom: 24 }}
      >
        <h1 style={{ fontWeight: 600, margin: 0 }}>List Post</h1>
        <Flex wrap="wrap" gap="middle">
          <Button type="primary" onClick={() => handleOpenModal()}>
            Create New Post
          </Button>
          <SelectUser onSelectUser={handleSelectUser} />
        </Flex>
      </Flex>
      <PostTable
        isModalOpen={showModal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        selectedUserId={selectedUserId}
      />
    </>
  );
}
