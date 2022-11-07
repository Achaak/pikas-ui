import { styled } from '@pikas-ui/styles';
import { ReactNode, FC } from 'react';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  color: '$BLACK',
});

export type ErrorDialogContentProps = {
  content: ReactNode;
};

export const ErrorDialogContent: FC<ErrorDialogContentProps> = ({
  content,
}) => <Container>{content}</Container>;
