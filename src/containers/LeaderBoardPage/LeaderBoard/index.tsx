import { AutoComplete, Table, TablePaginationConfig, Typography } from 'antd'
import { FilterDropdownProps, SorterResult } from 'antd/lib/table/interface'
import useTeam from 'context/Team/useRedux'
import useTournament from 'context/Tournament/useRedux'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import useLeaderboard from './useRedux'

const LeaderBoard: FC = () => {
  const { dispatch, state } = useLeaderboard()
  const { data, perPage, page, total, loading } = state
  const [tournamentName, setTournamentName] = useState<string>()
  const tournament = useTournament()
  const team = useTeam()
  const pagination = useMemo<TablePaginationConfig>(
    () => ({
      pageSize: perPage,
      current: page,
      total: total || 0,
      onChange: (page, perPage) => dispatch.load({ page, perPage }),
    }),
    [perPage, page, total, dispatch]
  )

  const filterDropdownTournament = useCallback(
    (props: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <AutoComplete
          placeholder="Filter By Tournament"
          onFocus={() => tournament.dispatch.load()}
          style={{ width: 300 }}
          disabled={loading}
          onSearch={tournament.dispatch.search}
          onSelect={(v, opts) => {
            setTournamentName(opts.value as string)
            dispatch.load({ page: 1, tournamentId: opts.id as number })
          }}
          onClear={() => {
            setTournamentName(undefined)
            dispatch.load({ page: 1, tournamentId: undefined })
          }}
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
    [dispatch, loading, tournament.dispatch, tournament.state.data]
  )

  const filterDropdownTeam = useCallback(
    (props: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <AutoComplete
          placeholder="Filter By Team"
          style={{ width: 180 }}
          onFocus={() => team.dispatch.load()}
          disabled={loading}
          onSearch={team.dispatch.search}
          onSelect={(v, opts) => {
            dispatch.load({ page: 1, teamId: opts.id as number })
          }}
          onClear={() => {
            dispatch.load({ page: 1, teamId: undefined })
          }}
          showSearch
          allowClear
        >
          {team.state.data.map(({ id, name }, key) => (
            <AutoComplete.Option id={id} key={key} value={name}>
              {name}
            </AutoComplete.Option>
          ))}
        </AutoComplete>
      </div>
    ),
    [dispatch, loading, team.dispatch, team.state.data]
  )

  useEffect(() => dispatch.load({ page: 1 }), [dispatch, tournament.dispatch])
  const columns = useMemo(
    () => [
      {
        title: 'Team',
        dataIndex: ['team', 'name'],
        key: 'team.name',
        filterDropdown: filterDropdownTeam,
      },
      {
        title: 'Total Point',
        dataIndex: 'totalPoint',
        key: 'totalPoint',
        sorter: true,
      },
      {
        title: 'Tournament',
        render: () => (tournamentName ? tournamentName : 'All Tournament'),
        filterDropdown: filterDropdownTournament,
      },
    ],
    [filterDropdownTeam, filterDropdownTournament, tournamentName]
  )

  return (
    <>
      <Typography.Title level={3}>Leader Board</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        // eslint-disable-next-line no-console
        onChange={(p, f, s) =>
          dispatch.load({ sort: (s as SorterResult<unknown>).order })
        }
        pagination={pagination}
        dataSource={data}
        rowKey={(r) => r.teamId}
      />
    </>
  )
}

export default LeaderBoard
