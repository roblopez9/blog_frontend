import React, { useState } from 'react';
import { TextInput } from '@mantine/core';

function SearchBar(props) {
  const [searchTerm, setsearchTerm] = useState('');
  const settingSearch = (event) => {
    setsearchTerm(event.target.value);
    props.onSearchChange(event.target.value);
    console.log(event.target.value);
  };

//   function changeDisplay(value) {
//     const modal = document.querySelector('.searchList').style.display;
//     console.log(value);
//     modal.style.display = value;
//   }
  return (
    <TextInput value={searchTerm} onChange={settingSearch} radius="xl" placeholder="Search Article" />
  );
}

export default SearchBar;
