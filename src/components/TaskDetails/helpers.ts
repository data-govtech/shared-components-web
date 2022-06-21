import { TaskStatusEnum } from '../../types/enums';

export function separateEmailsByStatus(
  emailList: EmailStatus[],
  defaultPendingEmails: string[] = []
) {
  return emailList.reduce<[string[], EmailStatus[], EmailStatus[]]>(
    (acc, item) => {
      const emails = item.to_emails;

      switch (item.task_status_name) {
        case TaskStatusEnum.PENDING:
          acc[0].push(...emails);
          break;

        case TaskStatusEnum.TRIGGER:
        case TaskStatusEnum.COMPLAINT:
        case TaskStatusEnum.OPEN:
        case TaskStatusEnum.SEND:
        case TaskStatusEnum.CLICK:
        case TaskStatusEnum.DELIVERY:
        case TaskStatusEnum.DELIVERY_DELAY:
          acc[1].push(...emails.map((email) => ({ ...item, email })));
          break;

        case TaskStatusEnum.BOUNCE:
        case TaskStatusEnum.RENDERING_FAILURE:
        case TaskStatusEnum.INVALID:
        case TaskStatusEnum.DEAD_LETTER:
        case TaskStatusEnum.REJECT:
          acc[2].push(...emails.map((email) => ({ ...item, email })));
          break;
      }

      return acc;
    },
    [defaultPendingEmails, [], []]
  );
}
