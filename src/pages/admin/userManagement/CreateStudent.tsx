import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Zbi2n",
      middleName: "Ali",
      lastName: "Khan",
    },

    gender: "male",
    dateOfBirth: "2002-05-15",
    bloodGroup: "A+",

    email: "zobind9@example.com",
    contactNo: "+1234567890",
    emergencyContactNo: "+0987654321",
    permanentAddress: "123 Main St, Hometown, Country",

    guardian: {
      fatherName: "Richard Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "+1234509876",
      motherName: "Jane Doe",
      motherOccupation: "Teacher",
      motherContactNo: "+1234598765",
    },

    localGuardian: {
      name: "Mike Ross",
      occupation: "Lawyer",
      address: "456 Elm St, Hometown, Country",
      contactNo: "+1122334455",
    },
    profileImg: "dddddddddddddddd",

    admissionSemester: "6753e1d956c0388297e7976d",
    academicDepartment: "6753fb23d9f6c4dd8a0a4873",
  },
};

//! This is for development
//! Should be removed
const studentDefaultValues = {
  name: {
    firstName: "Zbi2n",
    middleName: "Ali",
    lastName: "Khan",
  },

  gender: "male",
  // dateOfBirth: "2002-05-15",
  bloodGroup: "A+",

  email: "z6obind9@example.com",
  contactNo: "+1234567890",
  emergencyContactNo: "+0987654321",
  presentAddress: "123 Main St",
  permanentAddress: "123 Main St, Hometown, Country",

  guardian: {
    fatherName: "Richard Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "+1234509876",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContactNo: "+1234598765",
  },

  localGuardian: {
    name: "Mike Ross",
    occupation: "Lawyer",
    address: "456 Elm St, Hometown, Country",
    contactNo: "+1122334455",
  },
  profileImg: "",
  // admissionSemester: "6753e1d956c0388297e7976d",
  // academicDepartment: "6753fb23d9f6c4dd8a0a4873",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log({ data, error });

  const { data: semesterData, isLoading: semesterLoading } =
    useGetAllSemestersQuery(undefined);

  const { data: departmentData, isLoading: departmentLoading } =
    useGetAcademicDepartmentsQuery(undefined, { skip: semesterLoading });

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImg);

    addStudent(formData);
    //! This is for development just for checking
    console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={12} lg={8}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      size="large"
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={8}>
              <PHInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={semesterLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={departmentLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
