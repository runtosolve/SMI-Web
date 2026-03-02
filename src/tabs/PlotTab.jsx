import { useState, useEffect } from 'react'
import { Card, Spin } from 'antd'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import { api } from '../api'

const PLOT_W = 640
const PLOT_H = 320

const PlotTab = () => {
  const [plotImage, setPlotImage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.plot()
      .then(data => {
        const img = new window.Image()
        img.src = data.image
        img.onload = () => setPlotImage(img)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <Card
        size="small"
        title="Plot"
        style={{ borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)', display: 'inline-block' }}
      >
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: PLOT_W, height: PLOT_H }}>
            <Spin />
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stage width={PLOT_W} height={PLOT_H}>
              <Layer>
                {plotImage && (
                  <KonvaImage image={plotImage} x={0} y={0} width={PLOT_W} height={PLOT_H} />
                )}
              </Layer>
            </Stage>
          </div>
        )}
      </Card>
    </div>
  )
}

export default PlotTab
