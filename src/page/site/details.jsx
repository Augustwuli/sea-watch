import React, { Component } from 'react'
import Api from '@/tool/api'
import Header from '@/coms/header'

export default class Details extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dat: [],
      loading: true
    }
  }
  componentDidMount () {
    this.getData()
  }
  getData () {
    let id = this.props.match.params.id
    Api.get(`topic/${id}`, null, r => {
      this.setState({dat: r.data, loading: false})
    })
  }
  render () {
    let { dat, loading } = this.state
    let dom = null
    let reDom = null
    if (!loading) {
      if (dat.replies.length !== 0) {
        let listDom = dat.replies.map((i, k)=>{
          return (
            <li key={k}>
              <h3>{i.author.loginname}说：</h3>
              <article dangerouslySetInnerHTML={{__html: i.content}}></article>
            </li>
          )
        })
        reDom = (
          <div className='replies_list'>
            <ol>{listDom}</ol>
          </div>
        )
      }
    }
    dom = (
      <div className="outer home">
        <Header title='内容详情' />
        <h2>{dat.title}</h2>
        {/* <p>作者：{dat.author.loginname}<br />日期：{dat.create_at}</p> */}
        <article dangerouslySetInnerHTML={{__html: dat.content}}></article>
        <hr />
        {reDom}
      </div>
    )
  return dom
  }
}
