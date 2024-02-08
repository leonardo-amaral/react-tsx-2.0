import { Global, css } from '@emotion/react'
import React from 'react'
import { useTemplate } from '../context/TemplateContext'

const GlobalStyles: React.FC = () => {
  const { templateColors } = useTemplate()

  const globalStyles = css`
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      background-color: ${templateColors?.tertiary.color};
    }
  `

  return <Global styles={globalStyles} />
}

export default GlobalStyles
