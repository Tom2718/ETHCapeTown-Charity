import React from "react";
import styles from '../App.module.scss';
import {
  Button, Form, UPortButton, Flex, Box,
  Card, Heading, Text, Image, Table
} from 'rimble-ui';
import { Link } from "react-router-dom";
import Data from "../data/charities";

class Dashboard extends React.Component {

  fakeLogin = () => {
    setTimeout(
      () => {
        this.props.history.push("/charity");
      }, 10000
    )
  }

  render() {
    return (
      <div className={styles.wrapper} styles={{ marginTop: "32px" }}>
        <div className={styles.mtop}>
          <h2>
            {"Malaria Consortium"} Dashboard
          </h2>
          <p>
            {Data[0].description}
          </p>
        </div>
        <Flex width={0.8}>
          <Box width={2 / 3}>
            <Card width={0.95} mx={'auto'} bg="#EBECED">
              <Heading>Our Projects</Heading>
              <Table>
                <thead>
                  <tr>
                    <th>
                      Name
                    </th>
                    <th>
                      Project Address
                    </th>
                    <th>
                      Value (DAI)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Data[0].projects.map((obj, i) => (
                    <tr key={i}>
                    <td>
                      {obj.name}
                    </td>
                    <td>
                    {obj.projAddr}
                   </td>
                    <td>
                      {obj.balance}
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
              <span>
                <Link to="/login">
                  <Button my={12} mr={3} mx={'auto'} size="small">Add Another</Button>
                </Link>
              </span>
            </Card>
          </Box>
          <Box width={1 / 3}>
            <Card width={0.95} mx={'auto'} bg="#EBECED">
              <Heading>Register Service Providers</Heading>
              <Text mb={4}>
                Add verified addresses of service providers here.
                </Text>
              <Form.Field label="Service Provider Address" width={1}>
                <Form.Input
                  type="text"
                  width={1}
                />
              </Form.Field>
              <Form.Field label="Service Provider Website" width={1}>

                <Form.Input
                  type="text"
                  width={1}
                  label="Service Provider Website"
                />
              </Form.Field>

              <span>
                {/* <Link to="/login"> */}
                <Button mr={12} size="small">Add</Button>
                {/* </Link> */}
                <UPortButton size="small">
                  Connect with uPort
              </UPortButton>
              </span>
            </Card>
          </Box>
        </Flex>
        <Flex width={0.8}>
          <Box width={1 / 2}>
            <Card width={0.95} mx={'auto'} bg="#C1EFB2">
              <Heading>Trusting Validators (<strong>4235 DAI</strong>)</Heading>
              <Text mb={4}>
                Staked tokens enhancing your company's trustworthiness appear here.
                </Text>
                <Table>
                <thead>
                  <tr>
                    <th>
                      Address
                    </th>
                    <th>
                      Stake (DAI)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Data[0].happyValidators.map((obj, i) => (
                    <tr key={i}>
                    <td>
                      {obj.addr}
                    </td>
                    <td>
                      {obj.stake}
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Box>
          <Box width={1 / 2}>
            <Card width={0.95} mx={'auto'} bg="#FFD6DB">
              <Heading>Claims Against</Heading>
              <Text mb={4}>
                Claims against the integrity of your charity show up here.
                </Text>
                <Table>
                <thead>
                  <tr>
                    <th>
                      Address
                    </th>
                    <th>
                      Stake (DAI)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Data[0].sadValidators.map((obj, i) => (
                    <tr key={i}>
                    <td>
                      {obj.addr}
                    </td>
                    <td>
                      {obj.stake}
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
              <Link to="/login">
                <Button mr={3} my={12} mx={'auto'} size="small">Defend Yourself</Button>
              </Link>
            </Card>
          </Box>
        </Flex>
      </div>
    )
  }
}

export default Dashboard;
