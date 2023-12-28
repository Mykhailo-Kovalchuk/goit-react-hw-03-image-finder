import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
// import axios from 'axios';
// import Notiflix from 'notiflix';


import { fetchInfo } from 'services-functions/api.js';
import { Component } from 'react';

export class App extends Component {
  state = {
    pictures: null,
    error: null,
    loader: 'pending',
    pageCount: 1,
    status: 'idle',
    searchWord: ""
  };

   fetchPictures = async () => {
    try {
      const pictures = await fetchInfo("pig", this.state.pageCount);
      this.setState({ pictures });
    } catch (error) { console.log("errorio")
    }
  };


  componentDidMount() {
    this.fetchPictures();
  }

  componentDidUpdate() {

  }

  onSubmit = (formData) => {
  
this.setState({searchWord: formData})
  };

  render() {
    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.onSubmit}
 />
        <ImageGallery picturesQuery={this.state.pictures} />
        <Loader />
        <Button />
        <Modal />
      </div>
    );
  }
}
