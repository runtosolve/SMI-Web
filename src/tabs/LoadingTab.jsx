import {
  Card, Collapse, Form, InputNumber, Space, Typography,
  Divider, Row, Col, Statistic, Table, Alert
} from 'antd'
import LoadingDiagramGraphic from '../components/LoadingDiagramGraphic'

const { Text } = Typography
const { Panel } = Collapse

const LABEL_WIDTH = 170

const emptyLoadsText = { emptyText: 'No loads defined' }

const parallelColumns = [
  { title: 'No', dataIndex: 'no', key: 'no', width: 40 },
  { title: 'Dead (kN/m²)', dataIndex: 'dead', key: 'dead' },
  { title: 'Live (kN/m²)', dataIndex: 'live', key: 'live' },
  { title: 'Width (mm)', dataIndex: 'width', key: 'width' },
  { title: 'Start (m)', dataIndex: 'start', key: 'start' },
  { title: 'End (m)', dataIndex: 'end', key: 'end' },
]

const perpColumns = [
  { title: 'No', dataIndex: 'no', key: 'no', width: 40 },
  { title: 'Dead (kN/m²)', dataIndex: 'dead', key: 'dead' },
  { title: 'Live (kN/m²)', dataIndex: 'live', key: 'live' },
  { title: 'Width (mm)', dataIndex: 'width', key: 'width' },
  { title: 'Location (mm)', dataIndex: 'loc', key: 'loc' },
]

const pointColumns = [
  { title: 'No', dataIndex: 'no', key: 'no', width: 40 },
  { title: 'Dead (kN)', dataIndex: 'dead', key: 'dead' },
  { title: 'Live (kN)', dataIndex: 'live', key: 'live' },
  { title: 'Width (mm)', dataIndex: 'width', key: 'width' },
  { title: 'Length (mm)', dataIndex: 'length', key: 'length' },
  { title: 'Location (m)', dataIndex: 'loc', key: 'loc' },
]

const LoadingTab = ({ formData, updateFormData }) => {
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
          defaultActiveKey={['udl','parallel','perpendicular','point']}
          bordered={false}
          className="mui-collapse"
        >
          <Panel header="UDL Loading" key="udl" className="panel-blue">
            <Form {...formProps}>
              <Form.Item label="Imposed">
                <Space>
                  <InputNumber value={parseFloat(formData.imposed)} onChange={v => updateFormData({ imposed: String(v) })} style={{ width: 90 }} step={0.5} />
                  <Text type="secondary">kN/m²</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Ceiling / Services">
                <Space>
                  <InputNumber value={parseFloat(formData.ceiling)} onChange={v => updateFormData({ ceiling: String(v) })} style={{ width: 90 }} step={0.1} />
                  <Text type="secondary">kN/m²</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Finishes">
                <Space>
                  <InputNumber value={parseFloat(formData.finishes)} onChange={v => updateFormData({ finishes: String(v) })} style={{ width: 90 }} step={0.1} />
                  <Text type="secondary">kN/m²</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Partitions">
                <Space>
                  <InputNumber value={parseFloat(formData.partitions)} onChange={v => updateFormData({ partitions: String(v) })} style={{ width: 90 }} step={0.1} />
                  <Text type="secondary">kN/m²</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Screed Depth">
                <Space>
                  <InputNumber value={parseFloat(formData.screedDepth)} onChange={v => updateFormData({ screedDepth: String(v) })} style={{ width: 90 }} />
                  <Text type="secondary">mm</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Screed Density">
                <Space>
                  <InputNumber value={parseFloat(formData.screedDensity)} onChange={v => updateFormData({ screedDensity: String(v) })} style={{ width: 90 }} />
                  <Text type="secondary">kg/m³</Text>
                </Space>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Parallel Loading" key="parallel" className="panel-green">
            <Table size="small" dataSource={formData.parallelLoads} columns={parallelColumns} locale={emptyLoadsText} pagination={false} />
          </Panel>

          <Panel header="Perpendicular Loading" key="perpendicular" className="panel-purple">
            <Table size="small" dataSource={formData.perpendicularLoads} columns={perpColumns} locale={emptyLoadsText} pagination={false} />
          </Panel>

          <Panel header="Point Loading" key="point" className="panel-orange">
            <Table size="small" dataSource={formData.pointLoads} columns={pointColumns} locale={emptyLoadsText} pagination={false} />
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
        <Card size="small" title="Loading Diagram" style={{ marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          <div className="graphics-container">
            <LoadingDiagramGraphic formData={formData} />
          </div>
        </Card>

        <Card size="small" title="Errors & Warnings" style={{ marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          <Table
            size="small"
            dataSource={[]}
            columns={[
              { title: 'Type', dataIndex: 'type', key: 'type' },
              { title: 'Description', dataIndex: 'desc', key: 'desc' },
            ]}
            locale={{ emptyText: 'No errors or warnings' }}
            pagination={false}
          />
        </Card>

        <Alert
          type="info"
          showIcon
          message="Point Load Width"
          description="Width of point load is measured perpendicular to the span direction."
        />
      </div>
    </div>
  )
}

export default LoadingTab
