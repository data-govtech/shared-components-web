export enum TaskGroupStatusEnum {
  Draft = 'Draft',
  InProgress = 'InProgress',
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Pending = 'Pending',
  Error = 'Error',
  Aborted = 'Aborted',
}

export enum CampaignStatusEnum {
  Active = 'Active',
  Ended = 'Ended',
  Draft = 'Draft',
}

export enum TaskStatusEnum {
  RENDERING_FAILURE = 'Rendering Failure',
  // SES Built-in Status
  BOUNCE = 'Bounce',
  COMPLAINT = 'Complaint',
  DELIVERY = 'Delivery',
  SEND = 'Send',
  REJECT = 'Reject',
  OPEN = 'Open',
  CLICK = 'Click',
  RENDER_FAILURE = 'Rendering Failure',
  DELIVERY_DELAY = 'DeliveryDelay',
  // Mail Postman Status
  PENDING = 'Pending',
  TRIGGER = 'Trigger',
  INVALID = 'Invalid',
  DEAD_LETTER = 'Dead Letter',
}
