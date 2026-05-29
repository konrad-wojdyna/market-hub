export interface Conversation {
  id: number;
  user1Id: number;
  user2Id: number;
  otherUserFirstName: string;
  otherUserLastName: string;
  listingId: number;
  listingTitle: string;
  lastMessageAt: string;
}

export interface CreateConversationData {
  user2Id: number;
  listingId: number;
}
