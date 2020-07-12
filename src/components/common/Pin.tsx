import React from "react"

import { PlaceIcon } from "./PlaceIcon"
import { Icon as PinProps } from "./interface/Icon"

import genericPin from "../../assets/genericPin.svg"
import genericPinSelected from "../../assets/genericPinSelected.svg"
import govPin from "../../assets/govPin.svg"
import govPinSelected from "../../assets/govPinSelected.svg"
import schoolPin from "../../assets/schoolPin.svg"
import schoolPinSelected from "../../assets/schoolPinSelected.svg"
import worshipPin from "../../assets/worshipPin.svg"
import worshipPinSelected from "../../assets/worshipPinSelected.svg"

export const Pin = ({ allGmapsTypes, selectedPin }: PinProps) => {
  switch (allGmapsTypes ? allGmapsTypes[0] : "") {
    case "school" || "primary_school":
      return (
        <PlaceIcon
          width="28px"
          alt="School"
          icon={schoolPin}
          redIcon={schoolPinSelected}
          selectedPin={selectedPin}
        />
      )
    case "church" || "place_of_worship":
      return (
        <PlaceIcon
          width="28px"
          icon={worshipPin}
          alt="Place of worship"
          redIcon={worshipPinSelected}
          selectedPin={selectedPin}
        />
      )
    case "establishment":
      return (
        <PlaceIcon
          width="28px"
          icon={govPin}
          alt="Government"
          redIcon={govPinSelected}
          selectedPin={selectedPin}
        />
      )
    default:
      return (
        <PlaceIcon
          width="28px"
          alt="Generic Charity Site"
          icon={genericPin}
          redIcon={genericPinSelected}
          selectedPin={selectedPin}
        />
      )
  }
}
