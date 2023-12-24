import { Flex } from "antd";

import PhotoTable from "../../components/Album/PhotoTable";

export default function DetailAlbumPage() {
  return (
    <>
      <Flex
        wrap="wrap"
        gap="middle"
        align="center"
        justify="space-between"
        style={{ marginBottom: 24 }}
      >
        <h1 style={{ fontWeight: 600, margin: 0 }}>List Photo</h1>
      </Flex>
      <PhotoTable />
    </>
  );
}
