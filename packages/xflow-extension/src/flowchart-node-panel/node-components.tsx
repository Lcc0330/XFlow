import React from 'react'
import type { NsGraph } from '@antv/xflow-core'
import { uuidv4 } from '@antv/xflow-core'
import * as nodePathMap from './paths'
import { NODE_HEIGHT, NODE_WIDTH, DefaultNodeConfig } from './constants'
import { GradientComponent } from './gradient-component'
import { colorTransform } from './utils'

export const NodeComponent: NsGraph.INodeRender = props => {
  const { size = { width: NODE_WIDTH, height: NODE_HEIGHT }, data = {}, name } = props

  const {
    stroke = DefaultNodeConfig.stroke,
    label = DefaultNodeConfig.label,
    fill: startColor = DefaultNodeConfig.fill,
    fontFill = DefaultNodeConfig.fontFill,
    fontSize = DefaultNodeConfig.fontSize,
    strokeWidth = DefaultNodeConfig.strokeWidth,
    strokeDasharray,
    fillOpacity = DefaultNodeConfig.fillOpacity,
    angel = DefaultNodeConfig.angel,
    rounded = DefaultNodeConfig.rounded,
    isGradient = DefaultNodeConfig.rounded,
    gradientDirection = DefaultNodeConfig.gradientDirection,
    endColor = DefaultNodeConfig.endColor,
    isBold = DefaultNodeConfig.isBold,
    isItalic = DefaultNodeConfig.isItalic,
    isUnderline = DefaultNodeConfig.isUnderline,
    alignmentBaseline = DefaultNodeConfig.alignmentBaseline,
    textAnchor = DefaultNodeConfig.textAnchor,
    textOpacity = DefaultNodeConfig.textOpacity,
    letterSpacing,
    bgColor,
    bdColor,
    fontFamily = DefaultNodeConfig.fontFamily,
    dy,
    dx,
  } = data

  const { width, height } = size
  const scale = name === 'Text' ? 2 : 1
  const getNodePath = nodePathMap[`${name.replace(/\s+/g, '')}NodePath`]
  const nodePath = getNodePath(props, rounded)

  //用于解决无法动态修改渐变颜色
  let uuid = ''
  if (isGradient) uuid = uuidv4()
  const fill = isGradient ? `url(#${gradientDirection}-${uuid})` : startColor
  const fontWeight = isBold ? 'bold' : 'normal'
  const fontStyle = isItalic ? 'italic' : 'normal'
  const textDecoration = isUnderline ? 'underline' : 'none'
  const textColor = colorTransform(fontFill, textOpacity)

  return (
    <svg
      viewBox={`0 0 ${width / scale} ${height / scale}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ transform: `rotate(${angel}deg)` }}
    >
      <GradientComponent startColor={startColor} endColor={endColor} uuid={uuid} />
      {nodePath.map(path => {
        return (
          <path
            key={path}
            d={path}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            fillOpacity={fillOpacity}
          />
        )
      })}
      <foreignObject
        width={'100%'}
        height={'100%'}
        xmlns="http://www.w3.org/2000/svg"
        className="flowchart-text-editor-container"
      >
        <div className={`flowchart-text-editor-wrapper x-${textAnchor} y-${alignmentBaseline}`}>
          <div
            style={{
              maxWidth: `${width % 2 === 1 ? width - 2 : width - 3}px`,
              maxHeight: `${height % 2 === 1 ? height - 2 : height - 3}px`,
              backgroundColor: bgColor,
              fontSize,
              letterSpacing: letterSpacing,
              color: textColor,
              fontWeight,
              fontStyle,
              textDecoration,
              border: `1px solid ${bdColor}`,
              left: dx,
              top: dy,
              fontFamily,
            }}
          >
            {label}
          </div>
        </div>
      </foreignObject>
      Sorry, your browser does not support inline SVG.
    </svg>
  )
}