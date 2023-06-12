import { ContactItem } from 'components/ContactItem/ContactItem';
import { StyledItem, StyledList } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getFiltredContacts, getIsLoading } from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export const ContactList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const filtredContacts = useSelector(getFiltredContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <StyledList>
      {isLoading && !error && (
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
      )}
      {filtredContacts.map(contact => (
        <StyledItem key={contact.id}>
          <ContactItem contact={contact} />
          <button onClick={() => dispatch(deleteContact(contact.id))}>
            Delete
          </button>
        </StyledItem>
      ))}
      {error && <p>Sorry ERROR happened</p>}
    </StyledList>
  );
};
