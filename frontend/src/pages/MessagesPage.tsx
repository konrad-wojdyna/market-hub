import { useNavigate } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { Navbar } from "../components";
import { ConversationList, ChatWindow } from "../components";
import { useCallback, useEffect, useState } from "react";
import { useGetOrCreateConversation } from "../hooks/useGetOrCreateConversation";
import type {
  Conversation,
  CreateConversationData,
} from "../types/conversation";
import { useConversations } from "../hooks/useConversations";
import MessageInput from "../components/messages/MessageInput";

const MessagesPage = () => {
  const { conversationId } = useParams();
  const selectedConversationId = conversationId ? Number(conversationId) : null;
  const navigate = useNavigate();
  const { getOrCreateConversation } = useGetOrCreateConversation();
  const { conversations, error, isLoading } = useConversations();
  const activeConversation = conversations?.find(
    (c) => c.id === selectedConversationId,
  );
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get("listingId");
  const sellerId = searchParams.get("sellerId");

  const [conversationResponse, setConversationResponse] =
    useState<Conversation | null>(null);

  const fetchData = useCallback(async () => {
    const data: CreateConversationData = {
      listingId: Number(listingId),
      receiverId: Number(sellerId),
    };
    const response = await getOrCreateConversation(data);
    if (response) {
      setConversationResponse(response);
      navigate("/messages/" + response.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId, sellerId]);

  useEffect(() => {
    if (listingId && sellerId) {
      fetchData();
    }
  }, [listingId, sellerId, fetchData]);

  return (
    <section>
      <Navbar />
      <div>
        <ConversationList selectedConversationId={selectedConversationId} />
        <hr />
        <ChatWindow
          selectedConversationId={selectedConversationId}
          conversationName={
            activeConversation?.firstName ||
            conversationResponse?.firstName ||
            ""
          }
          listingTitle={
            activeConversation?.listingTitle ||
            conversationResponse?.listingTitle ||
            ""
          }
        />
        <MessageInput conversationId={selectedConversationId} />
      </div>
    </section>
  );
};
export default MessagesPage;
