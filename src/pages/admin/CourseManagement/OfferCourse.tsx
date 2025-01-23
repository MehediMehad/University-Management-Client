import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { weekDaysOptions } from "../../../constants/global";
import PHTimePicker from "../../../components/form/PHTimePicker";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  console.log(courseId);

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: `${item.name.lastName} ${item.name?.middleName} ${item.name?.lastName}`,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <PHSelect
            name="faculty"
            label="Faculty"
            disabled={!courseId || fetchingFaculties}
            options={facultiesOptions}
          />
          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          {/* <PHInput disabled={!id} name="test" label="text" type="text" /> */}
          <PHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
// TODO: 31-10
