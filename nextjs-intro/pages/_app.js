import React from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

import "../styles/globals.css"

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps}/>
      
      <style jsx global>{`
        a {
          color: teal;
        }
      `}</style>
    </Layout>
  )
}

export default App