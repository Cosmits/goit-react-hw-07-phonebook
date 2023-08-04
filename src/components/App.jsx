import Section from "./Section";
import ContactForm from './ContactForm';
import FilterInput from './FilterInput/FilterInput';
import ContactsList from './ContactsList/ContactsList';
import { selectContacts } from "redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllContacts } from "redux/thunk";


export default function App() {

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const [titleContacts, setTitleContacts] = useState('');

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  useEffect(() => {
    let title = contacts?.length > 0 ? "Contacts" : "NO Contacts";
    setTitleContacts(title);

  }, [contacts]);

  return (
    <>
      <Section title="PhoneBook">
        <ContactForm />
      </Section>
      <Section title={titleContacts}>
        <FilterInput />
        <ContactsList />
      </Section>
    </>)
}