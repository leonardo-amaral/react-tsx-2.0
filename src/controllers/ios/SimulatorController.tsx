import { AdrressProps, useApi } from '../../hooks/useApi'

interface GetSimulatorResponseProps {
  simulators: string[]
}

interface GetSimulatorModeBodyProps {
  simulator_id: string | null
}

interface GetSimulatorModeResponseProps {
  simulator_id: string
  is_active: false
}

export const SimulatorController = () => {
  const { api } = useApi(AdrressProps.GATEWAY)

  const getSimulatorMode = async (data: GetSimulatorModeBodyProps) => {
    const response = await api.post<GetSimulatorModeResponseProps>(
      '/instruction/simulators/available',
      data
    )

    return response.data
  }

  const getSimulatorId = async () => {
    const response = await api.get<GetSimulatorResponseProps>(
      '/instruction/simulators/available'
    )
    return response.data
  }

  const setSimulatorModeQTG = async () => {
    const response = await api.post('/maintenance/active')
    return response.data
  }

  const setSimulatorModeIOS = async () => {
    const response = await api.post('/maintenance/reboot')
    return response.data
  }

  return {
    getSimulatorId,
    getSimulatorMode,
    setSimulatorModeIOS,
    setSimulatorModeQTG
  }
}
