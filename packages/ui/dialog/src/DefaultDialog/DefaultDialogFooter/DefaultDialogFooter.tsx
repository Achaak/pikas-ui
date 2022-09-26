import { Button } from '@pikas-ui/button'
import { Colors, styled } from '@pikas-ui/styles'

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
})

export interface DefaultDialogFooterProps {
  onClose?: () => void
  validateButtonLabel?: string
  validateButtonColor?: Colors
  onValidated?: () => void
}

export const DefaultDialogFooter: React.FC<DefaultDialogFooterProps> = ({
  onClose,
  onValidated,
  validateButtonLabel,
  validateButtonColor,
}) => {
  return (
    <Container>
      <Button
        width="auto"
        onClick={(): void => {
          onValidated?.()
          onClose?.()
        }}
        color={validateButtonColor}
      >
        {validateButtonLabel}
      </Button>
    </Container>
  )
}
