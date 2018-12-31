import React, { Component } from 'react'

export default class Header extends Component {
  render () {
    let { title } = this.props
    return (
      <header className="header">
        <h1>{title}</h1>
      </header>
    )
  }
}