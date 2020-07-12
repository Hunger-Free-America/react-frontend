import React from "react"

import gov from "../../assets/gov.png"
import { Icon } from "./interface/Icon"
import { PlaceIcon } from "./PlaceIcon"
import govRed from "../../assets/govRed.png"
import school from "../../assets/school.png"
import worship from "../../assets/worship.png"
import schoolRed from "../../assets/schoolRed.png"
import worshipRed from "../../assets/worshipRed.png"

export const GmapsTypeIcon = ({
  allGmapsTypes,
  includeText,
  selectedPin,
}: Icon) => {
  switch (allGmapsTypes ? allGmapsTypes[0] : "") {
    case "school":
    case "primary_school":
      return (
        <>
          <PlaceIcon
            alt="School"
            icon={school}
            redIcon={schoolRed}
            selectedPin={selectedPin}
          />
          {includeText && <span>School</span>}
        </>
      )
    case "church":
    case "place_of_worship":
      return (
        <>
          <PlaceIcon
            icon={worship}
            redIcon={worshipRed}
            alt="Place of worship"
            selectedPin={selectedPin}
          />
          {includeText && <span>Place of Worship</span>}
        </>
      )
    case "establishment":
      return (
        <>
          <PlaceIcon
            icon={gov}
            alt="Government"
            redIcon={govRed}
            selectedPin={selectedPin}
          />
          {includeText && <span>Government Building - Food Pantry</span>}
        </>
      )
    default:
      return (
        <>
          <PlaceIcon
            icon={gov}
            alt="Government"
            redIcon={govRed}
            selectedPin={selectedPin}
          />
          {includeText && <span>Government Building - Food Pantry</span>}
        </>
      )
  }
}
