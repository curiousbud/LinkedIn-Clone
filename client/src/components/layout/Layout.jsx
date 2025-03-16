import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div className='min-h-screen bg-base-100'>
      <Navbar />
      <main className="border-2 border-dashed border-blue-500">
  Hello
</main>
    </div>
  )
}

export default Layout