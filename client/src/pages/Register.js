import React from "react";
import styles from '../App.module.scss';
import { Button, Form, UPortButton } from 'rimble-ui';
import { withRouter, Link } from "react-router-dom";

class Register extends React.Component {

  fakeLogin = () => {
    setTimeout(
      () => {
        this.props.history.push("/charity");
      }, 10000
    )
  }

  render() {
    return (
      <div className={styles.wrapper} styles={{marginTop: "32px"}}>
      <div className={styles.mtop}>
      <h1>
        Sign Up as a Charity
      </h1>
      </div>
        <Form>
          <Form.Field label="Name" width={1}>
            <Form.Input
              type="text"
              width={1}
            />
          </Form.Field>
          <Form.Field label="Surname" width={1}>
            <Form.Input
              type="text"
              width={1}
            />
          </Form.Field>
          <Form.Field label="Position in Company" width={1}>
            <Form.Input
              type="text"
              width={1}
            />
          </Form.Field>
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
          <Form.Field label="Confirm Password" width={1}>
            <Form.Input
              type="password"
              width={1}
            />
          </Form.Field>
          <UPortButton fullWidth>
            Connect with uPort
          </UPortButton>
          <Link to="/">
            <Button type="submit" width={1}>
              Sign Up
            </Button>
          </Link>
        </Form>
      </div>
    )
  }
}

export default withRouter(Register);
