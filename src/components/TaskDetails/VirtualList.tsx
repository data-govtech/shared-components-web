import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Bottom = styled.div`
  margin-bottom: 5px;
`;

interface Props {
  data: any[];
  itemPerPage?: number;
  className?: string;
  getContainer(): Nullable<HTMLDivElement>;
  itemRenderer(item: any, index: number): React.ReactNode;
}

export const VirtualList = memo<Props>(
  ({ data, itemPerPage = 20, className, itemRenderer, getContainer }) => {
    const [[fromIdx, toIdx], setPage] = useState([0, 0]);

    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);

    const activeItems = useMemo(() => {
      if (data.length <= itemPerPage) return data;

      return data.slice(fromIdx, toIdx);
    }, [data, fromIdx, toIdx, itemPerPage]);

    const bottomRefVisibilityCallback = useCallback<IntersectionObserverCallback>(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (
            entry.target.isSameNode(bottomRef.current) &&
            entry.isIntersecting &&
            (toIdx === 0 || toIdx + itemPerPage < data.length)
          ) {
            // increate items
            setPage([fromIdx, Math.min(toIdx + itemPerPage, data.length)]);
          }
        });
      },
      [fromIdx, itemPerPage, toIdx, data]
    );

    const initIntersection = useCallback(() => {
      const container = getContainer();
      if (!container) {
        console.warn('Container element is missing, please check parent component.');
        return;
      }

      let options = {
        root: getContainer(),
        rootMargin: '0px',
        threshold: 1.0,
      };

      return new IntersectionObserver(bottomRefVisibilityCallback, options);
    }, [bottomRefVisibilityCallback, getContainer]);

    useEffect(() => {
      const observer = initIntersection();
      if (!observer) return;

      const bottomRefEl = bottomRef.current;
      const topRefEl = topRef.current;

      bottomRefEl && observer?.observe(bottomRefEl);
      topRefEl && observer?.observe(topRefEl);

      return () => {
        bottomRefEl && observer?.unobserve(bottomRefEl);
        topRefEl && observer?.unobserve(topRefEl);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initIntersection]);

    return (
      <Wrapper ref={viewportRef}>
        <div className="top" ref={topRef} />
        <div className={className}>{activeItems.map(itemRenderer)}</div>
        <Bottom className="bottom" ref={bottomRef} />
      </Wrapper>
    );
  }
);
