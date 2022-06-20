type Campaign = {
  owner_email: string;
  send_from_email?: string;
  send_from_name?: string;
  campaign_id: string;
  campaign_name: string;
  reply_to_email: string;
  email_subject: string;

  email_template_key?: string;
  config_csv_key: string;

  email_template_url?: string;
  config_csv_url?: string;

  to_email_column: string;
  attachment_column: string;
  allow_opt_out: boolean;
  opt_out_message?: string;
  schedule_dates: string[];
  campaign_status: CampaignStatusEnum;
  created_at?: string;
  updated_at?: string;
  attachment_key_prefix?: string;
  // recurring?: string;
  //
  tasks?: Task[];
  opt_out_emails?: string;
};
