import type {
  BorderRadius,
  PikasColor,
  PikasSize,
  PikasConfigRecord,
} from '@pikas-ui/styles'
import { styled, useTheme } from '@pikas-ui/styles'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import React, { forwardRef, useCallback } from 'react'
import type {
  ButtonType,
  ButtonEffect,
  ButtonPadding,
  ButtonTarget,
} from '../types.js'

import type { IconProps, IconCSS } from '@pikas-ui/icons'
import { ClipLoader } from '@pikas-ui/loader'
import { getColors, getContentColor } from '../utils.js'

const ButtonIconDOM = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  space: 2,
  borderStyle: 'solid',
  position: 'relative',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  br: 'md',
  borderWidth: 2,
  boxShadow: '$ELEVATION_BOTTOM_1',

  variants: {
    effect: {
      globalScale: {
        transition: 'transform 250ms ease',

        '&:hover': {
          transform: 'scale(1.025)',
          transition: 'transform 250ms ease',
        },
        '&:active': {
          transform: 'scale(0.95)',
          transition: 'transform 250ms ease',
        },
      },
      boxScale: {
        transition: 'transform 250ms ease',

        '&:after': {
          background: 'inherit',
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          transition: 'transform 250ms ease',
          borderRadius: 'inherit',
        },

        '&:hover:after': {
          transform: 'scale(1.1)',
          transition: 'transform 250ms',
        },

        '&:active': {
          transform: 'scale(0.95)',
          transition: 'transform 250ms ease',
        },
      },
      opacity: {
        transition: 'opacity 500ms',

        '&:hover': {
          opacity: 0.8,
        },

        '&:active': {
          opacity: 1,
          transition: 'opacity 0s',
        },
      },
    },
    padding: {
      xs: {
        padding: 2,
      },
      sm: {
        padding: 4,
      },
      md: {
        padding: 8,
      },
      lg: {
        padding: 16,
      },
      xl: {
        padding: 24,
      },
    },

    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  },
})

const Content = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const LoadingContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

export type ButtonIconCSS<
  Config extends PikasConfigRecord = PikasConfigRecord
> = {
  button?: Config['CSS']
  icon?: IconCSS<Config>
}

export interface ButtonIconDefaultProps<
  Config extends PikasConfigRecord = PikasConfigRecord
> {
  Icon: React.FC<IconProps<Config>>
  css?: ButtonIconCSS<Config>
  loading?: boolean
  outlined?: boolean
  effect?: ButtonEffect
  padding?: ButtonPadding
  size?: PikasSize
  colorName?: keyof Config['theme']['colors']
  colorHex?: string
  contentColorName?: keyof Config['theme']['colors']
  contentColorHex?: string
  disabled?: boolean
  borderRadius?: BorderRadius
  borderWidth?: number
  boxShadow?: Config['theme']['shadow'] | 'none'
}

export interface BaseButtonIconProps<
  Config extends PikasConfigRecord = PikasConfigRecord
> extends ButtonIconDefaultProps<Config> {
  onClick?: () => void
  type?: ButtonType
}

export type ButtonIconProps<
  Config extends PikasConfigRecord = PikasConfigRecord
> = ButtonHTMLAttributes<HTMLButtonElement> & BaseButtonIconProps<Config>

export interface BaseButtonIconLinkProps<
  Config extends PikasConfigRecord = PikasConfigRecord
> extends ButtonIconDefaultProps<Config> {
  onClick?: () => void
  href?: string
  target?: ButtonTarget
}

export type ButtonIconLinkProps<
  Config extends PikasConfigRecord = PikasConfigRecord
> = AnchorHTMLAttributes<HTMLAnchorElement> & BaseButtonIconLinkProps<Config>

const getContent = <Config extends PikasConfigRecord>({
  loading,
  css,
  contentColor,
  size,
  Icon,
}: {
  loading?: boolean
  css?: ButtonIconCSS<Config>
  contentColor?: string
  size?: PikasSize
  Icon: React.FC<IconProps<Config>>
}): React.ReactNode => {
  const theme = useTheme<Config>()

  if (!theme) {
    return null
  }
  return (
    <>
      <LoadingContainer>
        <ClipLoader
          size={theme.sizes[size || 6].value}
          colorHex={contentColor}
          loading={loading}
        />
      </LoadingContainer>

      <Content
        css={{
          opacity: loading ? 0 : 1,
        }}
      >
        <Icon
          size={theme.sizes[size || 6].value}
          colorHex={contentColor}
          css={css?.icon}
        />
      </Content>
    </>
  )
}

const ButtonIconInner = <Config extends PikasConfigRecord>(
  {
    colorName = 'PRIMARY' as keyof Config['theme']['colors'],
    colorHex,
    css,
    loading = false,
    disabled = false,
    effect = 'opacity',
    onClick,
    outlined,
    Icon,
    size = 6,
    borderRadius = 'md',
    borderWidth = 2,
    boxShadow = 'ELEVATION_BOTTOM_1' as Config['theme']['shadow'],
    contentColorName,
    contentColorHex,
    padding = 'md',
    ...props
  }: ButtonIconProps<Config>,
  ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element => {
  const theme = useTheme<Config>()

  const handleClick = useCallback((): void => {
    if (disabled || loading) {
      return
    }

    onClick?.()
  }, [disabled, onClick, loading])

  if (!theme) return <></>

  const colorHexFinal = colorHex || (colorName && theme.colors[colorName].value)
  const contentColorHexFinal =
    contentColorHex ||
    (contentColorName && theme.colors[contentColorName].value)

  return (
    <ButtonIconDOM
      ref={ref}
      onClick={handleClick}
      disabled={loading || disabled}
      effect={disabled ? undefined : effect}
      padding={padding}
      css={{
        br: borderRadius,
        borderWidth: borderWidth,
        boxShadow: `$${boxShadow}`,

        ...getColors({
          outlined,
          colorHex: colorHexFinal,
          contentColorHex: contentColorHexFinal,
        }),

        ...css?.button,
      }}
      {...props}
    >
      {getContent<Config>({
        contentColor: getContentColor({
          outlined,
          contentColorHex: contentColorHex,
          colorHex: colorHex,
        }),
        loading,
        size,
        css,
        Icon,
      })}
    </ButtonIconDOM>
  )
}

export const ButtonIcon = forwardRef(ButtonIconInner) as <
  Config extends PikasConfigRecord = PikasConfigRecord
>(
  props: ButtonIconProps<Config> & {
    ref?: React.ForwardedRef<HTMLButtonElement>
  }
) => ReturnType<typeof ButtonIconInner>

const ButtonIconLinkInner = <Config extends PikasConfigRecord>(
  {
    colorName = 'PRIMARY' as keyof Config['theme']['colors'],
    colorHex,
    css,
    loading = false,
    effect = 'opacity',
    onClick,
    outlined,
    Icon,
    size = 6,
    disabled,
    borderRadius = 'md',
    borderWidth = 2,
    boxShadow = 'ELEVATION_BOTTOM_1' as Config['theme']['shadow'],
    contentColorName,
    contentColorHex,
    padding = 'md',
    ...props
  }: ButtonIconLinkProps<Config>,
  ref: React.ForwardedRef<HTMLAnchorElement>
): JSX.Element => {
  const theme = useTheme<Config>()

  const handleClick = useCallback((): void => {
    if (disabled || loading) {
      return
    }

    onClick?.()
  }, [disabled, onClick, loading])

  if (!theme) return <></>

  const colorHexFinal = colorHex || (colorName && theme.colors[colorName].value)
  const contentColorHexFinal =
    contentColorHex ||
    (contentColorName && theme.colors[contentColorName].value)

  return (
    <ButtonIconDOM
      as="a"
      ref={ref}
      onClick={handleClick}
      disabled={loading || disabled}
      effect={disabled ? undefined : effect}
      padding={padding}
      css={{
        br: borderRadius,
        borderWidth: borderWidth,
        boxShadow: `$${boxShadow}`,

        ...getColors({
          outlined,
          colorHex: colorHexFinal,
          contentColorHex: contentColorHexFinal,
        }),

        ...css?.button,
      }}
      {...props}
    >
      {getContent<Config>({
        contentColor: getContentColor({
          outlined,
          contentColorHex: contentColorHex,
          colorHex: colorHex,
        }),
        loading,
        size,
        css,
        Icon,
      })}
    </ButtonIconDOM>
  )
}

export const ButtonIconLink = forwardRef(ButtonIconLinkInner) as <
  Config extends PikasConfigRecord = PikasConfigRecord
>(
  props: ButtonIconLinkProps<Config> & {
    ref?: React.ForwardedRef<HTMLAnchorElement>
  }
) => ReturnType<typeof ButtonIconLinkInner>
