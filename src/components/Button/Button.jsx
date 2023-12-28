import React from 'react'
import css from './button.module.css'


const Button = ({onClick}) => {
  return (
    <button onClick={onClick} type='button' className={css.Button}>Load more</button>
  )
}

export  {Button};