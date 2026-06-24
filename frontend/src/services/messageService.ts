import type { Message, CreateMessageData } from "../types/message";
import { api } from "./api";

class MessageService {
  async getMessages(conversationId: number): Promise<Message[]> {
    const response = await api.get(`/conversations/${conversationId}/messages`);
    return response.data;
  }

  async sendMessage(data: CreateMessageData): Promise<Message> {
    const response = await api.post("/messages", data);
    return response.data;
  }
}

export default new MessageService();
