import { Stage, Layer, Rect, Line, Text, Arrow } from 'react-konva'
import { useRef } from 'react'

const LoadingDiagramGraphic = ({ formData }) => {
  const stageRef = useRef(null)

  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    const link = document.createElement('a')
    link.download = 'loading-diagram.png'
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const imposed = parseFloat(formData.imposed) || 6

  return (
    <div onContextMenu={(e) => { e.preventDefault(); handleExport(); }}>
      <Stage width={500} height={350} ref={stageRef}>
        <Layer>
          {/* Background */}
          <Rect x={0} y={0} width={500} height={350} fill="#ffffff" />
          
          {/* Title */}
          <Text
            x={150}
            y={15}
            text="Loading Diagram"
            fontSize={14}
            fill="#000"
            fontStyle="bold"
          />
          
          {/* Top beam */}
          <Rect x={50} y={80} width={400} height={50} stroke="#000" strokeWidth={2} fill="#e3f2fd" />
          
          {/* UDL arrows - top */}
          {[...Array(9)].map((_, i) => (
            <Arrow
              key={`top-${i}`}
              points={[90 + i * 45, 40, 90 + i * 45, 75]}
              stroke="#d32f2f"
              strokeWidth={2}
              fill="#d32f2f"
              pointerLength={6}
              pointerWidth={6}
            />
          ))}
          
          {/* UDL label */}
          <Text
            x={120}
            y={50}
            text={`UDL = ${imposed} kN/m²`}
            fontSize={11}
            fill="#d32f2f"
            fontStyle="bold"
          />
          
          {/* Support - left */}
          <Line
            points={[70, 135, 70, 155, 55, 170, 85, 170, 70, 155]}
            stroke="#000"
            strokeWidth={2}
            fill="#666"
            closed
          />
          
          {/* Support - right */}
          <Line
            points={[430, 135, 430, 155, 415, 170, 445, 170, 430, 155]}
            stroke="#000"
            strokeWidth={2}
            fill="#666"
            closed
          />
          
          {/* Bottom beam */}
          <Rect x={50} y={220} width={400} height={50} stroke="#000" strokeWidth={2} fill="#e3f2fd" />
          
          {/* UDL arrows - bottom */}
          {[...Array(9)].map((_, i) => (
            <Arrow
              key={`bottom-${i}`}
              points={[90 + i * 45, 280, 90 + i * 45, 315]}
              stroke="#d32f2f"
              strokeWidth={2}
              fill="#d32f2f"
              pointerLength={6}
              pointerWidth={6}
            />
          ))}
          
          {/* Support - bottom left */}
          <Line
            points={[70, 275, 70, 295, 55, 310, 85, 310, 70, 295]}
            stroke="#000"
            strokeWidth={2}
            fill="#666"
            closed
          />
          
          {/* Support - bottom right */}
          <Line
            points={[430, 275, 430, 295, 415, 310, 445, 310, 430, 295]}
            stroke="#000"
            strokeWidth={2}
            fill="#666"
            closed
          />
          
          {/* Point load on bottom beam */}
          <Arrow
            points={[300, 180, 300, 215]}
            stroke="#1976d2"
            strokeWidth={3}
            fill="#1976d2"
            pointerLength={8}
            pointerWidth={8}
          />
          <Text
            x={270}
            y={165}
            text="Point Load"
            fontSize={10}
            fill="#1976d2"
            fontStyle="bold"
          />
          
          {/* Span dimension */}
          <Line points={[70, 330, 430, 330]} stroke="#000" strokeWidth={1} dash={[5, 5]} />
          <Text x={220} y={320} text="Span" fontSize={10} fill="#000" align="center" />
        </Layer>
      </Stage>
      <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        Right-click to export as image
      </div>
    </div>
  )
}

export default LoadingDiagramGraphic
