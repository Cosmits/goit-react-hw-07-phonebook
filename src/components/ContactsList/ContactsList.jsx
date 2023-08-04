import { List } from './ContactsList.styled';
import ContactsItem from 'components/ContactItem';
import { useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';


const ContactsList = () => {

  const contacts = useSelector(selectVisibleContacts);

  return (
    <List>
      {contacts.map(({ name, number, id }) => (
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