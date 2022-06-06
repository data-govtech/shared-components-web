import 'antd/dist/antd.css';

import { Button } from 'antd';

import { LoginOutlined } from '@ant-design/icons';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoginModal as LoginModalCmp } from '../components/LoginModal';

export default {
  title: 'Login Modal',
  component: LoginModalCmp,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof LoginModalCmp>;

const Template: ComponentStory<typeof LoginModalCmp> = (args) => <LoginModalCmp {...args} />;

export const LoginModal = Template.bind({});
LoginModal.args = {
  authApiUrl: '',
  onLoginSuccess: () => alert('Login success'),
};

export const LoginModalWithCustomBtn = Template.bind({});
LoginModalWithCustomBtn.args = {
  authApiUrl: '',
  onLoginSuccess: () => alert('Login success'),
  loginBtn: <Button icon={<LoginOutlined />} size="small" shape="circle" />,
};
