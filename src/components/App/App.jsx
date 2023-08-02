import css from './App.module.css';
import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import dataFromPixabay from 'components/API/Api';

class App extends Component {
  state = {
    inputSearch: '',
    images: [],
    page: 1,
    isLoading: false,
    per_page: 12,
    loadMore: false,
  };

  fetchImages = async (inputSearch, page) => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await dataFromPixabay(inputSearch, page);
      if (!hits.length) {
        this.setState({ loadMore: false });
        return Notiflix.Notify.failure('Nothing was found');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (e) {
      return Notiflix.Notify.failure('Nothing was found');
    } finally {
      this.setState({ isLoading: false });
    }
  };
  async componentDidUpdate(_, prevState) {
    const { inputSearch, page } = this.state;
    if (prevState.inputSearch !== inputSearch || prevState.page !== page) {
      this.fetchImages(inputSearch, page);
    }
  }
  handleSubmit = inputSearch => {
    this.setState({ inputSearch, images: [], page: 1 });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        <ImageGallery images={this.state.images} />
        {this.state.loadMore && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
}

export default App;
