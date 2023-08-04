import { List } from './ContactsList.styled';
import ContactsItem from 'components/ContactItem';
import { useSelector } from 'react-redux';
import { selectVisibleContacts, selectFilter } from 'redux/selectors';


const ContactsList = () => {

  const contacts = useSelector(selectVisibleContacts);
  const filter = useSelector(selectFilter);

  const getFilterContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
  };

  return (
    <List>
      {getFilterContacts().map(({ name, number, id }) => (
        <ContactsItem
          key={id}
          id={id}
          name={name}
          number={number}
        />
      ))}
    </List>
  );
};

export default ContactsList;