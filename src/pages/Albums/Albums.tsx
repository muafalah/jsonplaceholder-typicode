import { useState } from "react";
import { Flex } from "antd";

import SelectUser from "../../components/UI/SelectUser";
import AlbumTable from "../../components/Album/AlbumTable";

export default function AlbumsPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();

  const handleSelectUser = (value: number) => {
    setSelectedUserId(value);
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
        <h1 style={{ fontWeight: 600, margin: 0 }}>List Album</h1>
        <SelectUser onSelectUser={handleSelectUser} />
      </Flex>
      <AlbumTable selectedUserId={selectedUserId} />
    </>
  );
}
