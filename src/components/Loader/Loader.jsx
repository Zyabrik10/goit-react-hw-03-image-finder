import loaderGif from '../../img/loader/loader.svg';

export const Loader = () =>{
  return (
    <img
      src={loaderGif}
      alt="loading..."
      style={{
        width: 200,
        display: 'block',
        margin: '0 auto',
      }}
    />
  );
}
