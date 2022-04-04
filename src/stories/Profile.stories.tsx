import 'antd/dist/antd.css';

import { Button, Dropdown, Menu } from 'antd';

import AppstoreOutlined from '@ant-design/icons/lib/icons/AppstoreOutlined';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Profile as ProfileCmp } from '../components/Profile';

export default {
  title: 'Profile',
  component: ProfileCmp,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof ProfileCmp>;

const Template: ComponentStory<typeof ProfileCmp> = (args) => <ProfileCmp {...args} />;

export const ProfileLoggedIn = Template.bind({});
ProfileLoggedIn.args = {
  authApiUrl: '',
  children: (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">
            <AppstoreOutlined /> Campaigns
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Button icon={<UserOutlined />} shape="circle" />
    </Dropdown>
  ),
  userInfo: {
    email: 'thang.kieu@2359media.com',
    name: 'Thang Kieu',
    permissions: [],
    role: '',
  },
};

export const ProfileNormal = Template.bind({});
ProfileNormal.args = {
  authApiUrl: '',
  children: (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1">
            <AppstoreOutlined /> Campaigns
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Button icon={<UserOutlined />} shape="circle" />
    </Dropdown>
  ),
  userInfo: null,
};

export const ProfileNormalHasContactLink = Template.bind({});
ProfileNormalHasContactLink.args = {
  authApiUrl: '',
  children: null,
  userInfo: null,
  contactUsComponent: <a>Contact us</a>,
};
