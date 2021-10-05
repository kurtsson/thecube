import React from "react"
import "./App.css"
import { gql, useQuery } from "@apollo/client"

const THE_CUBE_QUERY = gql`
  query Cube {
    cube {
      id
      sides {
        id
        red
        green
        blue
      }
    }
  }
`

type Side = {
  id: string
  red: number
  green: number
  blue: number
}

type Cube = {
  cube: {
    id: string
    sides: Array<Side>
  }
}

const sideStyle = (side: Side | undefined): React.CSSProperties => {
  if (!side) return {}
  return {
    backgroundColor: `rgb(${side.red},${side.green},${side.blue})`,
  }
}

function App() {
  const { loading, error, data } = useQuery<Cube>(THE_CUBE_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.log(data)
  const up = data?.cube.sides.find((side) => side.id === "up")
  const down = data?.cube.sides.find((side) => side.id === "down")
  const back = data?.cube.sides.find((side) => side.id === "back")
  const front = data?.cube.sides.find((side) => side.id === "front")
  const left = data?.cube.sides.find((side) => side.id === "left")
  const right = data?.cube.sides.find((side) => side.id === "right")

  return (
    <table>
      <tr>
        <td></td>
        <td style={sideStyle(up)}>UP</td>
        <td></td>
      </tr>
      <tr>
        <td style={sideStyle(left)}>LEFT</td>
        <td style={sideStyle(front)}>FRONT</td>
        <td style={sideStyle(right)}>RIGHT</td>
      </tr>
      <tr>
        <td></td>
        <td style={sideStyle(down)}>DOWN</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td style={sideStyle(back)}>BACK</td>
        <td></td>
      </tr>
    </table>
  )
}

export default App
