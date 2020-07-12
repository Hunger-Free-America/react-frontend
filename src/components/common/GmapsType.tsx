import React from "react"

import { Icon } from "./interface/Icon"
import { PlaceIcon } from "./PlaceIcon"

import generic from "../../assets/genericIcon.svg"
import genericSelected from "../../assets/genericIconSelected.svg"
import gov from "../../assets/govIcon.svg"
import govSelected from "../../assets/govIconSelected.svg"
import school from "../../assets/schoolIcon.svg"
import schoolSelected from "../../assets/schoolIconSelected.svg"
import worship from "../../assets/worshipIcon.svg"
import worshipSelected from "../../assets/worshipIconSelected.svg"

export const GmapsTypeIcon = ({
  allGmapsTypes,
  includeText,
  selectedPin,
}: Icon) => {
  switch (allGmapsTypes ? allGmapsTypes[0] : "") {
    case "school" || "primary_school":
      return (
        <>
          <PlaceIcon
            alt="School"
            icon={school}
            redIcon={schoolSelected}
            selectedPin={selectedPin}
          />
          {includeText && <span>School</span>}
        </>
      )
    case "church" || "place_of_worship":
      return (
        <>
          <PlaceIcon
            icon={worship}
            redIcon={worshipSelected}
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
            redIcon={govSelected}
            selectedPin={selectedPin}
          />
          {includeText && <span>Government Building</span>}
        </>
      )
    default:
      return (
        <>
          <PlaceIcon
            icon={generic}
            alt="Generic Charity Site"
            redIcon={genericSelected}
            selectedPin={selectedPin}
          />
          {includeText && <span>Generic Charity Site</span>}
        </>
      )
  }
}
