export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateMessageData {
  user2Id: number;
  listingId: number;
  content: string;
}
