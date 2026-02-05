import { Stage, Layer, Line, Rect, Text, Circle } from 'react-konva'
import { useRef } from 'react'

const CrossSectionGraphic = ({ formData }) => {
  const stageRef = useRef(null)

  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    const link = document.createElement('a')
    link.download = 'cross-section.png'
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
          
          {/* Title */}
          <Line points={[50, 45, 450, 45]} stroke="#000" strokeWidth={0.5} />
          <Text
            x={200}
            y={25}
            text={`${formData.meshCover} mm cover to ${formData.meshType}`}
            fontSize={11}
            fill="#000"
          />
          
          {/* Concrete slab */}
          <Rect
            x={50}
            y={50}
            width={400}
            height={60}
            fill="#c0c0c0"
            stroke="#000"
            strokeWidth={1}
          />
          
          {/* Steel deck profile - simplified */}
          {/* Wave 1 */}
          <Line
            points={[80, 110, 95, 130, 110, 130, 125, 110, 125, 180, 110, 200, 95, 200, 80, 180, 80, 110]}
            stroke="#000"
            strokeWidth={1.5}
            fill="#888"
            closed
          />
          <Circle x={102.5} y={125} radius={2.5} fill="#555" />
          <Circle x={102.5} y={145} radius={2.5} fill="#555" />
          <Circle x={102.5} y={165} radius={2.5} fill="#555" />
          
          {/* Wave 2 */}
          <Line
            points={[180, 110, 195, 130, 210, 130, 225, 110, 225, 180, 210, 200, 195, 200, 180, 180, 180, 110]}
            stroke="#000"
            strokeWidth={1.5}
            fill="#888"
            closed
          />
          <Circle x={202.5} y={125} radius={2.5} fill="#555" />
          <Circle x={202.5} y={145} radius={2.5} fill="#555" />
          <Circle x={202.5} y={165} radius={2.5} fill="#555" />
          
          {/* Wave 3 */}
          <Line
            points={[280, 110, 295, 130, 310, 130, 325, 110, 325, 180, 310, 200, 295, 200, 280, 180, 280, 110]}
            stroke="#000"
            strokeWidth={1.5}
            fill="#888"
            closed
          />
          <Circle x={302.5} y={125} radius={2.5} fill="#555" />
          <Circle x={302.5} y={145} radius={2.5} fill="#555" />
          <Circle x={302.5} y={165} radius={2.5} fill="#555" />
          
          {/* Flat sections */}
          <Rect x={125} y={108} width={55} height={3} fill="#888" stroke="#000" strokeWidth={0.5} />
          <Rect x={225} y={108} width={55} height={3} fill="#888" stroke="#000" strokeWidth={0.5} />
          <Rect x={325} y={108} width={55} height={3} fill="#888" stroke="#000" strokeWidth={0.5} />
          
          {/* Label */}
          <Text
            x={170}
            y={220}
            text={`${formData.profile} - ${formData.thickness}`}
            fontSize={12}
            fill="#000"
            fontStyle="bold"
          />
          
          {/* Dimension - Total depth */}
          <Line points={[465, 50, 465, 110]} stroke="#1976d2" strokeWidth={1.5} />
          <Line points={[460, 50, 470, 50]} stroke="#1976d2" strokeWidth={1.5} />
          <Line points={[460, 110, 470, 110]} stroke="#1976d2" strokeWidth={1.5} />
          <Text x={472} y={75} text={`${formData.slabDepth}mm`} fontSize={10} fill="#1976d2" />
        </Layer>
      </Stage>
      <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        Right-click to export as image
      </div>
    </div>
  )
}

export default CrossSectionGraphic
