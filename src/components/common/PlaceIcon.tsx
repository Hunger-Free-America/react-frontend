import React, { useContext } from "react"
import { LocationContext } from "../../contexts/LocationContext"
import styled from "styled-components"

interface PlaceIconProps {
  alt?: string
  icon: string
  redIcon: string
  selectedPin?: string
  width?: string
}

interface IconProps {
  width?: string
}

const Icon = styled.img<IconProps>`
  width: ${({ width }) => (width ? width : "20px")};
`

export const PlaceIcon = ({
  alt,
  icon,
  redIcon,
  selectedPin,
  width,
}: PlaceIconProps) => {
  const {
    state: { selectedHit },
  } = useContext(LocationContext)
  const src = selectedHit === selectedPin ? redIcon : icon

  return (
    <Icon
      alt={alt}
      src={src}
      width={width}
    />
  )
}
