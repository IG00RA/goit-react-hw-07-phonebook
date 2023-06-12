import PropTypes from 'prop-types';
import { StyledContact } from './ContactItem.styled';

export const ContactItem = ({ contact: { name, phone } }) => {
  return (
    <>
      <StyledContact>{name}</StyledContact>
      <StyledContact>{phone}</StyledContact>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
