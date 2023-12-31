import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
// import axios from 'axios';
// import Notiflix from 'notiflix';

import { STATUSES } from '../services-functions/statuses.js';
import { fetchInfo } from 'services-functions/api.js';
import { Component } from 'react';

export class App extends Component {
  state = {
    pictures: null,
    error: null,
    // loader: 'pending',
    pageCount: 1,
    status: STATUSES.idle,
    searchWord: '',
    emptyResponse: false,
  };

  componentDidMount() {}

  fetchByUser = async searchWordByUser => {
    try {
      this.setState({ status: STATUSES.pending });
      const pictures = await fetchInfo(searchWordByUser, this.state.pageCount); //requestPostByQuery
      // console.log(pictures)

      this.setState({ pictures, status: STATUSES.success });

      if (pictures.length < 12) {
        this.setState({ emptyResponse: true });
      }
    } catch (error) {
      this.setState({ error: error.message, status: STATUSES.error });
      console.log('errorio');
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchWord !== this.state.searchWord) {
      this.fetchByUser(this.state.searchWord);
      //  this.loadMore(prevState.pageCount);
    }
  }

  onSubmit = formData => {
    // this.setState({searchWord: formData});
    // this.setState({ pageCount: 1 })
    this.setState({ searchWord: formData, pageCount: 1 });
  };

  loadMore = async () => {
    try {
      const nextPage = this.state.pageCount + 1;
      this.setState({ status: STATUSES.pending });
      const picturesLoadMore = await fetchInfo(this.state.searchWord, nextPage); //requestPostByQuery
      // console.log(picturesLoadMore.length)

      if (picturesLoadMore.length < 12) {
        this.setState({ emptyResponse: true });
      }

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...picturesLoadMore],
      }));

      this.setState({ pageCount: nextPage, status: STATUSES.success });
    } catch (error) {
      this.setState({ error: error.message, status: STATUSES.error });
      console.log('errorio');
    }
  };

  render() {
    return (
      <div
        style={{
          // height: '100vh',
          maxWidth: '1240px',
          margin: '0 auto',
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

        <ImageGallery picturesQuery={this.state.pictures} />

        {this.state.status === STATUSES.pending && <Loader />}
        {this.state.status === STATUSES.error && (
          <h2>Upsss, something went wrong...</h2>
        )}

        {this.state.pictures !== null && this.state.emptyResponse === false && (
          <Button loadMore={this.loadMore} />
        )}
        <Modal />
      </div>
    );
  }
}