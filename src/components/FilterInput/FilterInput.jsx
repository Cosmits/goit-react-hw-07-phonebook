import { useDispatch, useSelector } from 'react-redux';
import { Label, Input } from './FilterInput.styled';
import { selectFilter } from 'redux/selectors';
import { setFilterSlice } from 'redux/filterSlice';


const FilterInput = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);

  const handleChangeFilter = (event) => {
    dispatch(setFilterSlice(event.target.value.toLowerCase()))
  };

  return (
    <Label>
      Find contacts by name
      <Input
        type="text"
        name="filter"
        placeholder="Enter contact name"
        value={filter}
        onChange={handleChangeFilter}
      />
    </Label>
  );
};

export default FilterInput;