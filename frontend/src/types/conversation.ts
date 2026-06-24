export interface Conversation {
  id: number;
  receiverId: number;
  firstName: string;
  avatar: string;
  listingTitle: string;
  lastMessageContent: string;
  lastMessageAt: string;
}

export interface CreateConversationData {
  receiverId: number;
  listingId: number;
}
