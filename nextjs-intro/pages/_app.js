import React from 'react'
import Navbar from '../components/Navbar'

import "../styles/globals.css"

function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps}/>
      
      <style jsx global>{`
        a {
          color: teal;
        }
      `}</style>
    </>
  )
}

export default App