import { Component } from 'react';
import { ToastContainer} from 'react-toastify';
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

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    totalPages: 0,
    loadMore: false,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.addImg();
    }
  }

  addImg = async () => {
    const { searchQuery, page } = this.state;

    try {
      this.setState({ isLoading: true });

      const data = await PixabayAPI.fetchImages(searchQuery, page);

      if (data.hits.length === 0) {
       throw new Error('Sorry, no images found');
       }
      const normalizedImg = PixabayAPI.normalizedImg(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImg],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, isLoading, page, totalPages } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />

        {images.length > 0 && <ImageGallery images={images} />}
        {page < totalPages && images.length > 0 &&<Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {!isLoading && images.length === 0 && <ErrorText></ErrorText>}
        {error && !isLoading && <ErrorText>{error}</ErrorText>}
        <ToastContainer />
      </Container>
    );
  }
}

export default App;
