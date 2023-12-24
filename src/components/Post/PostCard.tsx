import { useNavigate } from "react-router-dom";
import { PostType, UserType } from "../../utils/type";
import { Avatar, Card } from "antd";

interface PostCardProps {
  data: PostType;
  user: UserType;
}

const PostCard: React.FC<PostCardProps> = ({ data, user }) => {
  const navigate = useNavigate();

  return (
    <Card
      key={data.id}
      title={data.title}
      bordered
      style={{
        cursor: "pointer",
      }}
      onClick={() => navigate(`/posts/${data.id}`)}
    >
      {data.body.substring(0, 100)}...
      <Card.Meta
        avatar={
          <Avatar
            style={{
              backgroundColor: "gray",
              verticalAlign: "middle",
            }}
            size="large"
          >
            {user.name.charAt(0)}
          </Avatar>
        }
        title={user.name}
        description={user.email}
        style={{
          marginTop: 24,
          display: "flex",
          alignItems: "center",
        }}
      />
    </Card>
  );
};

export default PostCard;
