import type {
  Conversation,
  CreateConversationData,
} from "../types/conversation";
import { api } from "./api";

class ConversationService {
  async getConversations(): Promise<Conversation[]> {
    const response = await api.get("/conversations");
    return response.data;
  }

  async getOrCreateConversation(
    data: CreateConversationData,
  ): Promise<Conversation> {
    const response = await api.post("/conversations", data);
    return response.data;
  }
}

export default new ConversationService();
