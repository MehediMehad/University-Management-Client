import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button } from "antd";

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
    email: "zobind9@example.com",
    contactNo: "+1234567890",
    emergencyContactNo: "+0987654321",
    bloodGroup: "A+",
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
    admissionSemester: "6753e1d956c0388297e7976d",
    academicDepartment: "6753fb23d9f6c4dd8a0a4873",
    profileImg: "https://example.com/profile.jpg",
  },
};

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    //! This is for development just for checking
    console.log(Object.fromEntries(formData));
  };
  return (
    <PHForm onSubmit={onSubmit}>
      <PHInput type="text" name="name" label="Name" />
      <Button htmlType="submit">Submit</Button>
    </PHForm>
  );
};

export default CreateStudent;
