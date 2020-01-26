import React,{Component} from 'react'
import PropTypes from 'prop-types'

import { increment, decrement } from './redux/actions'

export default class App extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    }

    increment = () => {
        const number = this.refs.addNumber.value * 1
        this.props.store.dispatch(increment(number))
    }

    decrement = () => {
        const number = this.refs.addNumber.value * 1
        this.props.store.dispatch(decrement(number))
    }

    incrementIfOdd = () => {
        const number = this.refs.addNumber.value * 1
        const count = this.props.store.getState()
        if (count % 2 ===1 || count % 2 === -1) {
            this.props.store.dispatch(increment(number))
        }
    }

    incrementAsync = () => {
        setTimeout(() => {
            const number = this.refs.addNumber.value * 1
            this.props.store.dispatch(increment(number))
        }, 1000);
    }

    render() {

        const count = this.props.store.getState()

        return (
            <div>
                <p>click { count } times</p>
                <select ref='addNumber'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select> &nbsp;
                <button onClick={this.increment}>+</button> &nbsp;
                <button onClick={this.decrement}>-</button> &nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button> &nbsp;
                <button onClick={this.incrementAsync}>increment async</button>
            </div>
        )
    }
}