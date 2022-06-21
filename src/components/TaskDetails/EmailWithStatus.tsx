import React, { memo } from 'react';

import { Empty } from '../UIKits';
import { VirtualList } from './VirtualList';

interface Props {
  data: any[];
  renderItem(payload: any, index: number): React.ReactNode;
  getScrollContainer(): Nullable<HTMLDivElement>;
}

export const EmailWithStatus = memo<Props>(({ data, renderItem, getScrollContainer }) => {
  if (!data || data.length === 0) return <Empty description="No data" />;

  return (
    <VirtualList
      data={data}
      itemPerPage={40}
      getContainer={getScrollContainer}
      itemRenderer={renderItem}
    />
  );
});
