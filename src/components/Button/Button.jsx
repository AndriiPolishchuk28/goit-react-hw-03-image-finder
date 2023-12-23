import css from './Button.module.css';

export const Button = ({ loadMore }) => {
  return (
    <button className={css.btn} onClick={loadMore} type="button">
      Load more
    </button>
  );
};
