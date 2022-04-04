import 'antd/dist/antd.css';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoginForm as LoginFormCmp } from '../components/LoginForm';

export default {
  title: 'Login Form',
  component: LoginFormCmp,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof LoginFormCmp>;

const Template: ComponentStory<typeof LoginFormCmp> = (args) => <LoginFormCmp {...args} />;

export const LoginForm = Template.bind({});
LoginForm.args = {
  authApiUrl: '',
  onSuccess: () => alert('Login success'),
};

export const LoginFormHasContactLink = Template.bind({});
LoginFormHasContactLink.args = {
  authApiUrl: '',
  onSuccess: () => alert('Login success'),
  contactUsComponent: <a>Contact Us</a>,
};
