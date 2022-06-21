import 'antd/dist/antd.css';

import { ComponentProps } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TaskDetailsPage as TaskDetailsCmp } from '../components/TaskDetails';
import { CampaignStatusEnum } from '../types/enums';

export default {
  title: 'Task Details',
  component: TaskDetailsCmp,
  parameters: {},
} as ComponentMeta<typeof TaskDetailsCmp>;

const Template: ComponentStory<typeof TaskDetailsCmp> = (args) => <TaskDetailsCmp {...args} />;

type Props = ComponentProps<typeof TaskDetailsCmp>;

function genUrl(url: string) {
  return `https://api.capdev.link/v1/blastoise${url}`;
}

export const TaskDetails = Template.bind({});
TaskDetails.args = {
  taskDetailsApi: genUrl(
    '/task/8be170cb-369b-449f-87de-891ec4fbca3c/ad24dbef-0de8-4724-a332-366fbf8ee129'
  ),
  campaignStatus: CampaignStatusEnum.Ended,
  campaignName: 'Welcome to the DSC-Verse',
  genRunTaskApi(task: any) {
    return genUrl(`/task/process/${task.campaign_id}/${task.task_group}`);
  },
  genCancelTaskApi(task: any) {
    return genUrl(`/task/cancel/${task.campaign_id}/${task.task_group}`);
  },
  genAbortTaskApi(task: any) {
    return genUrl(`/task/cancel/${task.campaign_id}/${task.task_group}`);
  },
  genRemoveTaskApi(task: any) {
    return genUrl(`/task/${task.campaign_id}/${task.task_group}`);
  },
} as Props;
