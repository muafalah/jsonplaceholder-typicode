import { Button, Card, Dropdown, MenuProps } from "antd";
import { CommentType } from "../../utils/type";
import { modalDeleteComment } from "./CommentModal";
import { UseMutateFunction } from "@tanstack/react-query";

interface CommentCardProps {
  data: CommentType;
  onOpenModal: (value: CommentType) => void;
  mutateDeleteComment: UseMutateFunction<unknown, Error, number | undefined>;
  isPendingDeleteComment: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({
  data,
  onOpenModal,
  mutateDeleteComment,
  isPendingDeleteComment,
}) => {
  const handleDeleteComment = () => {
    mutateDeleteComment(data.id);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ cursor: "pointer" }} onClick={() => onOpenModal(data)}>
          Edit
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          style={{ cursor: "pointer", color: "red" }}
          onClick={() =>
            modalDeleteComment(handleDeleteComment, isPendingDeleteComment)
          }
        >
          Delete
        </span>
      ),
    },
  ];

  return (
    <Card
      key={data.id}
      title={data.name}
      extra={
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button>More</Button>
        </Dropdown>
      }
    >
      {data.body}
    </Card>
  );
};

export default CommentCard;
