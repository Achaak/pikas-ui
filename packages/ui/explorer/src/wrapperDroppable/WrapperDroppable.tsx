import { useDroppable } from '@dnd-kit/core'
import { styled } from '@pikas-ui/styles'
import { useContext } from 'react'
import { ExplorerContext } from '../Explorer.js'

const Container = styled('div', {})

export interface WrapperDroppableProps {
  children?: React.ReactNode
  id: string
}

export const WrapperDroppable: React.FC<WrapperDroppableProps> = ({
  children,
  id,
}) => {
  const { itemsSelected } = useContext(ExplorerContext)


  const { isOver, setNodeRef } = useDroppable({
    id: id,
    disabled: itemsSelected.some((item) => item.id === id),
  })

  return (
    <Container
      ref={setNodeRef}
      css={{
        opacity: isOver ? 0.5 : 1,
      }}
    >
      {children}
    </Container>
  )
}
