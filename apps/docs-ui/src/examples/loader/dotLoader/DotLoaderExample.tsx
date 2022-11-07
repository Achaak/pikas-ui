import { ExampleContainer } from '@pikas/docs-ui';
import { FC } from 'react';
import { DotLoader } from '@pikas-ui/loader';

export const DotLoaderExample: FC = () => (
  <ExampleContainer
    css={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
    }}
  >
    <DotLoader />
  </ExampleContainer>
);
