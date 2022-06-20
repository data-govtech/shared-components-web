import 'antd/dist/antd.css';

import { Button } from 'antd';
import { ComponentProps } from 'react';

import { EditOutlined, SmallDashOutlined } from '@ant-design/icons';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CampaignItem as CampaignItemCmp } from '../components/CampaignItem';
import { genStatusColorMapping } from '../utils/helpers';

export default {
  title: 'Campaign Item',
  component: CampaignItemCmp,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof CampaignItemCmp>;

const Template: ComponentStory<typeof CampaignItemCmp> = (args) => <CampaignItemCmp {...args} />;

const CampaignStatusColorMapping: Record<string, string> = {
  Active: 'green',
  Ended: 'blue',
};

const getStatusColor = genStatusColorMapping(CampaignStatusColorMapping);

export const Ended = Template.bind({});
const CAMPAIGN = {
  campaign_id: '0c1b1acf-8433-4ae9-91ec-9d4c0651344d',
  campaign_name: 'Test',
  email_template_key: '0c1b1acf-8433-4ae9-91ec-9d4c0651344d/bootcamp.html',
  email_template_url: null,
  config_csv_key: '0c1b1acf-8433-4ae9-91ec-9d4c0651344d/capdev1.csv',
  config_csv_url: null,
  attachment_key_prefix: '0c1b1acf-8433-4ae9-91ec-9d4c0651344d',
  email_subject: 'Test 2',
  to_email_column: 'to_emails',
  attachment_column: '',
  schedule_dates: ['2022-06-14T01:24+0000', '2022-06-15T01:24+0000', '2022-06-16T01:24+0000'],
  owner_email: 'thang.kieu@2359media.com',
  owner_name: null,
  send_from_email: 'thang.kieu@2359media.com',
  send_from_name: null,
  reply_to_email: 'thang.kieu@2359media.com',
  allow_opt_out: false,
  opt_out_message: '',
  campaign_status: 'Ended',
  opt_out_emails: [],
  created_at: '2022-06-14T01:10:44+0000',
  updated_at: '2022-06-15 04:07:12',
};

Ended.args = {
  editBtn: <Button type="text" size="small" icon={<EditOutlined />}></Button>,
  data: {
    ...CAMPAIGN,
    campaign_status: 'Ended',
  },
  deleteApiURL: 'https://google.com',
  actions: [
    <Button key="options-1" size="small" type="text" icon={<SmallDashOutlined />}></Button>,
  ],
  getStatusColor,
} as ComponentProps<typeof CampaignItemCmp>;

export const Active = Template.bind({});
Active.args = {
  editBtn: <Button type="text" size="small" icon={<EditOutlined />}></Button>,
  data: {
    ...CAMPAIGN,
    campaign_status: 'Active',
  },
  deleteApiURL: 'https://google.com',
  actions: [
    <Button key="options-2" size="small" type="text" icon={<SmallDashOutlined />}></Button>,
  ],
  getStatusColor,
} as ComponentProps<typeof CampaignItemCmp>;

export const Draft = Template.bind({});
Draft.args = {
  editBtn: <Button type="text" size="small" icon={<EditOutlined />}></Button>,
  data: {
    ...CAMPAIGN,
    campaign_status: 'Draft',
  },
  actions: [
    <Button key="options-2" size="small" type="text" icon={<SmallDashOutlined />}></Button>,
  ],
  formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  },
  getStatusColor,
} as ComponentProps<typeof CampaignItemCmp>;
