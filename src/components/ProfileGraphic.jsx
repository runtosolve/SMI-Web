import React, { useMemo } from 'react'
import { Stage, Layer, Line, Rect, Text } from 'react-konva'

const CANVAS_W = 468
const CANVAS_H = 155
const PL = 42   // left pad (Y axis labels)
const PR = 10   // right pad
const PT = 20   // top pad (title)
const PB = 28   // bottom pad (X axis labels)

const AXIS_COLOR  = '#546e7a'
const TICK_COLOR  = '#78909c'
const LABEL_COLOR = '#546e7a'
const TICK_LEN    = 4

const ProfileGraphic = ({ profileName, profileData, slabDepthMm = 150 }) => {
  const derived = useMemo(() => {
    if (!profileData) return null
    const { X, Y } = profileData
    const xMax = Math.max(...X)
    const yMax = Math.max(...Y)
    const slabDepthIn = slabDepthMm / 25.4
    const totalH = Math.max(slabDepthIn, yMax * 1.1)

    const drawW = CANVAS_W - PL - PR
    const drawH = CANVAS_H - PT - PB

    const sx = v => PL + (v / xMax) * drawW
    const sy = v => PT + drawH - (v / totalH) * drawH

    // profile polygon points
    const pts = []
    for (let i = 0; i < X.length; i++) pts.push(sx(X[i]), sy(Y[i]))
    pts.push(sx(xMax), sy(0), sx(0), sy(0))

    // concrete rect
    const concreteRect = {
      x: PL, y: PT, width: drawW,
      height: sy(yMax) - PT,
    }

    // X axis ticks: every 6 inches
    const xTicks = []
    for (let t = 0; t <= xMax; t += 6) {
      xTicks.push({ val: t, px: sx(t) })
    }

    // Y axis ticks: 0, yMax/2, yMax (in inches, label converted to mm)
    const ySteps = [0, yMax / 2, yMax]
    const yTicks = ySteps.map(v => ({ val: v, py: sy(v) }))

    const axisY = sy(0)  // bottom of draw area

    return { pts, concreteRect, xTicks, yTicks, axisY, drawW, totalH, yMax, xMax }
  }, [profileData, slabDepthMm])

  if (!derived) return null
  const { pts, concreteRect, xTicks, yTicks, axisY, drawW, yMax, xMax } = derived

  return (
    <Stage width={CANVAS_W} height={CANVAS_H}>
      <Layer>
        {/* Title */}
        <Text text={profileName} x={PL} y={4} fontSize={11} fontStyle="bold" fill="#37474f" />

        {/* Concrete fill */}
        <Rect
          x={concreteRect.x} y={concreteRect.y}
          width={concreteRect.width} height={concreteRect.height}
          fill="#cfd8dc" stroke="#b0bec5" strokeWidth={0.5}
        />

        {/* Steel deck profile */}
        <Line points={pts} fill="#78909c" stroke="#37474f" strokeWidth={1.2} closed />

        {/* X axis line */}
        <Line points={[PL, axisY, PL + drawW, axisY]} stroke={AXIS_COLOR} strokeWidth={1} />

        {/* Y axis line */}
        <Line points={[PL, PT, PL, axisY]} stroke={AXIS_COLOR} strokeWidth={1} />

        {/* X ticks & labels */}
        {xTicks.map(({ val, px }) => (
          <React.Fragment key={`xt-${val}`}>
            <Line points={[px, axisY, px, axisY + TICK_LEN]} stroke={TICK_COLOR} strokeWidth={1} />
            <Text
              text={`${val}"`}
              x={px - 8} y={axisY + TICK_LEN + 2}
              fontSize={9} fill={LABEL_COLOR}
            />
          </React.Fragment>
        ))}

        {/* Y ticks & labels (in mm) */}
        {yTicks.map(({ val, py }) => (
          <React.Fragment key={`yt-${val}`}>
            <Line points={[PL - TICK_LEN, py, PL, py]} stroke={TICK_COLOR} strokeWidth={1} />
            <Text
              text={`${Math.round(val * 25.4)}mm`}
              x={0} y={py - 5}
              width={PL - TICK_LEN - 2} align="right"
              fontSize={9} fill={LABEL_COLOR}
            />
          </React.Fragment>
        ))}

        {/* Axis unit labels */}
        <Text text='X (in)' x={PL + drawW - 20} y={axisY + PB - 12} fontSize={9} fill={AXIS_COLOR} fontStyle="italic" />
        <Text text='Y' x={PL + 4} y={PT} fontSize={9} fill={AXIS_COLOR} fontStyle="italic" />
      </Layer>
    </Stage>
  )
}

export default ProfileGraphic
