import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
type TTableData = Pick<TStudent, "fullName" | "id">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(3);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: 2 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log({ isLoading }, { isFetching });

  const metadata = studentData?.meta;

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "fullName",
      key: "id",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll No",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log("params", { filters, extra });
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };
  if (isLoading) {
    return <p>Loading....</p>;
  }
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metadata?.limit}
        total={metadata?.total}
      />
    </>
  );
};

export default StudentData;
