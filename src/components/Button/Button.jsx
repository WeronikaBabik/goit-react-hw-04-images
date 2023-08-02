import css from './Button.module.css';
import PropTypes from 'prop-types';
const Button = ({ handleLoadMore }) => {
  return (
    <button className={css.Button} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
