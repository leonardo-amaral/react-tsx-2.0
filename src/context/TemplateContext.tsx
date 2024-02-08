import { createContext, useContext, useState } from 'react'

type TemplateProviderProps = {
  children: React.ReactNode
}

const TemplateContext = createContext({} as any)

export const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [templateColors, setTemplateColors] = useState(null)
  const [templateText, setTemplateText] = useState(null)
  const [templateButtons, setTemplateButtons] = useState(null)
  const [templateInputs, setTemplateInputs] = useState(null)

  return (
    <TemplateContext.Provider value={{}}>{children}</TemplateContext.Provider>
  )
}

export const useTemplate = () => {
  return useContext(TemplateContext)
}
