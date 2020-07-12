import React from "react"

import { PlaceIcon } from "./PlaceIcon"
import govPin from "../../assets/pins/govPin.png"
import { Icon as PinProps } from "./interface/Icon"
import govPinRed from "../../assets/pins/govPinRed.png"
import schoolPin from "../../assets/pins/schoolPin.png"
import worshipPin from "../../assets/pins/worshipPin.png"
import schoolPinRed from "../../assets/pins/schoolPinRed.png"
import worshipPinRed from "../../assets/pins/worshipPinRed.png"

export const Pin = ({ allGmapsTypes, selectedPin }: PinProps) => {
  switch (allGmapsTypes ? allGmapsTypes[0] : "") {
    case "school":
    case "primary_school":
      return (
        <PlaceIcon
          width="30px"
          alt="School"
          icon={schoolPin}
          redIcon={schoolPinRed}
          selectedPin={selectedPin}
        />
      )
    case "church":
    case "place_of_worship":
      return (
        <PlaceIcon
          width="30px"
          icon={worshipPin}
          alt="Place of worship"
          redIcon={worshipPinRed}
          selectedPin={selectedPin}
        />
      )
    case "establishment":
      return (
        <PlaceIcon
          width="30px"
          icon={govPin}
          alt="Government"
          redIcon={govPinRed}
          selectedPin={selectedPin}
        />
      )
    default:
      return (
        <PlaceIcon
          width="30px"
          icon={govPin}
          alt="Government"
          redIcon={govPinRed}
          selectedPin={selectedPin}
        />
      )
  }
}
