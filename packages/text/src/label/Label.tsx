import type { CSS } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import * as LabelPrimitive from '@radix-ui/react-label'
import React from 'react'

const LabelStyled = styled(LabelPrimitive.Label, {
  fontSize: '$EM-SMALL',
  fontWeight: '$MEDIUM',
  marginBottom: 4,
  display: 'block',
})

export interface LabelProps {
  children?: React.ReactNode
  style?: CSS
  htmlFor?: string
}

export const Label: React.FC<LabelProps> = ({ children, style, htmlFor }) => {
  return (
    <LabelStyled
      css={{
        ...(htmlFor && {
          cursor: 'pointer',
        }),
        ...style,
      }}
      htmlFor={htmlFor}
    >
      {children}
    </LabelStyled>
  )
}
