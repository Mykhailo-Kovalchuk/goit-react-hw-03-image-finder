// import React from 'react'
import css from './imageGalleryItem.module.css'

const ImageGalleryItem = ({picturesQuery}) => {
  
const galleryPhotos = picturesQuery?.map(picture => {
  // console.log(picture)

  return  ( <li key={picture.id} className={css.ImageGalleryItem}>
  <img src={picture.webformatURL} alt={picture.tags} width='350px' />
</li>)
  

});

return (
  
<>
  {/* // < className={css.ImageGalleryItem}> */}

  {galleryPhotos}
  </>
)


}

export  {ImageGalleryItem};