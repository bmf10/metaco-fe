import { AutoComplete, Button, Form, Modal, notification, Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useInjectReducer } from 'utils/injectReducer'
import useDispatch from './useDispatch'
import { useSelector } from './useSelector'
import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import reducer from './reducer'
import useTeam from 'context/Team/useRedux'
import useTournament from 'context/Tournament/useRedux'

interface Option {
  readonly id: number
  readonly key: number
  readonly value: string
}

interface Values {
  readonly position: number
  readonly team: string
  readonly tournament: string
}

const AddResult: FC = () => {
  useInjectReducer({ key: 'addResult', reducer })
  useInjectSaga({ key: 'addResult', saga })
  const { submit, reset } = useDispatch()
  const { loading, success, message } = useSelector()
  const [open, setOpen] = useState<boolean>(false)
  const team = useTeam()
  const tournament = useTournament()
  const [form] = Form.useForm<Values>()
  const [teamObj, setTeamObj] = useState<Option>()
  const [tournamentObj, setTournamentObj] = useState<Option>()

  useEffect(() => {
    team.dispatch.load()
    tournament.dispatch.load()
  }, [team.dispatch, tournament.dispatch])

  useEffect(() => {
    if (success) {
      setOpen(false)
      form.resetFields()
      notification.success({
        message: 'Data added successfully',
        onClose: reset,
      })
    } else if (message) {
      notification.error({ message, onClose: reset })
    }
  }, [form, message, reset, success])

  const onModal = () => {
    setOpen(!open)
  }

  const handleTeam = (v: string, option: unknown) => {
    const opts = option as Option
    setTeamObj(opts)
    form.setFieldsValue({ team: v })
  }

  const handleTournament = (v: string, option: unknown) => {
    const opts = option as Option
    setTournamentObj(opts)
    form.setFieldsValue({ tournament: v })
  }

  const handleFinish = (v: Values) => {
    submit({
      position: v.position,
      teamId: teamObj!.id,
      tournamentId: tournamentObj!.id,
    })
  }

  return (
    <>
      <Button type="primary" onClick={onModal}>
        Add Tournament Result
      </Button>
      <Modal
        visible={open}
        title="Add Tournament Result"
        footer=""
        onCancel={onModal}
      >
        <Form
          form={form}
          onFinish={handleFinish}
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
          <Form.Item
            label="Team"
            name="team"
            rules={[{ required: true, message: 'Please input team!' }]}
          >
            <AutoComplete
              disabled={loading}
              onSearch={team.dispatch.search}
              showArrow
              showSearch
              onSelect={handleTeam}
            >
              {team.state.data.map(({ name, id }, key) => (
                <AutoComplete.Option id={id} key={key} value={name}>
                  {name}
                </AutoComplete.Option>
              ))}
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="Tournament"
            name="tournament"
            rules={[{ required: true, message: 'Please input tournament!' }]}
          >
            <AutoComplete
              disabled={loading}
              onSearch={tournament.dispatch.search}
              showArrow
              showSearch
              onSelect={handleTournament}
            >
              {tournament.state.data.map(({ id, title }, key) => (
                <AutoComplete.Option id={id} key={key} value={title}>
                  {title}
                </AutoComplete.Option>
              ))}
            </AutoComplete>
          </Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default AddResult
