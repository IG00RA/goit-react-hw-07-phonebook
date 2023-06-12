import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ErrorText, Form } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
      .required('Name is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Number must contain only numbers')
      .required('Number is required'),
  });
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      onSubmit={(values, { resetForm }) => {
        const normalizeName = values.name.toLowerCase();
        if (
          contacts.find(contact => contact.name.toLowerCase() === normalizeName)
        ) {
          return alert(`${values.name} is already in contact list`);
        }
        dispatch(addContact(values));
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="phone">Number</label>
        <Field
          type="tel"
          name="phone"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMessage name="name" component={ErrorText} />
        <ErrorMessage name="phone" component={ErrorText} />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
