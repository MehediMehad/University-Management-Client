/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement";
import PHSelect from "../../../components/form/PHSelect";

const CreateCourse = () => {
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const courseData = {
      ...data,
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses?.map((item) => ({
        course: item,
        isDeleted: false,
      })),
    };
    console.log(courseData);

    // const toastId = toast.loading("Logging in");
    // try {
    //   const res = (await addSemester(semesterData)) as TResponse<any>; // TODO
    //   console.log(res);

    //   if (res.error) {
    //     toast.dismiss(toastId);
    //     toast.error(res.error.data.message, { duration: 3000 });
    //   } else {
    //     toast.dismiss(toastId);
    //     toast.success(res.data.message, {
    //       duration: 3000,
    //     });
    //   }
    //   console.log("res", res);
    // } catch (err: any) {
    //   toast.dismiss(toastId);
    //   toast.error(err.data.message, {
    //     duration: 3000,
    //   });
    // }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            name="preRequisiteCourses"
            label="PreRequisite Courses"
            options={preRequisiteCoursesOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
