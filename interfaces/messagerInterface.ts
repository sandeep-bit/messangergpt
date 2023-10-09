export interface sendMessageOptions {
  method: string;
  url: string;
  params: {
    access_token: string | undefined;
    recipient: string;
    messaging_type: string;
    message: string;
  };
}
