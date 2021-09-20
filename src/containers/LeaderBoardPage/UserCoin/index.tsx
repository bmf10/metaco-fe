import { Table, TablePaginationConfig, Typography } from 'antd'
import { FC, useEffect, useMemo } from 'react'
import useLeaderboard from './useRedux'

const UserCoin: FC = () => {
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
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Coin',
        dataIndex: 'coin',
        key: 'coin',
      },
    ],
    []
  )

  return (
    <>
      <Typography.Title level={3}>User Coin</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        pagination={pagination}
        dataSource={data}
        rowKey={(r) => r.id}
      />
    </>
  )
}

export default UserCoin
