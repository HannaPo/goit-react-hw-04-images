import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { ErrorText } from './ErrorText/ErrorText';

// Services
import * as PixabayAPI from './../services/PixabayAPI';

// Styles
import { Container } from './App.styled';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const addImg = async () => {
      try {
        setIsLoading(true);

        const data = await PixabayAPI.fetchImages(searchQuery, page);

        if (data.hits.length === 0) {
          throw new Error('Sorry, no images found');
        }

        const normalizedImg = PixabayAPI.normalizedImg(data.hits);

        setImages((prevImages) => [...prevImages, ...normalizedImg]);
        setError('');
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery !== '' || page !== 1) {
      addImg();
    }
  }, [searchQuery, page]);

  const handleSubmit = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && <ImageGallery images={images} />}
      {page < totalPages && images.length > 0 && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {!isLoading && images.length === 0 && <ErrorText></ErrorText>}
      {error && !isLoading && <ErrorText>{error}</ErrorText>}
      <ToastContainer />
    </Container>
  );
};

export default App;
