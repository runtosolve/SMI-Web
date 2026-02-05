import { Stage, Layer, Line, Rect, Text } from 'react-konva'
import { useRef } from 'react'

const BendingMomentDiagram = ({ formData }) => {
  const stageRef = useRef(null)

  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    const link = document.createElement('a')
    link.download = 'bending-moment-diagram.png'
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Generate bending moment curve
  const generateCurve = () => {
    const points = []
    const width = 340
    const height = 100
    const startX = 60
    const baseY = 140
    
    for (let i = 0; i <= width; i += 5) {
      const x = startX + i
      const normalized = i / width
      const y = baseY + height * Math.sin(normalized * Math.PI)
      points.push(x, y)
    }
    
    return points
  }

  return (
    <div onContextMenu={(e) => { e.preventDefault(); handleExport(); }}>
      <Stage width={500} height={300} ref={stageRef}>
        <Layer>
          {/* Background */}
          <Rect x={0} y={0} width={500} height={300} fill="#ffffff" />
          
          {/* Axes */}
          <Line points={[40, 40, 40, 280]} stroke="#000" strokeWidth={1.5} />
          <Line points={[35, 140, 460, 140]} stroke="#000" strokeWidth={1.5} />
          
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((val, i) => (
            <Line
              key={i}
              points={[60 + i * 68, 135, 60 + i * 68, 145]}
              stroke="#999"
              strokeWidth={1}
            />
          ))}
          
          {/* Y-axis labels */}
          <Text x={10} y={35} text="10" fontSize={10} fill="#000" />
          <Text x={10} y={85} text="0" fontSize={10} fill="#000" />
          <Text x={5} y={135} text="-10" fontSize={10} fill="#000" />
          <Text x={5} y={185} text="-20" fontSize={10} fill="#000" />
          <Text x={5} y={235} text="-30" fontSize={10} fill="#000" />
          
          {/* Y-axis label */}
          <Text x={15} y={120} text="kN·m" fontSize={11} fill="#000" rotation={-90} />
          
          {/* X-axis labels */}
          <Text x={55} y={150} text="0.0" fontSize={10} fill="#000" />
          <Text x={120} y={150} text="0.5" fontSize={10} fill="#000" />
          <Text x={185} y={150} text="1.0" fontSize={10} fill="#000" />
          <Text x={250} y={150} text="1.5" fontSize={10} fill="#000" />
          <Text x={315} y={150} text="2.0" fontSize={10} fill="#000" />
          <Text x={380} y={150} text="2.5" fontSize={10} fill="#000" />
          
          {/* X-axis label */}
          <Text x={230} y={170} text="m" fontSize={11} fill="#000" align="center" />
          
          {/* Bending moment curve */}
          <Line
            points={[
              ...generateCurve(),
              400, 140,
              60, 140
            ]}
            stroke="#d32f2f"
            strokeWidth={2}
            fill="rgba(211, 47, 47, 0.15)"
            closed
          />
          
          {/* Max moment indicator */}
          <Line
            points={[230, 140, 230, 240]}
            stroke="#1976d2"
            strokeWidth={1}
            dash={[5, 3]}
          />
          <Text
            x={240}
            y={230}
            text="M max = -25 kN·m"
            fontSize={11}
            fill="#d32f2f"
            fontStyle="bold"
          />
          
          {/* Supports */}
          <Line points={[60, 135, 60, 145]} stroke="#000" strokeWidth={3} />
          <Line points={[400, 135, 400, 145]} stroke="#000" strokeWidth={3} />
        </Layer>
      </Stage>
      <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        Right-click to export as image
      </div>
    </div>
  )
}

export default BendingMomentDiagram
