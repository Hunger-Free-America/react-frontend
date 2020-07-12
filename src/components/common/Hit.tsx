import styled from "styled-components"
import React, { useContext } from "react"
import { GmapsTypeIcon } from "./GmapsType"
import { THitComponent } from "./interface/THit"
import { LocationContext } from "../../contexts/LocationContext"

const getAddress = (hit: any) => {
  const { city, streetAddress } = hit
  return [streetAddress, city].join(", ")
}

interface HitProps {
  selected?: boolean
}

const Hit = styled.div<HitProps>`
  background-color: ${({ selected }) => (selected ? "#f1f3f4" : "")};
  cursor: pointer;
  padding: 17.7px 30px;
`

const HitTitleIcon = styled.div`
  display: flex;
  justify-content: space-between;
`

export const HitComponent = ({ hit }: THitComponent) => {
  const { state, dispatch } = useContext(LocationContext)

  const selectLocation = () => {
    dispatch({
      type: "CHANGE_SELECTED_HIT",
      payload: {
        location: state.location,
        selectedHit: hit.objectID,
      },
    })
  }

  return (
    <Hit
      onClick={() => selectLocation()}
      selected={state.selectedHit === hit.objectID}>
      <HitTitleIcon>
        <div className="hit-name">{hit.name}</div>
        <div>
          <GmapsTypeIcon allGmapsTypes={hit.allGmapsTypes} selectedPin={hit.objectID} />
        </div>
      </HitTitleIcon>
      <div>{getAddress(hit)}</div>
    </Hit>
  )
}
