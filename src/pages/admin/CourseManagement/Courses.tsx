import { Button, Modal, Table } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

const RegisteredSemesters = () => {
  const { data: courses, isLoading } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  if (isLoading) {
    return <p>Loading....</p>;
  }
  return (
    <Table
      // loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculty] = useAddFacultiesMutation();
  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name?.middleName} ${item.name?.lastName}`,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handelSubmit = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    addFaculty(facultyData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal}>
        Add Faculty
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handelSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button htmlType="submit">Submit</Button>
          </div>
        </PHForm>
      </Modal>
    </>
  );
};

export default RegisteredSemesters;
