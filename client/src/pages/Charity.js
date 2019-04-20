import React from "react";
import styles from '../App.module.scss';
import {
  Card, Heading, Text, Button,
  Flex, Box, Image
} from 'rimble-ui';
import EA from "../images/ea_logo.png"
import { Link } from "react-router-dom";


export default class Charity extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.contracts}>
          <h1>Become a Trustless Charity</h1>
          <p>Start with your own dashboard where you can
            launch projects and display transparency.
          </p>
          <Flex width={0.6}>
            <Box width={1 / 2}>
              <Card width={0.9} mx={'auto'} bg="#EBECED">
                <Heading>Register</Heading>
                <Text mb={4}>
                  Become a trustless charity.
                </Text>
                <Link to="/login">
                <Button mr={3} mx={'auto'}>Sign up</Button>
                </Link>
              </Card>
            </Box>
            <Box width={1 / 2}>
              <Card width={0.9} mx={'auto'} bg="#EBECED">
                <Heading>Login</Heading>
                <Text mb={4}>
                  Login to your dashboard here.
                </Text>
                <Link to="/login">
                <Button mr={3} mx={'auto'}>Login</Button>
                </Link>
              </Card>
            </Box>
          </Flex>
        </div>
      </div>
    )
  }
}
