import React from "react"
import "./App.css"
import { gql, useQuery, useSubscription } from "@apollo/client"

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

const SUBSCRIPTION = gql`
  subscription CubeChange {
    cubeChange {
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
  id: string
  sides: Array<Side>
}

const sideStyle = (side: Side | undefined): React.CSSProperties => {
  if (!side) return {}
  return {
    backgroundColor: `rgb(${side.red},${side.green},${side.blue})`,
    border: "1px solid #ccc",
  }
}

function App() {
  const query = useQuery<{ cube: Cube }>(THE_CUBE_QUERY)
  const subscription = useSubscription<{ cubeChange: Cube }>(SUBSCRIPTION)
  if (query.loading) return <p>Loading...</p>
  if (query.error) return <p>Error :(</p>
  const cube = subscription.data?.cubeChange || query.data?.cube
  const up = cube?.sides.find((side) => side.id === "up")
  const down = cube?.sides.find((side) => side.id === "down")
  const back = cube?.sides.find((side) => side.id === "back")
  const front = cube?.sides.find((side) => side.id === "front")
  const left = cube?.sides.find((side) => side.id === "left")
  const right = cube?.sides.find((side) => side.id === "right")

  return (
    <table>
      <tbody>
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
      </tbody>
    </table>
  )
}

export default App
