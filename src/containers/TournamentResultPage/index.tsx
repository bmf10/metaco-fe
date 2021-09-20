import {
  AutoComplete,
  Button,
  notification,
  Popconfirm,
  Spin,
  Table,
} from 'antd'
import Wrapper from 'components/Wrapper'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInjectReducer } from 'utils/injectReducer'
import useDispatch from './useDispatch'
import { useSelector } from './useSelector'
import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import reducer from './reducer'
import { TablePaginationConfig } from 'antd/lib/table'
import { Result } from './types'
import AddResult from './AddResult'
import EditResult from './EditResult'
import useDeleteResult from './DeleteResult/useRedux'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import useTournament from 'context/Tournament/useRedux'

const TournamentResult: FC = () => {
  useInjectReducer({ key: 'tournamentResult', reducer })
  useInjectSaga({ key: 'tournamentResult', saga })
  const { load, reset } = useDispatch()
  const { data, loading, message, page, perPage, total } = useSelector()
  const [edit, setEdit] = useState<Result>()
  const deleteResult = useDeleteResult()
  const tournament = useTournament()

  const pagination = useMemo<TablePaginationConfig>(
    () => ({
      pageSize: perPage,
      current: page,
      total: total || 0,
      onChange: (page, perPage) => load({ page, perPage }),
    }),
    [perPage, page, total, load]
  )

  const action = useCallback(
    (value: unknown, record: Result, index: number) => (
      <>
        <Button
          onClick={() => setEdit(record)}
          type="primary"
          style={{ marginRight: 5 }}
        >
          Edit
        </Button>
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => deleteResult.dispatch.submit({ id: record.id })}
        >
          <Button danger type="primary">
            Delete
          </Button>
        </Popconfirm>
      </>
    ),
    [deleteResult.dispatch]
  )

  const filterDropdown = useCallback(
    (props: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <AutoComplete
          placeholder="Filter By Tournament"
          style={{ width: 300 }}
          onFocus={() => tournament.dispatch.load}
          disabled={loading}
          onSearch={tournament.dispatch.search}
          onSelect={(v, opts) =>
            load({ tournamentId: opts.id as number, page: 1 })
          }
          onClear={() => load({ tournamentId: undefined })}
          showSearch
          allowClear
        >
          {tournament.state.data.map(({ id, title }, key) => (
            <AutoComplete.Option id={id} key={key} value={title}>
              {title}
            </AutoComplete.Option>
          ))}
        </AutoComplete>
      </div>
    ),
    [
      load,
      loading,
      tournament.dispatch.load,
      tournament.dispatch.search,
      tournament.state.data,
    ]
  )

  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Team',
        dataIndex: ['team', 'name'],
        key: 'team.name',
      },
      {
        title: 'Tournament',
        dataIndex: ['tournament', 'title'],
        key: 'tournament.title',
        filterDropdown,
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'Point',
        dataIndex: 'point',
        key: 'point',
      },
      {
        title: 'Action',
        key: 'action',
        render: action,
      },
    ],
    [action, filterDropdown]
  )

  useEffect(() => load(), [load])

  useEffect(() => {
    if (message) {
      notification.error({ message, onClose: reset })
    }
  }, [message, reset])

  useEffect(() => {
    if (deleteResult.state.success) {
      notification.success({
        message: 'Data deleted successfully',
        onClose: deleteResult.dispatch.reset,
      })
    } else if (deleteResult.state.message) {
      notification.error({ message, onClose: deleteResult.dispatch.reset })
    }
  }, [
    deleteResult.dispatch.reset,
    deleteResult.state.message,
    deleteResult.state.success,
    message,
  ])

  return (
    <Spin spinning={deleteResult.state.loading}>
      <Wrapper
        activeMenu={['tr']}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Tournament Result' }]}
      >
        <AddResult />
        <EditResult data={edit} onCancel={() => setEdit(undefined)} />
        <Table
          rowKey={(r) => r.id}
          pagination={pagination}
          loading={loading}
          style={{ marginTop: 20 }}
          columns={columns}
          dataSource={data}
        />
      </Wrapper>
    </Spin>
  )
}

export default TournamentResult
