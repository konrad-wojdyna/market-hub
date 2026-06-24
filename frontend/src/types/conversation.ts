export interface Conversation {
  id: number;
  receiverId: number;
  firstName: string;
  avatar: string;
  lastMessageAt: string;
}

export interface CreateConversationData {
  receiverId: number;
  listingId: number;
}
