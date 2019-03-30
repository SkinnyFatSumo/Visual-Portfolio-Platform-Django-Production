// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import Carousel from 'react-bootstrap/Carousel';

// ------------------------------------------------------------------------- //
//                           PHOTO GALLERY ROOT                              //
// ------------------------------------------------------------------------- //

function PhotoGallery(props) {
  // Generate Individual Slides for All Photos in the Gallery
  const slides = props.photos.map(photo => (
    <Carousel.Item>
      <div className="carousel-item-container">
        <div className="carousel-image">
          <img src={props.photo.photo_source} href={props.photo.photo_source} />
        </div>
        <div className="carousel-detail-container">
          <h1>This will be a Dropdown(up) Item with photo info</h1>
        </div>
      </div>
    </Carousel.Item>
  ));
  return <Carousel>{slides}</Carousel>;
}

export default PhotoGallery;
