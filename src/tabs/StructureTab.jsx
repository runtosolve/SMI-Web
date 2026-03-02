import { useState, useEffect, useRef } from 'react'
import {
  Card, Collapse, Form, Select, InputNumber, Space, Typography,
  Divider, Row, Col, Statistic, Tag, Table, Alert, Spin
} from 'antd'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import CrossSectionGraphic from '../components/CrossSectionGraphic'
import ProfileGraphic from '../components/ProfileGraphic'
import profileWH from '../data/profile_WH.json'
import profile2WH from '../data/profile_2WH.json'
import profile3WH from '../data/profile_3WH.json'
import { api } from '../api'

const PROFILES = {
  'WH-38-152': profileWH,
  '2WH-36':    profile2WH,
  '3WH-36':    profile3WH,
}

const { Text } = Typography
const { Panel } = Collapse

const LABEL_WIDTH = 170

const StructureTab = ({ formData, updateFormData }) => {
  const [plotImage, setPlotImage]   = useState(null)
  const [plotLoading, setPlotLoading] = useState(true)

  useEffect(() => {
    api.plot()
      .then(data => {
        const img = new window.Image()
        img.src = data.image
        img.onload = () => setPlotImage(img)
      })
      .finally(() => setPlotLoading(false))
  }, [])

  const PLOT_W = 540
  const PLOT_H = 240
  const resultItems = [
    { label: 'Max Unity Factor', value: formData.maxUnityFactor, color: '#1565c0' },
    { label: 'Normal Stage',     value: formData.normalStage,    color: '#2e7d32' },
    { label: 'Serviceability',   value: formData.serviceability, color: '#e65100' },
    { label: 'Fire',             value: formData.fire,           color: '#b71c1c' },
  ]

  const formProps = {
    layout: 'horizontal',
    size: 'small',
    className: 'mui-form',
    labelCol: { style: { width: LABEL_WIDTH, textAlign: 'left' } },
    wrapperCol: { flex: 1 },
    colon: false,
  }

  return (
    <div className="split-container">
      {/* Left Panel */}
      <div className="left-panel">
        <Collapse
          defaultActiveKey={['sheeting','span','concrete','mesh','stud','bar']}
          bordered={false}
          ghost={false}
          className="mui-collapse"
        >
          <Panel header="Sheeting" key="sheeting" className="panel-blue">
            <Form {...formProps}>
              <Form.Item label="Profile">
                <Select value={formData.profile} onChange={v => updateFormData({ profile: v })} style={{ width: 160 }}>
                  {['WH-38-152','2WH-36','3WH-36'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Thickness">
                <Space>
                  <Select value={formData.thickness} onChange={v => updateFormData({ thickness: v })} style={{ width: 90 }}>
                    {['0.75','0.90','1.0','1.2'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                  </Select>
                  <Text type="secondary">mm</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Grade">
                <Select value={formData.grade} onChange={v => updateFormData({ grade: v })} style={{ width: 220 }}>
                  <Select.Option value="ASTM A653 SS Grade 50/1">ASTM A653 SS Grade 50/1</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Span" key="span" className="panel-green">
            <Form {...formProps}>
              <Form.Item label="Profile Span Type">
                <Select value={formData.spanType} onChange={v => updateFormData({ spanType: v })} style={{ width: 110 }}>
                  {['Single','Double','Triple'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Length (Side 1)">
                <Space>
                  <InputNumber value={parseFloat(formData.span1)} onChange={v => updateFormData({ span1: String(v) })} style={{ width: 90 }} step={0.1} />
                  <Text type="secondary">m</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Length (Side 2)">
                <Space>
                  <InputNumber value={parseFloat(formData.span2)} onChange={v => updateFormData({ span2: String(v) })} style={{ width: 90 }} step={0.1} />
                  <Text type="secondary">m</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Support Width">
                <Space>
                  <InputNumber value={parseFloat(formData.supportWidth)} onChange={v => updateFormData({ supportWidth: String(v) })} style={{ width: 90 }} />
                  <Text type="secondary">mm</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Deck Props">
                <Select defaultValue="No Props" style={{ width: 110 }}>
                  {['No Props','1 Prop','2 Props'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Concrete" key="concrete" className="panel-orange">
            <Form {...formProps}>
              <Form.Item label="Grade">
                <Select value={formData.concreteGrade} onChange={v => updateFormData({ concreteGrade: v })} style={{ width: 90 }}>
                  {['C25','C30','C35','C40'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Type">
                <Select value={formData.concreteType} onChange={v => updateFormData({ concreteType: v })} style={{ width: 130 }}>
                  {['Normal Wei','Lightweight'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Slab Depth">
                <Space>
                  <InputNumber value={parseFloat(formData.slabDepth)} onChange={v => updateFormData({ slabDepth: String(v) })} style={{ width: 90 }} />
                  <Text type="secondary">mm</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Wet Density">
                <Space>
                  <InputNumber value={parseFloat(formData.wetDensity)} onChange={v => updateFormData({ wetDensity: String(v) })} style={{ width: 90 }} />
                  <Text type="secondary">kg/m³</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Dry Density">
                <Space>
                  <InputNumber value={parseFloat(formData.dryDensity)} onChange={v => updateFormData({ dryDensity: String(v) })} style={{ width: 90 }} />
                  <Text type="secondary">kg/m³</Text>
                </Space>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Mesh or Fibre" key="mesh" className="panel-purple">
            <Form {...formProps}>
              <Form.Item label="Type">
                <Select defaultValue="Mesh" style={{ width: 90 }}>
                  {['Mesh','Fibre','None'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Mesh Type">
                <Select value={formData.meshType} onChange={v => updateFormData({ meshType: v })} style={{ width: 90 }}>
                  {['A142','A193','A252','A393'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Cover">
                <Space>
                  <InputNumber value={parseFloat(formData.meshCover)} onChange={v => updateFormData({ meshCover: String(v) })} style={{ width: 90 }} />
                  <Text type="secondary">mm</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Yield">
                <Space>
                  <InputNumber value={parseFloat(formData.meshYield)} onChange={v => updateFormData({ meshYield: String(v) })} style={{ width: 90 }} />
                  <Text type="secondary">N/mm²</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Layer">
                <Select value={formData.meshLayer} onChange={v => updateFormData({ meshLayer: v })} style={{ width: 90 }}>
                  {['Singl','Double'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Stud" key="stud" className="panel-teal">
            <Form {...formProps}>
              <Form.Item label="Diameter">
                <Select defaultValue="None" style={{ width: 90 }}>
                  {['None','12mm','16mm','19mm'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Account for Studs">
                <Select defaultValue="No" style={{ width: 80 }}>
                  <Select.Option value="No">No</Select.Option>
                  <Select.Option value="Yes">Yes</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="No. per Trough">
                <InputNumber style={{ width: 90 }} min={0} />
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Bar" key="bar" className="panel-red">
            <Form {...formProps}>
              <Form.Item label="Diameter">
                <Select defaultValue="None" style={{ width: 90 }}>
                  {['None','8mm','10mm','12mm','16mm','20mm'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Yield">
                <Space>
                  <InputNumber defaultValue={460} style={{ width: 90 }} />
                  <Text type="secondary">N/mm²</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Axis Distance">
                <Space>
                  <InputNumber defaultValue={30} style={{ width: 90 }} />
                  <Text type="secondary">mm</Text>
                </Space>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>

        {/* Results Summary */}
        <Card size="small" title="Results Summary" style={{ marginTop: 4, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          <Row gutter={[16, 12]}>
            {resultItems.map(r => (
              <Col span={12} key={r.label}>
                <Statistic title={r.label} value={r.value} valueStyle={{ color: r.color, fontSize: 20, fontWeight: 700 }} />
              </Col>
            ))}
          </Row>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <Card size="small" title="Plot" style={{ marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          {plotLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
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

        <Card size="small" title="Cross Section Profiles" style={{ marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          {Object.entries(PROFILES).map(([name, data]) => (
            <div key={name} style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <ProfileGraphic
                profileName={name}
                profileData={data}
                slabDepthMm={parseFloat(formData.slabDepth) || 150}
              />
            </div>
          ))}
        </Card>

        <Card size="small" title="Errors & Warnings" style={{ marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          <Table
            size="small"
            dataSource={[]}
            columns={[
              { title: 'Type', dataIndex: 'type', key: 'type' },
              { title: 'Description', dataIndex: 'desc', key: 'desc' },
              { title: 'Status', dataIndex: 'status', key: 'status' },
            ]}
            locale={{ emptyText: 'No errors or warnings' }}
            pagination={false}
          />
        </Card>

        <Alert type="info" showIcon message="Mesh Layer Note" description="Single layer is recommended, if possible." />
      </div>
    </div>
  )
}

export default StructureTab
