import React, { Component } from "react";
import { PublicAddress, Button, Input, Field, Select } from 'rimble-ui';
import styles from './Auditor.module.scss';

export default class Auditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    const { contract } = this.props;
    return (
      <div className={styles.counter}>
        <h3>Stake tokens in a Charity</h3>
        <p>
          You can either validate that a charity is doing things correctly, and living
          up to the goals stated in their project plan. You can also challenge a charity
          and claim a bounty if they have transgressed.
          </p>
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Instance address:
          </div>
          {/* Select contract/charity */}
          <div className={styles.value}>
            <PublicAddress address={contract._address} />
          </div>
        </div>
        {/* Create a map here of validators and their claims */}
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Validator Stake:
          </div>
          <Input type="number" required={true} placeholder="123 ETH" onChange={evt => this.updateInputValue(evt)} />
        </div>
        <div className={styles.label}>
          Validator Claim:
        </div>
        <div className={styles.buttons}>
          <Field label="Make your claim">
            <Select
              items={[
                'The charity has transgressed on their stated duty.',
                'The charity has been acting fairly.',
              ]}
              required="true"
            />
          </Field>
          {/* Insert different methods of contract here */}
          <Button
            onClick={() => this.props.newValidator(this.state.inputValue)}
            size="small">Validate this project</Button>
          {/* <Button
            onClick={() => this.props.decrease(1)}
            disabled={!contract.methods.decreaseCounter} size="small">Decrease Counter by 1</Button> */}
        </div>
      </div>
    );
  }
}
