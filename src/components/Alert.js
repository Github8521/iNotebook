import React from 'react'

export default function Alert(props) {
  const capitalizeFirstLetter=(string)=> {
    if(string==='danger'){
      string='error'
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
    <div style={{height:'100px'}}>
   { props.alert &&<div className={`alert alert-${props.alert.type} alert-dismissible fade show` }role="alert">
    <strong>{capitalizeFirstLetter( props.alert.type)}!</strong> {props.alert.msg}.
  </div>}
  </div>
  </>
  )
}
