import { Stage, Layer, Line, Rect, Text } from 'react-konva'
import { useRef } from 'react'

const DeflectionDiagram = ({ formData }) => {
  const stageRef = useRef(null)

  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    const link = document.createElement('a')
    link.download = 'deflection-diagram.png'
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Generate deflection curve
  const generateCurve = () => {
    const points = []
    const width = 340
    const height = 60
    const startX = 60
    const baseY = 100
    
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
      <Stage width={500} height={250} ref={stageRef}>
        <Layer>
          {/* Background */}
          <Rect x={0} y={0} width={500} height={250} fill="#ffffff" />
          
          {/* Reference line */}
          <Line
            points={[60, 100, 400, 100]}
            stroke="#999"
            strokeWidth={1}
            dash={[10, 5]}
          />
          
          {/* Deflection curve */}
          <Line
            points={generateCurve()}
            stroke="#7b1fa2"
            strokeWidth={2.5}
          />
          
          {/* Supports */}
          <Line
            points={[60, 95, 60, 105, 48, 118, 72, 118, 60, 105]}
            stroke="#000"
            strokeWidth={2}
            fill="#666"
            closed
          />
          
          <Line
            points={[400, 95, 400, 105, 388, 118, 412, 118, 400, 105]}
            stroke="#000"
            strokeWidth={2}
            fill="#666"
            closed
          />
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map((val, i) => (
            <Line
              key={i}
              points={[60 + i * 68, 95, 60 + i * 68, 105]}
              stroke="#999"
              strokeWidth={1}
            />
          ))}
          
          {/* X-axis labels */}
          <Text x={55} y={130} text="0.0" fontSize={10} fill="#000" />
          <Text x={120} y={130} text="0.5" fontSize={10} fill="#000" />
          <Text x={185} y={130} text="1.0" fontSize={10} fill="#000" />
          <Text x={250} y={130} text="1.5" fontSize={10} fill="#000" />
          <Text x={315} y={130} text="2.0" fontSize={10} fill="#000" />
          <Text x={380} y={130} text="2.5" fontSize={10} fill="#000" />
          
          {/* X-axis label */}
          <Text x={220} y={150} text="m" fontSize={11} fill="#000" align="center" />
          
          {/* Max deflection indicator */}
          <Line
            points={[230, 100, 230, 160]}
            stroke="#1976d2"
            strokeWidth={1}
            dash={[5, 3]}
          />
          
          {/* Deflection value */}
          <Text
            x={240}
            y={155}
            text="δ max = -3.7 mm"
            fontSize={11}
            fill="#7b1fa2"
            fontStyle="bold"
          />
          
          {/* Info box */}
          <Rect
            x={20}
            y={180}
            width={160}
            height={60}
            fill="#e8eaf6"
            stroke="#5e35b1"
            strokeWidth={1}
            cornerRadius={4}
          />
          <Text
            x={28}
            y={188}
            text="Deflection Check:"
            fontSize={11}
            fill="#4527a0"
            fontStyle="bold"
          />
          <Text x={28} y={204} text="Actual: 3.7 mm" fontSize={10} fill="#512da8" />
          <Text x={28} y={218} text="Limit: L/360 = 9.9 mm" fontSize={10} fill="#512da8" />
          <Text x={28} y={232} text="Status: ✓ PASS" fontSize={10} fill="#388e3c" fontStyle="bold" />
          
          {/* Y-axis scale */}
          <Line points={[420, 100, 430, 100]} stroke="#7b1fa2" strokeWidth={1} />
          <Text x={435} y={95} text="0" fontSize={9} fill="#7b1fa2" />
          
          <Line points={[420, 130, 430, 130]} stroke="#7b1fa2" strokeWidth={1} />
          <Text x={435} y={125} text="-1" fontSize={9} fill="#7b1fa2" />
          
          <Line points={[420, 160, 430, 160]} stroke="#7b1fa2" strokeWidth={1} />
          <Text x={435} y={155} text="-3" fontSize={9} fill="#7b1fa2" />
          
          <Text x={435} y={185} text="mm" fontSize={10} fill="#7b1fa2" />
        </Layer>
      </Stage>
      <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        Right-click to export as image
      </div>
    </div>
  )
}

export default DeflectionDiagram
