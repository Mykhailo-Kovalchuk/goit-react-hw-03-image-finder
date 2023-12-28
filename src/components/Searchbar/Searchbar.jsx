// import React from 'react'
import css from './searchbar.module.css';

const Searchbar = ({onSubmit}) => {
const handleInputChange = (event) => {
  event.preventDefault();
  const inputValue = event.currentTarget.elements.searchInput.value;
  // console.log(inputValue)
  onSubmit(inputValue);
}

  return (
      <header className={css.Searchbar}>
  <form className="form" onSubmit={handleInputChange}>
    <button type="submit" className="button">
      <span className="button-label">Search</span>
    </button>

    <input
    name='searchInput'
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>

  )
}

export  {Searchbar};