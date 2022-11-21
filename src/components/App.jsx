import { useState, useEffect } from 'react';
import { searchPictures } from 'services/api';
import { Box } from './Box';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchQ, setSearchQ] = useState('');
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState('');
  const [loader, setLoader] = useState(false);
  const [hideBtn, setHideBtn] = useState(true);

  useEffect(() => {
    if (searchQ) {
      loadSearchingImg();
    }

    async function loadSearchingImg() {
      try {
        setLoader(true);
        setHideBtn(true);
        const data = await searchPictures(searchQ, page);

        if (!data.hits.length) {
          setLoader(false);
          return toast('Sorry, we not found images...');
        }

        setPictures(prevState => [...prevState, ...data.hits]);
        setLoader(false);

        if (page === Math.ceil(data.totalHits / 12)) {
          toast('Sorry, this is the end of list...');
          setHideBtn(false);
        }
        return;
      } catch (error) {
        console.log(error);
      }
    }
  }, [page, searchQ]);

  const searchImg = searchQuerry => {
    if (!searchQuerry || searchQuerry === searchQ) return;
    setSearchQ(searchQuerry);
    setPage(1);
    setPictures([]);
  };

  const onClickLoadMore = () => {
    setPage(page + 1);
  };

  const onModalOpen = url => {
    setModalImg(url);
  };

  const onModalClose = () => {
    setModalImg('');
  };

  return (
    <>
      <Searchbar onSubmit={searchImg} />
      <Box as="main" marginTop="30px">
        <ImageGallery pictures={pictures} onClick={onModalOpen} />
        {pictures.length > 0 && hideBtn && <Button onClick={onClickLoadMore} />}
      </Box>
      {modalImg && <Modal closeModal={onModalClose} url={modalImg} />}
      {loader && <Loader />}
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
};
