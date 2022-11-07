import { styled } from '@pikas-ui/styles';
import { IconContainer } from '../../Components/IconContainer/index.js';
import { Title } from '../../Components/Title/Title.js';
import { FC } from 'react';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  marginBottom: 8,
});

export type ValidateDialogHeaderProps = {
  title?: string;
};

export const ValidateDialogHeader: FC<ValidateDialogHeaderProps> = ({
  title,
}) => (
  <Container>
    <IconContainer
      iconName="ant-design:question-circle-outlined"
      backgroundColorName="WARNING"
    />
    <Title>{title}</Title>
  </Container>
);
