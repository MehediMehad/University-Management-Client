/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester, { isLoading: RLoading }] =
    useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  console.log(academicSemester);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const semesterData = {
      ...data,
      minCredit: Number(data?.minCredit),
      maxCredit: Number(data?.maxCredit),
    };
    console.log({ semesterData });

    const toastId = toast.loading("Logging in");
    try {
      const res = (await addSemester(semesterData)) as TResponse<any>; // TODO
      console.log(res);

      if (res.error) {
        toast.dismiss(toastId);
        toast.error(res.error.data.message, { duration: 3000 });
      } else {
        toast.dismiss(toastId);
        toast.success(res.data.message, {
          duration: 3000,
        });
      }
      console.log("res", res);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.data.message, {
        duration: 3000,
      });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="academicSemester"
            label="Academic Semester"
            options={academicSemesterOptions}
          />
          <PHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
