import { Badge as AntBadge, BadgeProps, Tag } from 'antd';
import { memo } from 'react';
import styled, { css } from 'styled-components';

const BadgeStyle = styled(Tag)<{ size?: string }>`
  margin-right: 0;
  border-radius: 1em;

  ${(p) =>
    p.size === 'small' &&
    css`
      font-size: 12px;
      line-height: 1.4;
    `}
`;

const colorMapping: Record<string, string | undefined> = {
  red: '#ff4d4f',
  yellow: '#faad14',
  green: '#52c41a',
};

interface Props extends BadgeProps {
  color?: 'green' | 'red' | 'yellow' | string;
  dot?: boolean;
}

export const Badge = memo<Props>((props) => {
  if (props.dot) return <AntBadge dot {...props} />;

  if (props.count === null || props.count === undefined || (props.count === 0 && !props.showZero))
    return null;

  return (
    <BadgeStyle size={props.size} color={colorMapping[props.color as string] ?? props.color}>
      {props.count}
    </BadgeStyle>
  );
});
