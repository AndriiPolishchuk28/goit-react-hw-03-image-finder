import { Bars } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <>
      <Bars
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
        visible={true}
      />
    </>
  );
};
