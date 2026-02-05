import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva'
import { useRef } from 'react'

const GeneralArrangementGraphic = ({ formData }) => {
  const stageRef = useRef(null)

  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    const link = document.createElement('a')
    link.download = 'general-arrangement.png'
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const span1 = parseFloat(formData.span1) || 3.5
  const span2 = parseFloat(formData.span2) || 3.5
  const totalSpan = span1 + span2
  const scale = 300 / totalSpan // Scale to fit in 300px width

  return (
    <div onContextMenu={(e) => { e.preventDefault(); handleExport(); }}>
      <Stage width={500} height={280} ref={stageRef}>
        <Layer>
          {/* Background */}
          <Rect x={0} y={0} width={500} height={280} fill="#ffffff" />
          
          {/* Main slab */}
          <Rect
            x={80}
            y={60}
            width={340}
            height={140}
            fill="#d0d0d0"
            stroke="#000"
            strokeWidth={1.5}
          />
          
          {/* Support beams */}
          <Rect x={80} y={110} width={340} height={12} fill="#666" stroke="#000" strokeWidth={1} />
          <Rect x={80} y={178} width={340} height={12} fill="#666" stroke="#000" strokeWidth={1} />
          
          {/* Support columns - 3 columns per beam */}
          <Circle x={130} y={116} radius={6} fill="#d32f2f" stroke="#000" strokeWidth={1} />
          <Circle x={250} y={116} radius={6} fill="#d32f2f" stroke="#000" strokeWidth={1} />
          <Circle x={370} y={116} radius={6} fill="#d32f2f" stroke="#000" strokeWidth={1} />
          
          <Circle x={130} y={184} radius={6} fill="#d32f2f" stroke="#000" strokeWidth={1} />
          <Circle x={250} y={184} radius={6} fill="#d32f2f" stroke="#000" strokeWidth={1} />
          <Circle x={370} y={184} radius={6} fill="#d32f2f" stroke="#000" strokeWidth={1} />
          
          {/* Deck corrugation lines */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Line
              key={i}
              points={[110 + i * 50, 60, 110 + i * 50, 200]}
              stroke="#a0a0a0"
              strokeWidth={0.5}
              opacity={0.5}
            />
          ))}
          
          {/* Dimension lines */}
          <Line points={[130, 230, 250, 230]} stroke="#1976d2" strokeWidth={1} dash={[5, 3]} />
          <Line points={[130, 225, 130, 235]} stroke="#1976d2" strokeWidth={2} />
          <Line points={[250, 225, 250, 235]} stroke="#1976d2" strokeWidth={2} />
          <Text
            x={175}
            y={238}
            text={`${span1}`}
            fontSize={13}
            fill="#1976d2"
            fontStyle="bold"
          />
          
          <Line points={[250, 230, 370, 230]} stroke="#1976d2" strokeWidth={1} dash={[5, 3]} />
          <Line points={[370, 225, 370, 235]} stroke="#1976d2" strokeWidth={2} />
          <Text
            x={295}
            y={238}
            text={`${span2}`}
            fontSize={13}
            fill="#1976d2"
            fontStyle="bold"
          />
          
          {/* Vertical dimension */}
          <Line points={[50, 116, 50, 184]} stroke="#1976d2" strokeWidth={1} dash={[5, 3]} />
          <Line points={[45, 116, 55, 116]} stroke="#1976d2" strokeWidth={2} />
          <Line points={[45, 184, 55, 184]} stroke="#1976d2" strokeWidth={2} />
          <Text
            x={20}
            y={142}
            text="150 m"
            fontSize={11}
            fill="#1976d2"
            rotation={-90}
          />
          
          {/* Labels */}
          <Text x={90} y={68} text="Support" fontSize={10} fill="#d32f2f" />
          <Text x={360} y={68} text="Support" fontSize={10} fill="#d32f2f" />
          
          {/* Info box */}
          <Rect x={360} y={10} width={130} height={38} fill="#e3f2fd" stroke="#1976d2" strokeWidth={1} cornerRadius={3} />
          <Text x={368} y={18} text={`Profile: ${formData.profile}`} fontSize={10} fill="#1565c0" />
          <Text x={368} y={32} text={`Grade: ${formData.grade}`} fontSize={10} fill="#1565c0" />
        </Layer>
      </Stage>
      <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
        Right-click to export as image
      </div>
    </div>
  )
}

export default GeneralArrangementGraphic
