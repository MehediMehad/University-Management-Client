import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement";
import moment from "moment";
import { TSemester } from "../../../types/courseManagement.type";
import { useState } from "react";
import { toast } from "sonner";

type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");

  const { data: semesterData, isLoading } =
    useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("ll"),
      endDate: moment(new Date(endDate)).format("ll"),
      status,
    })
  );
  const handleStatuesUpdate = async (data: any) => {
    const toastId = toast.loading("Update Semester Status");
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    try {
      const res = await updateSemesterStatus(updateData).unwrap();
      toast.dismiss(toastId);
      toast.success(`${res.message}` || "Status Updated", {
        duration: 2000,
      });
      console.log("Update successful:", res);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "An error occurred while updating the status.";
      toast.dismiss(toastId);
      toast.success(errorMessage);
    }
  };

  const menuProps = {
    items,
    onClick: handleStatuesUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  // Todo implement Filtering
  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   console.log("params", { filters, extra });
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };
  if (isLoading) {
    return <p>Loading....</p>;
  }
  return (
    <Table
      // loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemesters;

const items = [
  // {
  //   label: "ONGOING",
  //   key: "UPCOMING",
  // },
  {
    label: "ONGOING",
    key: "ONGOING",
  },
  {
    label: "ENDED",
    key: "ENDED",
  },
];
