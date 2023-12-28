import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
// import axios from 'axios';
// import Notiflix from 'notiflix';

import { STATUSES  } from '../services-functions/statuses.js'
import { fetchInfo } from 'services-functions/api.js';
import { Component } from 'react';

export class App extends Component {
  state = {
    pictures: null,
    error: null,
    // loader: 'pending',
    pageCount: 1,
    status: STATUSES.idle,
    searchWord: ""
  };

   fetchPictures = async () => {
    try {
      this.setState({status: STATUSES.pending})
      const pictures = await fetchInfo(this.state.searchWord, this.state.pageCount);
      this.setState({ pictures, status: STATUSES.success });
      
    } catch (error) { 
      this.setState({error: error.message, status: STATUSES.error})
      console.log("errorio")
    }
  };


  componentDidMount() {
    this.fetchPictures();
  }

  fetchByUser = async (searchWordByUser) => {
    try {
      this.setState({status: STATUSES.pending})
      const pictures = await fetchInfo(searchWordByUser, this.state.pageCount); //requestPostByQuery
      this.setState({ pictures, status: STATUSES.success });

    } catch (error) { 
      this.setState({error: error.message, status: STATUSES.error})
      console.log("errorio")
    }
  }


  
  componentDidUpdate(prevProps, prepState) {
 if (prepState.searchWord !== this.state.searchWord) {
   this.fetchByUser(this.state.searchWord)

 }
  }

  onSubmit = (formData) => {
this.setState({searchWord: formData});
this.setState({ pageCount: 1 })
  };

  render() {
    return (
      <div
        style={{
          // height: '100vh',
          maxWidth: "1240px",
          margin: "0 auto",
          // alignContent: "center",
          // alignItems: "center",
          // justifyContent: "center",
          display: 'flex',
          flexDirection: 'column',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.status === STATUSES.pending && <Loader />}
        {this.state.status === STATUSES.pending && <h2>Upsss, something went wrong...</h2>}
        <ImageGallery picturesQuery={this.state.pictures} />
        
        <Button />
        <Modal />
      </div>
    );
  }
}
