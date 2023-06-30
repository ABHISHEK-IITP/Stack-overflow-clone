import React from 'react'

const Avatar = ({children, backgroundColor,px,py,Color,borderRadius,fontSize,cursor}) => {
    const style = {
        backgroundColor,
        padding: `${py} ${px}`,
        Color: Color || 'black',
        borderRadius,
        fontSize,
        textAlign: "center",
        cursor: cursor || null
    }
  return (
    <div style={style}>
        {children}
    </div>
  )
}

export default Avatar