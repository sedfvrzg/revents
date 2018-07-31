import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import { incrementCounter, decrementCounter } from './testActions'

const dispatchActions = {
    incrementCounter,
    decrementCounter
}

class TestComponent extends Component {
  render() {
      const { incrementCounter, decrementCounter, data } = this.props
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='increment' />
        <Button onClick={decrementCounter} color='red' content='decrement' />
      </div>
    );
  }
}

const mapState = (state) => ({data: state.test.data })

export default connect(mapState, dispatchActions)(TestComponent);
