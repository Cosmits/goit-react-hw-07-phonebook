import { useState } from 'react';

import { Button, Form, Label, InputForm } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/thunk';

export default function ContactForm() {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  const handleChangeName = event => {
    setName(event.currentTarget.value);
  };

  const handleChangeNumber = event => {
    setNumber(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    contacts.some(contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim())
      ? alert(`${name} is duplicate contact`)
      : dispatch(addContact({ name, number }))

    formReset();
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Label>Name
        <InputForm
          onChange={handleChangeName}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Arnold"
          required
        />
      </Label>
      <Label>Number
        <InputForm
          onChange={handleChangeNumber}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}
