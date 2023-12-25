import React from 'react'; // rafce + Tab ( + Enter) - розгорне нам шаблон (бо є плагін ES7)
import css from './modal.module.css'

const Modal = () => {
  return (
    <div className={css.Overlay}> <p>backdrope</p>
    <div className={css.Modal}>Modal</div>
    </div>

  )
}

export  { Modal };