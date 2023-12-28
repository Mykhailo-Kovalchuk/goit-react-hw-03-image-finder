import React from 'react'
import css from './imageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';


const ImageGallery = ({picturesQuery}) => {
   
  return (
    <div className={css.ImageGallery}>
    <ImageGalleryItem  picturesQuery={picturesQuery}  />
    </div>
  )
}

export  {ImageGallery};