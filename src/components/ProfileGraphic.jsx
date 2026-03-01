import { useMemo } from 'react'
import { Stage, Layer, Line, Rect, Text } from 'react-konva'

const PAD = { x: 16, top: 24, bottom: 10 }
const CANVAS_W = 468
const CANVAS_H = 110

const ProfileGraphic = ({ profileName, profileData, slabDepthMm = 150 }) => {
  const points = useMemo(() => {
    if (!profileData) return []
    const { X, Y } = profileData
    const xMax = Math.max(...X)
    const yMax = Math.max(...Y)

    // slab depth in same units as profile (inches)
    const slabDepthIn = slabDepthMm / 25.4
    const totalH = Math.max(slabDepthIn, yMax * 1.1)

    const drawW = CANVAS_W - PAD.x * 2
    const drawH = CANVAS_H - PAD.top - PAD.bottom

    const sx = v => PAD.x + (v / xMax) * drawW
    // Y=0 is bottom, Y=max is top; canvas Y is inverted
    const sy = v => PAD.top + drawH - (v / totalH) * drawH

    const pts = []
    for (let i = 0; i < X.length; i++) pts.push(sx(X[i]), sy(Y[i]))
    // close polygon at bottom
    pts.push(sx(xMax), sy(0), sx(0), sy(0))
    return pts
  }, [profileData, slabDepthMm])

  const concreteRect = useMemo(() => {
    if (!profileData) return null
    const yMax = Math.max(...profileData.Y)
    const slabDepthIn = slabDepthMm / 25.4
    const totalH = Math.max(slabDepthIn, yMax * 1.1)
    const drawH = CANVAS_H - PAD.top - PAD.bottom
    const xMax = Math.max(...profileData.X)
    const drawW = CANVAS_W - PAD.x * 2

    const concreteTop = PAD.top
    const concreteBottom = PAD.top + drawH - (yMax / totalH) * drawH
    return {
      x: PAD.x,
      y: concreteTop,
      width: drawW,
      height: concreteBottom - concreteTop,
    }
  }, [profileData, slabDepthMm])

  return (
    <Stage width={CANVAS_W} height={CANVAS_H}>
      <Layer>
        {/* Label */}
        <Text
          text={profileName}
          x={PAD.x}
          y={6}
          fontSize={11}
          fontStyle="bold"
          fill="#455a64"
        />

        {/* Concrete fill */}
        {concreteRect && (
          <Rect
            x={concreteRect.x}
            y={concreteRect.y}
            width={concreteRect.width}
            height={concreteRect.height}
            fill="#cfd8dc"
            stroke="#b0bec5"
            strokeWidth={0.5}
          />
        )}

        {/* Steel deck profile */}
        {points.length > 0 && (
          <Line
            points={points}
            fill="#78909c"
            stroke="#37474f"
            strokeWidth={1.2}
            closed
          />
        )}
      </Layer>
    </Stage>
  )
}

export default ProfileGraphic
