import { createContext, useContext, useEffect, useState } from 'react'
import { ColorsController } from '../controllers/template/ColorsControllers'
import { TColors } from '../types/template/colors.types'

type TemplateProviderProps = {
  children: React.ReactNode
}

type TemplateContextProps = {
  templateColors: TColors | null
}

const TemplateContext = createContext({} as TemplateContextProps)

export const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [templateColors, setTemplateColors] = useState<TColors | null>(null)
  const [templateText, setTemplateText] = useState(null)
  const [templateButtons, setTemplateButtons] = useState(null)
  const [templateInputs, setTemplateInputs] = useState(null)

  const { getCollors } = ColorsController()

  const fetchCollors = async () => {
    const data = await getCollors()
    setTemplateColors(data)
  }

  useEffect(() => {
    fetchCollors()
  }, [])

  return (
    <TemplateContext.Provider value={{ templateColors }}>
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemplate = () => {
  return useContext(TemplateContext)
}
