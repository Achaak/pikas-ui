import { ContextMenu } from '@pikas-ui/context-menu';
import { useContext } from 'react';
import type { ExplorerItem } from '../../Explorer.js';
import { ExplorerContext } from '../../Explorer.js';
import { ReactNode, FC } from 'react';

export interface WrapperContextMenuProps {
  children?: ReactNode;
  item: ExplorerItem;
}

export const WrapperContextMenu: FC<WrapperContextMenuProps> = ({
  children,
  item,
}) => {
  const { showContextMenu } = useContext(ExplorerContext);

  if (!showContextMenu || !item.menu) {
    return <>{children}</>;
  }

  return <ContextMenu data={item.menu}>{children}</ContextMenu>;
};
