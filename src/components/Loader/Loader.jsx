// Libs
import { createPortal } from 'react-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
// Styled components
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  const backdropRootPortal = document.querySelector('#backdrop-root');

  return createPortal(
    <LoaderWrapper>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </LoaderWrapper>,
    backdropRootPortal
  );
};
