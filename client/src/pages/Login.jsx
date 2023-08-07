import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // su dung useDispatch de dispatch cac action
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const user = { data };
    dispatch(login(user.username, user.password));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Login</h1>
          <Input
            type="text"
            content="Username"
            register={register("username", {
              required: "This is required",
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "This must only contain A-Z, a-z, 0-9 and _",
              },
            })}
          />
          {<p role="alert">{errors.username?.message}</p>}
          <Input
            type="password"
            content="Password"
            register={register("password", { required: "This is required" })}
          />
          {<span>{errors.password?.message}</span>}
          <Input type="submit" content="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
