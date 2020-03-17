import React from 'react';

import './main.css';
import Form from '../../widget/form/form';

const Main = (props) => {

  let fondo = "";
  (window.screen.width < 768)? fondo = "wallpaper_mobil.jpg" : fondo = "wallpaper_desktop.jpg"


  return (
    <main style={{ backgroundImage: `url("./img/${fondo}")` }}>
      <Form/>
    </main>
  )
}

export default Main
