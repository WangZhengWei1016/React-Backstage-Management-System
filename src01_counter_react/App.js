import React,{Component} from 'react'

export default class App extends Component {
    state = {
        count: 0
    }

    increment = () => {
        const number = this.refs.addNumber.value * 1
        this.setState({
            count: this.state.count + number
        })
    }

    decrement = () => {
        const number = this.refs.addNumber.value * 1
        this.setState({
            count: this.state.count - number
        })
    }

    incrementIfOdd = () => {
        const number = this.refs.addNumber.value * 1
        const {count} = this.state
        if (count % 2 ===1 || count % 2 === -1) {
            this.setState({
                count: count + number
            })
        }
    }

    incrementAsync = () => {
        setTimeout(() => {
            const number = this.refs.addNumber.value * 1
            this.setState({
                count: this.state.count + number
        })
        }, 1000);
    }

    render() {

        const {count} = this.state

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