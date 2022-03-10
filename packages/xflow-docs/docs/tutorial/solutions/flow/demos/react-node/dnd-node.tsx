import React from 'react'
import './dnd-node.less'

export const DndNode = props => {
  const { size = { width: 100, height: 80 }, data } = props
  const { width, height } = size
  const { label, stroke, fill, fontFill, fontSize } = data

  return (
    <div
      className="container"
      style={{
        width,
        height,
        borderColor: stroke,
        backgroundColor: fill,
        color: fontFill,
        fontSize,
      }}
    >
      <span>{label}</span>
    </div>
  )
}