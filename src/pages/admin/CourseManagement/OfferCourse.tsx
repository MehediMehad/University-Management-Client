import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWitch from "../../../components/form/PHSelectWithWitch";
import { useState } from "react";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";

const OfferCourse = () => {
  const [id, setId] = useState("");
  console.log("INSIDE", id);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWitch
            onValueChange={setId}
            name="academicSemester"
            label="Academic Semester"
            options={academicFacultyOptions}
          />
          <PHInput disabled={!id} name="test" label="text" type="text" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
