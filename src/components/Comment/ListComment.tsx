import { Space } from "antd";
import { UseMutateFunction } from "@tanstack/react-query";

import { CommentType } from "../../utils/type";
import CommentCard from "./CommentCard";

interface ListCommentProps {
  data: CommentType[];
  onOpenModal: (value: CommentType) => void;
  mutateDeleteComment: UseMutateFunction<unknown, Error, number | undefined>;
  isPendingDeleteComment: boolean;
}

const ListComment: React.FC<ListCommentProps> = ({
  data,
  onOpenModal,
  mutateDeleteComment,
  isPendingDeleteComment,
}) => {
  return (
    <div>
      <h3
        style={{
          fontWeight: 500,
          marginTop: 24,
        }}
      >
        Comments:
      </h3>
      <Space direction="vertical" style={{ width: "100%" }}>
        {data.map((comment: CommentType) => (
          <CommentCard
            key={comment.id}
            data={comment}
            onOpenModal={onOpenModal}
            mutateDeleteComment={mutateDeleteComment}
            isPendingDeleteComment={isPendingDeleteComment}
          />
        ))}
      </Space>
    </div>
  );
};

export default ListComment;
