import React, { Component } from 'react';

import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Footer from '../../components/footer/footer';


class Layout extends Component {

   state = {}

  render() {
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }

}

export default Layout;
