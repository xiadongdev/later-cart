import React, { Component } from 'react';
import axios from 'axios';

export default class ShareForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sharedWith: []
    }
  }

  shareWishlist = e => {
    e.preventDefault()
    console.log('sharing...')
    console.log(this.props.wishlist.id)
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: 'post', 
      url: '/api/user_wishlists', 
      data: {
        info: { 
          wishlist_id: this.props.wishlist.id,
          email: e.target.elements.email.value
        }
      },
      headers: {'Authorization': token }
    })
    .then(response => {
      console.log(response)
      // this.setState({
      //   wishlists: response.data
      // })
    })
    .catch(error => {
      console.log(error)
    }) 
  }

  componentDidMount() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios({
      method: 'get', 
      url: '/api/user_wishlists', 
      params: {
        wishlistId: this.props.wishlist.id
      },
      headers: {'Authorization': token }
    })
    .then(response => {
      let emails = []
      for(let i of response.data){
        emails.push(i.user.email)
      }
      console.log(emails)
      this.setState({
        sharedWith: emails
      })
    })
    .catch(error => {
      console.log(error)
    }) 

  }

  render() {
    return (
      <div className="share-container">      
        <form onSubmit={this.shareWishlist}> 
          <input className='input' type="text" name="email" placeholder='example@example.com' />
          <button type='submit' className="shareBtn" >
            Share 
          </button>
        </form>
        <div>
          {this.state.sharedWith.length >= 1 ?
          (<div >Shared With <br/>
            {this.state.sharedWith.map(email => (
              <li>{email}</li>
            ))} </div>): null
           }
          
        </div>
      </div>
    )
  }
}