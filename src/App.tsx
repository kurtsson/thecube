import React from "react"
import "./App.css"
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client"
import { hexToRgb, sideHex } from "./util"

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

const MUTATION = gql`
  mutation UpdateSide($side: SideInput) {
    updateSide(side: $side) {
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

const sideStyle = (side: Side | undefined): React.CSSProperties => {
  if (!side) return {}
  return {
    backgroundColor: `rgb(${side.red},${side.green},${side.blue})`,
    border: "1px solid #ccc",
  }
}

const spinnerSideStyle = (side: Side | undefined): React.CSSProperties => {
  if (!side) return {}
  return {
    backgroundColor: `rgb(${side.red},${side.green},${side.blue},0.8)`,
  }
}

function App() {
  const query = useQuery<{ cube: Cube }>(THE_CUBE_QUERY)
  const [mutateFunction] = useMutation(MUTATION)
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

  const changeColor = (side: string, hex: string) => {
    console.log(side, hex)
    console.log(hexToRgb(hex))
    const colors = hexToRgb(hex)
    if (colors === null) return
    mutateFunction({
      variables: {
        side: {
          id: side,
          red: colors.r,
          green: colors.g,
          blue: colors.b,
        },
      },
    })
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td style={sideStyle(up)}>
              <input
                type="color"
                defaultValue={sideHex(up)}
                onChange={(event) => {
                  changeColor("up", event.currentTarget.value)
                }}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td style={sideStyle(left)}>
              <input
                type="color"
                defaultValue={sideHex(left)}
                onChange={(event) => {
                  changeColor("left", event.currentTarget.value)
                }}
              />
            </td>
            <td style={sideStyle(front)}>
              <input
                type="color"
                defaultValue={sideHex(front)}
                onChange={(event) => {
                  changeColor("front", event.currentTarget.value)
                }}
              />
            </td>
            <td style={sideStyle(right)}>
              <input
                type="color"
                defaultValue={sideHex(right)}
                onChange={(event) => {
                  changeColor("right", event.currentTarget.value)
                }}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td style={sideStyle(down)}>
              <input
                type="color"
                defaultValue={sideHex(down)}
                onChange={(event) => {
                  changeColor("down", event.currentTarget.value)
                }}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td style={sideStyle(back)}>
              <input
                type="color"
                defaultValue={sideHex(back)}
                onChange={(event) => {
                  changeColor("back", event.currentTarget.value)
                }}
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="spinner">
        <div className="face1" style={spinnerSideStyle(up)} />
        <div className="face2" style={spinnerSideStyle(down)} />
        <div className="face3" style={spinnerSideStyle(left)} />
        <div className="face4" style={spinnerSideStyle(right)} />
        <div className="face5" style={spinnerSideStyle(front)} />
        <div className="face6" style={spinnerSideStyle(back)} />
      </div>
    </>
  )
}

export default App
