import { Component } from 'react';
import { searchPictures } from 'services/api';
import { Box } from './Box';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    pictures: [],
    searchQ: '',
    page: 1,
    modalImg: '',
    loader: false,
    hideBtn: true,
    total: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQ, page } = this.state;

    if (prevState.page !== page || prevState.searchQ !== searchQ) {
      return this.loadSearchingImg();
    }
  }

  searchImg = searchQuerry => {
    if (!searchQuerry || searchQuerry === this.state.searchQ) return;
    this.setState({ searchQ: searchQuerry, page: 1, pictures: [] });
  };

  loadSearchingImg = async () => {
    try {
      this.setState({ loader: true, hideBtn: true });
      const { searchQ, page } = this.state;
      const data = await searchPictures(searchQ, page);

      if (!data.hits.length) {
        this.setState({ loader: false });
        return toast('Sorry, we not found images...');
      }

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...data.hits],
        loader: false,
        total: data.totalHits,
      }));

      if (this.state.page === Math.ceil(this.state.total / 12)) {
        toast('Sorry, this is the end of list...');
        this.setState({ hideBtn: false });
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  onClickLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  onModalOpen = url => {
    this.setState({ modalImg: url });
  };

  onModalClose = () => {
    this.setState({
      modalImg: '',
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchImg} />
        <Box as="main" marginTop="30px">
          <ImageGallery
            pictures={this.state.pictures}
            onClick={this.onModalOpen}
          />
          {this.state.pictures.length > 0 && this.state.hideBtn && (
            <Button onClick={this.onClickLoadMore} />
          )}
        </Box>
        {this.state.modalImg && (
          <Modal closeModal={this.onModalClose} url={this.state.modalImg} />
        )}
        {this.state.loader && <Loader />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </>
    );
  }
}
