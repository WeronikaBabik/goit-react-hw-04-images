import css from './Loader.module.css';
import { Blocks } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.Loader}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
};

export default Loader;
