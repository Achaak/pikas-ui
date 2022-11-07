import { ClimbingBoxLoader as ClimbingBoxLoaderDefault } from 'react-spinners';
import type { PikasColor } from '@pikas-ui/styles';
import { useTheme } from '@pikas-ui/styles';
import { FC } from 'react';

export interface ClimbingBoxLoaderProps {
  size?: number;
  colorName?: PikasColor;
  colorHex?: string;
  loading?: boolean;
  speedMultiplier?: number;
}

export const ClimbingBoxLoader: FC<ClimbingBoxLoaderProps> = ({
  size,
  colorName = 'PRIMARY',
  colorHex,
  loading = true,
  speedMultiplier,
}) => {
  const theme = useTheme();

  return (
    <ClimbingBoxLoaderDefault
      size={size}
      speedMultiplier={speedMultiplier}
      color={
        colorHex || (colorName ? theme?.colors[colorName].value : undefined)
      }
      loading={loading}
    />
  );
};
