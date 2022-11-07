import type { PikasColor } from '@pikas-ui/styles';
import type { DialogProps } from '../CustomDialog/index.js';
import { CustomDialog } from '../CustomDialog/index.js';
import { InfoDialogContent } from './InfoDialogContent/index.js';
import { InfoDialogFooter } from './InfoDialogFooter/index.js';
import { InfoDialogHeader } from './InfoDialogHeader/index.js';
import { ReactNode, FC } from 'react';

export interface InfoDialogProps extends DialogProps {
  validateButtonLabel?: string;
  validateButtonColorName?: PikasColor;
  validateButtonDisabled?: boolean;
  validateButtonLoading?: boolean;
  onValidate?: () => Promise<void>;
  title?: string;
  content: ReactNode;
}

export const InfoDialog: FC<InfoDialogProps> = ({
  onClose,
  validateButtonLabel = 'Ok',
  validateButtonColorName = 'PRIMARY',
  validateButtonDisabled,
  validateButtonLoading,
  onValidate,
  title = 'We have a information for you !',
  content,
  ...props
}) => {
  return (
    <CustomDialog
      onClose={onClose}
      hasCloseIcon={false}
      header={<InfoDialogHeader title={title} />}
      content={<InfoDialogContent content={content} />}
      footer={
        <InfoDialogFooter
          validateButtonLabel={validateButtonLabel}
          validateButtonColorName={validateButtonColorName}
          validateButtonDisabled={validateButtonDisabled}
          validateButtonLoading={validateButtonLoading}
          onValidate={onValidate}
          onClose={onClose}
        />
      }
      padding={{
        container: 'no-padding',
        header: 'no-padding',
        content: 'no-padding',
        footer: 'lg',
      }}
      gap={{
        container: 'no-gap',
        content: 'md',
        footer: 'md',
        header: 'md',
      }}
      {...props}
    />
  );
};
