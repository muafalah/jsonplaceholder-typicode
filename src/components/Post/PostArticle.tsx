import { Avatar, Button, Card, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { CommentOutlined } from "@ant-design/icons";

import { CommentType, PostType, UserType } from "../../utils/type";

interface PostArticleProps {
  data: PostType;
  user: UserType;
  comments: CommentType[];
  onOpenModal: () => void;
}

const PostArticle: React.FC<PostArticleProps> = ({
  data,
  user,
  comments,
  onOpenModal,
}) => {
  return (
    <>
      <Title level={1} style={{ fontWeight: 600, margin: 0 }}>
        {data.title}
      </Title>
      <div
        style={{
          margin: "24px 0",
        }}
      >
        <hr />
        <Flex
          align="center"
          gap={24}
          style={{ padding: "4px 8px" }}
          wrap="wrap"
        >
          <Card.Meta
            avatar={
              <Avatar
                style={{
                  backgroundColor: "gray",
                  verticalAlign: "middle",
                  marginRight: 12,
                }}
                size="small"
              >
                {user.name.charAt(0)}
              </Avatar>
            }
            title={user.name}
            style={{
              display: "flex",
              fontSize: 16,
              fontWeight: 500,
              alignItems: "center",
            }}
          />
          <Flex gap="middle" justify="center" align="center">
            <CommentOutlined style={{ fontSize: "22px" }} />
            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {comments.length} Comments
            </span>
          </Flex>
          <Button type="default" onClick={() => onOpenModal()}>
            Add Comment
          </Button>
        </Flex>
        <hr />
      </div>
      <article>{data.body}</article>
    </>
  );
};

export default PostArticle;
