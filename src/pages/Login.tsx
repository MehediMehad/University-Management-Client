import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const onSubmit = async (data: FieldValues) => {
    console.log("33333333", data);

    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      toast.dismiss(toastId);
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { duration: 2000 });
      navigate(`/${user.role}/dashboard`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.data.message || "Something went wrong", {
        duration: 3000,
      });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="ID:" />
        <PHInput type="text" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
