import { AdrressProps, useApi } from '../../hooks/useApi'
import { TColors } from '../../types/template/colors.types'

export function ColorsController() {
  const { api } = useApi(AdrressProps.TEMPLATE)

  const getCollors = async () => {
    const response = await api.get<TColors>('/colors')

    return response.data
  }

  return {
    getCollors
  }
}
