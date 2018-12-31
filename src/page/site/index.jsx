import React, {Component} from 'react'
import Api from '@/tool/api'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    Api.get('topics', null, r => {
      console.log(r)
    })
  }
  render () {
    return (
      <div className="outer home">index Page</div>
    )
  }
}