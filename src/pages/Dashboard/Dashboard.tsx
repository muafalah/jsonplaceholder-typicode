import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Col, Empty, Flex, Row, Spin } from "antd";
import Search from "antd/es/input/Search";
import { SearchProps } from "antd/es/input";

import { fetchPosts, fetchUsers } from "../../utils/http";
import { PostType, UserType } from "../../utils/type";
import PostCard from "../../components/Post/PostCard";

export default function DashboardPage() {
  const [searchPost, setSearchPost] = useState<string>("");

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchPost(value);
  };

  // Fetch Posts
  const { data: dataPosts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["posts", { title: searchPost }],
    queryFn: ({ signal }) => fetchPosts({ signal: signal, title: searchPost }),
  });

  // Fetch Users
  const { data: dataUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers({ signal: signal }),
  });

  // Format Select User
  const listUser = useMemo(() => {
    return dataUsers?.map((item: UserType) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataUsers]);

  let content;

  if (isLoadingPosts || isLoadingUsers) {
    content = (
      <Flex
        align="center"
        justify="center"
        style={{
          minHeight: "50vh",
        }}
      >
        <Spin />
      </Flex>
    );
  }

  if (dataPosts?.length === 0) {
    content = (
      <Flex
        align="center"
        justify="center"
        style={{
          minHeight: "50vh",
        }}
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Flex>
    );
  }

  if (dataPosts?.length > 0 && listUser?.length) {
    content = (
      <Row
        gutter={[16, 16]}
        style={{
          marginTop: 24,
        }}
      >
        {dataPosts.map((post: PostType) => {
          const findUser = dataUsers.find(
            (user: UserType) => user.id === post.userId
          );
          return (
            <Col xs={24} md={12} xl={8} key={post.id}>
              <PostCard data={post} user={findUser} />
            </Col>
          );
        })}
      </Row>
    );
  }

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
      </Flex>
      <Search
        loading={isLoadingPosts}
        placeholder="Search post here..."
        onSearch={onSearch}
        enterButton
        size="large"
      />
      {content}
    </>
  );
}
