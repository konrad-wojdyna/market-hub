export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  firstName: string;
  avatar: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateMessageData {
  conversationId: number;
  content: string;
}
