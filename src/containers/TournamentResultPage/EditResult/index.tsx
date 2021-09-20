import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { FC, useEffect } from 'react'
import { Result } from '../types'
import { useInjectReducer } from 'utils/injectReducer'
import useDispatch from './useDispatch'
import { useSelector } from './useSelector'
import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import reducer from './reducer'

interface Props {
  readonly onCancel: () => void
  readonly data?: Result
}

interface Values {
  readonly position: number
}

const EditResult: FC<Props> = ({ onCancel, data }: Props) => {
  useInjectReducer({ key: 'editResult', reducer })
  useInjectSaga({ key: 'editResult', saga })
  const { submit, reset } = useDispatch()
  const { loading, success, message } = useSelector()
  const [form] = Form.useForm<Values>()

  useEffect(() => {
    if (success) {
      notification.success({
        message: 'Data edited successfully',
        onClose: reset,
      })
    } else if (message) {
      notification.error({ message, onClose: reset })
    }
  }, [reset, message, success])

  useEffect(() => {
    if (success) {
      onCancel()
    }
  }, [onCancel, success])

  const handleFinish = (v: Values) => {
    submit({
      position: v.position,
      id: data!.id,
    })
  }
  return (
    <Modal
      visible={!!data}
      title="Edit Tournament Result"
      footer=""
      onCancel={onCancel}
    >
      <Form
        onFinish={handleFinish}
        initialValues={{ position: data?.position }}
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: 'Please input position!' }]}
        >
          <Select disabled={loading}>
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
            <Select.Option value={3}>3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Team">
          <Input disabled={true} value={data?.team.name} />
        </Form.Item>
        <Form.Item label="Tournament">
          <Input disabled={true} value={data?.tournament.title} />
        </Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  )
}

export default EditResult
