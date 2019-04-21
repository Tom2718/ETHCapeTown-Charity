import React from "react";
import styles from '../App.module.scss';
import { Button, Form } from 'rimble-ui';
import {withRouter, Link} from "react-router-dom";

class Login extends React.Component {

  fakeLogin = () => {
    setTimeout(
      () => {
        this.props.history.push("/charity");
      }, 10000
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
      <div className={styles.mtop}>
      <h1>
        Login to your Charity
      </h1>
      </div>
        <Form>
          <Form.Field label="Email" width={1}>
            <Form.Input
              type="email"
              width={1}
            />
          </Form.Field>
          <Form.Field label="Password" width={1}>
            <Form.Input
              type="password"
              width={1}
            />
          </Form.Field>
          <Form.Check
            label="Remember me?"
            mb={3}
          />
          <Link to="/dashboard">
          <Button type="submit" width={1}>
            Sign Up
        </Button>
        </Link>
        </Form>
      </div>
    )
  }
}

export default withRouter(Login);
