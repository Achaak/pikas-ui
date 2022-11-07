import { DropdownMenu } from '@pikas-ui/dropdown-menu';
import { IconByName } from '@pikas-ui/icons';
import { styled } from '@pikas-ui/styles';
import { useWindowSize } from '@pikas-utils/screen';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ExplorerItem } from '../../Explorer.js';
import { ExplorerContext } from '../../Explorer.js';
import { Wrapper } from '../../wrapper/index.js';
import { WrapperClick as WrapperClickBase } from '../../wrapper/wrapperClick/WrapperClick.js';
import { ClipLoader } from '@pikas-ui/loader';
import { getColorByExtension } from '@pikas-utils/file';
import { FC } from 'react';

const Container = styled('div', {
  borderColor: '$GRAY',
  borderStyle: 'solid',
  borderWidth: 2,
  br: 'md',
  backgroundColor: '$WHITE2',
  display: 'flex',
  position: 'relative',

  variants: {
    selected: {
      true: {
        backgroundColor: '$PRIMARY_LIGHTER',
      },
    },
  },
});

const WrapperClick = styled(WrapperClickBase, {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const Name = styled('span', {
  color: '$BLACK',
  fontSize: '$SMALL',
  marginTop: 8,
});

const DropdownMenuContainer = styled('div', {
  position: 'absolute',
  top: 8,
  right: 8,
});

const FavoriteContainer = styled('div', {
  position: 'absolute',
  top: 8,
  left: 8,
  cursor: 'pointer',
});

export interface GridItemProps {
  item: ExplorerItem;
}

export const GridItem: FC<GridItemProps> = ({ item }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const [height, setHeight] = useState<number | undefined>(undefined);
  const { itemsSelected, showDropdownMenu, showFavorite, onFavoriteItem } =
    useContext(ExplorerContext);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const extension = item.name.split('.').pop();

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    handleResize();
  }, [windowSize, handleResize, containerRef]);

  const getIcon = useCallback(() => {
    if (item?.type === 'folder') {
      return <IconByName name="bx:folder" size={64} colorName="BLACK" />;
    }
    if (item?.type === 'file') {
      return (
        <IconByName
          name="bx:file"
          size={64}
          colorHex={extension ? getColorByExtension(extension) : undefined}
          colorName={extension ? undefined : 'BLACK'}
        />
      );
    }
  }, [item]);

  const handleFavoriteClick = async (): Promise<void> => {
    setFavoriteLoading(true);

    await onFavoriteItem?.({
      id: item.id,
      isFavorite: !item.isFavorite,
    });

    setFavoriteLoading(false);
  };

  return (
    <Wrapper item={item}>
      <Container
        ref={containerRef}
        selected={itemsSelected.some((i) => i.id === item.id)}
        css={{
          height: height,
        }}
      >
        <WrapperClick item={item}>
          {getIcon()}
          <Name>{item?.name}</Name>
        </WrapperClick>

        {showDropdownMenu && item.menu && (
          <DropdownMenuContainer>
            <DropdownMenu
              data={item.menu}
              triggerContent={
                <IconByName
                  name="bx:dots-horizontal-rounded"
                  size={24}
                  colorName="GRAY_DARK"
                />
              }
            />
          </DropdownMenuContainer>
        )}

        {showFavorite && item.isFavorite === true && favoriteLoading === false && (
          <FavoriteContainer onClick={handleFavoriteClick}>
            <IconByName name="bxs:star" size={24} colorName="WARNING" />
          </FavoriteContainer>
        )}

        {showFavorite &&
          item.isFavorite === false &&
          favoriteLoading === false && (
            <FavoriteContainer onClick={handleFavoriteClick}>
              <IconByName name="bx:star" size={24} colorName="WARNING" />
            </FavoriteContainer>
          )}

        {showFavorite && favoriteLoading === true && (
          <FavoriteContainer>
            <ClipLoader size={24} colorName="WARNING" />
          </FavoriteContainer>
        )}
      </Container>
    </Wrapper>
  );
};
