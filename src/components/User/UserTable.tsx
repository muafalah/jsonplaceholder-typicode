import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";

import { UserType } from "../../utils/type";
import { fetchUsers } from "../../utils/http";
import LoadingScreen from "../UI/LoadingScreen";
import UserModal from "./UserModal";

const UserTable = () => {
  const [showModal, setShowModal] = useState<{
    status: boolean;
    data: UserType | undefined;
  }>({
    status: false,
    data: undefined,
  });

  // Fetch Users
  const { data: dataUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers({ signal: signal }),
  });

  const handleOpenModal = (value?: UserType | undefined) => {
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

  if (isLoadingUsers) {
    return <LoadingScreen />;
  }

  if (dataUsers) {
    const columns: ColumnsType<UserType> = [
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        render: (text) => {
          const phoneNumber = text.split(" ");
          return phoneNumber[0];
        },
      },
      {
        title: "Website",
        dataIndex: "website",
        render: (text) => (
          <Link to={`https://${text}`} target="_blank">
            {text}
          </Link>
        ),
      },
      {
        title: "Action",
        width: 100,
        render: (record) => {
          return (
            <Button type="primary" onClick={() => handleOpenModal(record)}>
              Detail
            </Button>
          );
        },
      },
    ];

    return (
      <>
        <div
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          <Table
            rowKey="id"
            columns={columns}
            dataSource={dataUsers}
            bordered
          />
        </div>
        <UserModal
          isOpen={showModal.status}
          data={showModal.data}
          onClose={handleCloseModal}
        />
      </>
    );
  }
};

export default UserTable;
