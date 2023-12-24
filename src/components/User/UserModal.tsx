import { Button, Modal } from "antd";

import { UserType } from "../../utils/type";
import UserForm from "./UserForm";

interface UserModalProps {
  isOpen: boolean;
  data: UserType | undefined;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, data, onClose }) => {
  return (
    <Modal
      open={isOpen}
      title="Detail User"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} danger>
          Close
        </Button>,
      ]}
    >
      <UserForm data={data} />
    </Modal>
  );
};

export default UserModal;
