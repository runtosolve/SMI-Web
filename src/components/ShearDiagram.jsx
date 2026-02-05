import { Stage, Layer, Line, Rect, Text } from 'react-konva'
import { useRef } from 'react'

const ShearDiagram = ({ formData }) => {
  const stageRef = useRef(null)

  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    const link = document.createElement('a')
    link.download = 'shear-diagram.png'
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div onContextMenu={(e) => { e.preventDefault(); handleExport(); }}>
      <Stage width={500} height={300} ref={stageRef}>
        <Layer>
          {/* Background */}
          <Rect x={0} y={0} width={500} height={300} fill="#ffffff" />
          
          {/* Axes */}
          <Line points={[40, 40, 40, 280]} stroke="#000" strokeWidth={1.5} />
          <Line points={[35, 150, 460, 150]} stroke="#000" strokeWidth={1.5} />
          
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((val, i) => (
            <Line
              key={i}
              points={[60 + i * 68, 145, 60 + i * 68, 155]}
              stroke="#999"
              strokeWidth={1}
            />
          ))}
          
          {/* Y-axis labels */}
          <Text x={10} y={45} text="30" fontSize={10} fill="#000" />
          <Text x={10} y={90} text="20" fontSize={10} fill="#000" />
          <Text x={10} y={130} text="10" fontSize={10} fill="#000" />
          <Text x={15} y={145} text="0" fontSize={10} fill="#000" />
          <Text x={5} y={190} text="-10" fontSize={10} fill="#000" />
          <Text x={5} y={235} text="-20" fontSize={10} fill="#000" />
          
          {/* Y-axis label */}
          <Text x={18} y={125} text="kN" fontSize={11} fill="#000" rotation={-90} />
          
          {/* X-axis labels */}
          <Text x={55} y={160} text="0.0" fontSize={10} fill="#000" />
          <Text x={120} y={160} text="0.5" fontSize={10} fill="#000" />
          <Text x={185} y={160} text="1.0" fontSize={10} fill="#000" />
          <Text x={250} y={160} text="1.5" fontSize={10} fill="#000" />
          <Text x={315} y={160} text="2.0" fontSize={10} fill="#000" />
          <Text x={380} y={160} text="2.5" fontSize={10} fill="#000" />
          
          {/* X-axis label */}
          <Text x={230} y={180} text="m" fontSize={11} fill="#000" align="center" />
          
          {/* Shear diagram - positive */}
          <Line
            points={[60, 150, 60, 55, 230, 150]}
            stroke="#ff6f00"
            strokeWidth={2}
            fill="rgba(255, 111, 0, 0.15)"
            closed
          />
          
          {/* Shear diagram - negative */}
          <Line
            points={[230, 150, 400, 245, 400, 150]}
            stroke="#ff6f00"
            strokeWidth={2}
            fill="rgba(255, 111, 0, 0.15)"
            closed
          />
          
          {/* Max shear labels */}
          <Text
            x={65}
            y={40}
            text="V = 28.7 kN"
            fontSize={11}
            fill="#ff6f00"
            fontStyle="bold"
          />
          
          <Text
            x={320}
            y={250}
            text="V = -28.7 kN"
            fontSize={11}
            fill="#ff6f00"
            fontStyle="bold"
          />
          
          {/* Zero shear point */}
          <Line
            points={[230, 145, 230, 155]}
            stroke="#1976d2"
            strokeWidth={2}
            dash={[3, 3]}
          />
          <Text x={240} y={145} text="V = 0" fontSize={10} fill="#1976d2" />
          
          {/* Supports */}
          <Line points={[60, 145, 60, 155]} stroke="#000" strokeWidth={3} />
          <Line points={[400, 145, 400, 155]} stroke="#000" strokeWidth={3} />
        </Layer>
      </Stage>
      <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        Right-click to export as image
      </div>
    </div>
  )
}

export default ShearDiagram
