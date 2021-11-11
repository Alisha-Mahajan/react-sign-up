import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import RegisterIcon from "@material-ui/icons/AccountCircle";
import styles from "../../sass/SignUpForm.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmailRegex, TIMEOUT } from "../../immutables/constants";
import { useNavigate } from "react-router-dom";

toast.configure();

function SignUpFuncForm() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPwd: "",
    errors: {
      name: null,
      email: null,
      password: null,
      confirmPwd: null,
    },
  };

  const navigate = useNavigate();
  const [signUpFormState, setstate] = useState(initialState);

  const onChange = (key: string, event: any) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    let errors = signUpFormState.errors;
    switch (key) {
      case "name":
        errors.name =
          value.length < 5 ? "Name should contains at least 5 characters" : "";
        break;
      case "email":
        errors.email = !EmailRegex.test(value) ? "Email is not valid" : "";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password should contains at least 8 chars" : "";
        errors.confirmPwd =
          value !== signUpFormState.confirmPwd ? "Password should match" : "";
        break;
      case "confirmPwd":
        errors.confirmPwd =
          value !== signUpFormState.password ? "Password should match" : "";
        break;
      default:
        break;
    }

    setstate((prevState) => ({ ...prevState, errors, [key]: value }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const isValid = Object.values(signUpFormState.errors).every(
      (error) => !!!error
    );

    if (isValid) {
      console.log(
        `You are successfully registered with name: ${signUpFormState.name}, email: ${signUpFormState.email} and password: ${signUpFormState.password}`
      );
      toast.success("Successfully sign-up!!!", {
        autoClose: TIMEOUT,
      });
      setTimeout(() => {
        navigate("dashboard");
      }, TIMEOUT + 100);
    } else {
      toast.error("Failed to signup, please rectify errors before proceeding");
    }
  };

  return (
    <div className={styles.layout}>
      <form onSubmit={onFormSubmit} className={styles.formLayout}>
        <h2 className="title">Sign Up</h2>
        <Stack spacing={2}>
          <TextField
            variant="filled"
            type="text"
            size="small"
            label="Name"
            required
            value={signUpFormState.name}
            onChange={(event) => onChange("name", event)}
            error={!!signUpFormState.errors.name?.length}
            helperText={signUpFormState.errors.name}
          />
          <TextField
            variant="filled"
            type="text"
            size="small"
            label="Email"
            required
            value={signUpFormState.email}
            onChange={(event) => onChange("email", event)}
            error={!!signUpFormState.errors.email?.length}
            helperText={signUpFormState.errors.email}
          />
          <TextField
            variant="filled"
            type="password"
            size="small"
            label="Password"
            required
            value={signUpFormState.password}
            onChange={(event) => onChange("password", event)}
            error={!!signUpFormState.errors.password?.length}
            helperText={signUpFormState.errors.password}
          />
          <TextField
            variant="filled"
            type="password"
            size="small"
            label="Confirm Password"
            required
            value={signUpFormState.confirmPwd}
            onChange={(event) => onChange("confirmPwd", event)}
            error={!!signUpFormState.errors.confirmPwd?.length}
            helperText={signUpFormState.errors.confirmPwd}
          />
          <Button
            style={{ width: "120px", alignSelf: "center" }}
            type="submit"
            color="primary"
            size="medium"
            variant="contained"
            endIcon={<RegisterIcon />}
          >
            Send
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default SignUpFuncForm;
