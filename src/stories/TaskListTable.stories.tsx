import 'antd/dist/antd.css';

// import '../types/global';
import { Button } from 'antd';
import { ComponentProps } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TaskListTable as TaskListTableCmp } from '../components/TaskListTable/TaskListTable';
import { CampaignStatusEnum } from '../types/enums';
import { TASK_LIST } from './data';

export default {
  title: 'TaskList',
  component: TaskListTableCmp,
  parameters: {},
} as ComponentMeta<typeof TaskListTableCmp>;

const Template: ComponentStory<typeof TaskListTableCmp> = (args) => <TaskListTableCmp {...args} />;

type Props = ComponentProps<typeof TaskListTableCmp>;

function genUrl(url: string) {
  return `https://api.capdev.link/v1/blastoise${url}`;
}

export const TaskListTable = Template.bind({});
TaskListTable.args = {
  dataSource: TASK_LIST,
  campaignStatus: CampaignStatusEnum.Active,
  genDetailsNode() {
    return <Button type="link">Details</Button>;
  },
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
