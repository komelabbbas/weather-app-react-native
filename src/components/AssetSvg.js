import React, { Component } from 'react'
import { SvgXml } from 'react-native-svg'
import {
  cloudyIcon,
  menuIcon,
  moonIcon,
  rainIcon,
  searchIcon,
  sunIcon
} from '../icons'

export class AssetSvg extends Component {
  static icons = {
    cloudy: cloudyIcon,
    menu: menuIcon,
    moon: moonIcon,
    rain: rainIcon,
    search: searchIcon,
    sun: sunIcon
  }

  render() {
    const { name, width = 30, height = 30, style, fill } = this.props
    return (
      <SvgXml
        xml={name}
        width={width}
        height={height}
        style={style}
        fill={fill}
      />
    )
  }
}
