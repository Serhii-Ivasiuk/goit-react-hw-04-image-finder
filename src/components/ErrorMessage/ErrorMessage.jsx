// Libs
import PropTypes from 'prop-types';
// Styled components
import { Message } from './ErrorMessage.styled';

export const MessageWpapper = ({ children }) => {
  return <Message>{children}</Message>;
};

MessageWpapper.propTypes = {
  children: PropTypes.node.isRequired,
};
