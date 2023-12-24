import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";

import { fetchUsers } from "../../utils/http";
import { UserType } from "../../utils/type";

interface SelectUserProps {
  onSelectUser: (value: number) => void;
}

const SelectUser: React.FC<SelectUserProps> = ({ onSelectUser }) => {
  // Fetch Users
  const { data: dataUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsers({ signal: signal }),
  });

  const listUser = useMemo(() => {
    return dataUsers?.map((item: UserType) => ({
      value: item.id,
      label: item.name,
    }));
  }, [dataUsers]);

  return (
    <Select
      loading={isLoadingUsers}
      placeholder="Select a user"
      style={{ width: 230 }}
      onChange={onSelectUser}
      options={listUser}
    />
  );
};

export default SelectUser;
