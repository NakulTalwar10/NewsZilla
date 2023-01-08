import React, { Component } from 'react'
import Loading from './Loading.gif'
export class Snipper extends Component {
  render() {
    return (
      <div className='conatiner text-center'>
        <img src={Loading} alt="snipper" />
      </div>
    )
  }
}

export default Snipper