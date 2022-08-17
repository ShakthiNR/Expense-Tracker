import React from 'react'


const Base = ({title="My Title", children}) => {
  return (
    <>
    <center>{title}
    {children}
  
    </center>
    </>
  )
}

export default Base