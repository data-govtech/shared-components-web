import 'antd/dist/antd.css';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BetaTag as BetaTagCmp } from '../components/BetaTag';

export default {
  title: 'Beta Tag',
  component: BetaTagCmp,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof BetaTagCmp>;

const Template: ComponentStory<typeof BetaTagCmp> = (args) => <BetaTagCmp {...args} />;

export const BetaTag = Template.bind({});
BetaTag.args = {};
