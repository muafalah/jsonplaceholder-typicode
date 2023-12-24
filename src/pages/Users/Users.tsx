import { Flex } from "antd";

import UserTable from "../../components/User/UserTable";

export default function UsersPage() {
  return (
    <>
      <Flex
        wrap="wrap"
        gap="middle"
        align="center"
        justify="space-between"
        style={{ marginBottom: 24 }}
      >
        <h1 style={{ fontWeight: 600, margin: 0 }}>List User</h1>
      </Flex>
      <UserTable />
    </>
  );
}
