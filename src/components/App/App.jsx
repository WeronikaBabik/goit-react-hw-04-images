import css from './App.module.css';
import * as Scroll from 'react-scroll';
import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import dataFromPixabay from 'components/API/Api';

const App = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [per_page] = useState(12);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const fetchImages = async (inputSearch, page) => {
      if (!inputSearch) {
        return;
      }
      setIsLoading(true);
      try {
        const { hits, totalHits } = await dataFromPixabay(inputSearch, page);
        if (!hits.length) {
          setLoadMore(false);
          return Notiflix.Notify.failure('Nothing was found');
        }
        setImages(images => [...images, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / per_page));
      } catch (e) {
        return Notiflix.Notify.failure('Nothing was found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages(inputSearch, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, page]);

  const handleSubmit = data => {
    setInputSearch(data);
    setImages([]);
    setPage(1);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    scrolling();
  };
  function scrolling() {
    const scroll = Scroll.animateScroll;
    scroll.scrollMore(300);
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} />
      {loadMore && <Button handleLoadMore={handleLoadMore} />}
    </div>
  );
};

export default App;
