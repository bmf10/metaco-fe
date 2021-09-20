import { Table, TablePaginationConfig, Typography } from 'antd'
import { FC, useEffect, useMemo } from 'react'
import useLeaderboard from './useRedux'

const LeaderBoard: FC = () => {
  const { dispatch, state } = useLeaderboard()
  const { data, perPage, page, total, loading } = state
  const pagination = useMemo<TablePaginationConfig>(
    () => ({
      pageSize: perPage,
      current: page,
      total: total || 0,
      onChange: (page, perPage) => dispatch.load({ page, perPage }),
    }),
    [perPage, page, total, dispatch]
  )

  useEffect(() => dispatch.load({ page: 1 }), [dispatch])
  const columns = useMemo(
    () => [
      {
        title: 'Team',
        dataIndex: ['team', 'name'],
        key: 'team.name',
      },
      {
        title: 'Total Point',
        dataIndex: 'totalPoint',
        key: 'totalPoint',
      },
    ],
    []
  )

  return (
    <>
      <Typography.Title level={3}>Leader Board</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        pagination={pagination}
        dataSource={data}
        rowKey={(r) => r.teamId}
      />
    </>
  )
}

export default LeaderBoard
