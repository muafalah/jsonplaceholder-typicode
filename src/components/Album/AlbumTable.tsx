import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";

import { AlbumType, UserType } from "../../utils/type";
import { fetchAlbums, fetchUsers } from "../../utils/http";
import LoadingScreen from "../UI/LoadingScreen";

interface AlbumTableProps {
  selectedUserId: number | undefined;
}

const AlbumTable: React.FC<AlbumTableProps> = ({ selectedUserId }) => {
  const navigate = useNavigate();

  // Fetch Albums
  const { data: dataAlbums, isLoading: isLoadingAlbums } = useQuery({
    queryKey: ["albums", { userId: selectedUserId }],
    queryFn: ({ signal }) =>
      fetchAlbums({ signal: signal, userId: selectedUserId }),
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

  if (isLoadingAlbums || isLoadingUsers) {
    return <LoadingScreen />;
  }

  if (dataAlbums && listUser) {
    const columns: ColumnsType<AlbumType> = [
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
        width: 140,
        render: (record) => {
          return (
            <Button type="primary" onClick={() => navigate(`${record.id}`)}>
              See Photos
            </Button>
          );
        },
      },
    ];

    return (
      <div
        style={{
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        <Table rowKey="id" columns={columns} dataSource={dataAlbums} bordered />
      </div>
    );
  }
};

export default AlbumTable;
