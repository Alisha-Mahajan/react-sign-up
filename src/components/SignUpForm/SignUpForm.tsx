import { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import RegisterIcon from "@material-ui/icons/AccountCircle";
import styles from "./SignUpForm.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IState = {
  name: string;
  email: string;
  password: string;
  confirmPwd: string;
  errors: {
    name: string;
    email: string;
    password: string;
    confirmPwd: string;
  };
};

const Regex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

toast.configure();
class SignUpForm extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  onChange = (key: string, event: any) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    let errors = this.state.errors;
    switch (key) {
      case "name":
        errors.name =
          value.length < 5 ? "Name should contains at least 5 characters" : "";
        break;
      case "email":
        errors.email = !Regex.test(value) ? "Email is not valid" : "";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password should contains at least 8 chars" : "";
        errors.confirmPwd =
          value !== this.state.confirmPwd ? "Password should match" : "";
        break;
      case "confirmPwd":
        errors.confirmPwd =
          value !== this.state.password ? "Password should match" : "";
        break;
      default:
        break;
    }

    this.setState(Object.assign(this.state, { errors, [key]: value }));
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const isValid = Object.values(this.state.errors).every((error) => !!!error);

    if (isValid) {
      console.log(
        `You are successfully registered with name: ${this.state.name}, email: ${this.state.email} and password: ${this.state.password}`
      );
      toast.success(`Successfully sign-up!!! `);
    } else {
      toast.error("Failed to signup, please rectify errors before proceeding");
    }
  };

  render() {
    const { name, email, password, confirmPwd, errors } = this.state;
    return (
      <div className={styles.layout}>
        <form onSubmit={this.onFormSubmit} className={styles.formLayout}>
          <h2 className="title">Sign Up</h2>
          <Stack spacing={2}>
            <TextField
              variant="filled"
              type="text"
              size="small"
              label="Name"
              required
              value={name}
              onChange={(event) => this.onChange("name", event)}
              error={!!errors.name?.length}
              helperText={errors.name}
            />
            <TextField
              variant="filled"
              type="text"
              size="small"
              label="Email"
              required
              value={email}
              onChange={(event) => this.onChange("email", event)}
              error={!!errors.email?.length}
              helperText={errors.email}
            />
            <TextField
              variant="filled"
              type="password"
              size="small"
              label="Password"
              required
              value={password}
              onChange={(event) => this.onChange("password", event)}
              error={!!errors.password?.length}
              helperText={errors.password}
            />
            <TextField
              variant="filled"
              type="password"
              size="small"
              label="Confirm Password"
              required
              value={confirmPwd}
              onChange={(event) => this.onChange("confirmPwd", event)}
              error={!!errors.confirmPwd?.length}
              helperText={errors.confirmPwd}
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
}

export default SignUpForm;
