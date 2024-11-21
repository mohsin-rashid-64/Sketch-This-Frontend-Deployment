import React from 'react'
import BoardDetail from './BoardDetail'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function Board() {
  return (
    <React.Fragment>
        <Navbar />
      <BoardDetail />
      <Footer />
    </React.Fragment>
  )
}

export default Board
