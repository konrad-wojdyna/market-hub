import { useNavigate } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { Navbar } from "../components";
import { ConversationList, ChatWindow } from "../components";
import { useCallback, useEffect } from "react";
import { useGetOrCreateConversation } from "../hooks/useGetOrCreateConversation";
import type { CreateConversationData } from "../types/conversation";

const MessagesPage = () => {
  const { conversationId } = useParams();
  const selectedConversationId = conversationId ? Number(conversationId) : null;
  const navigate = useNavigate();
  const { getOrCreateConversation } = useGetOrCreateConversation();
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get("listingId");
  const sellerId = searchParams.get("sellerId");

  const fetchData = useCallback(async () => {
    const data: CreateConversationData = {
      listingId: Number(listingId),
      user2Id: Number(sellerId),
    };
    const response = await getOrCreateConversation(data);
    if (response) navigate("/messages/" + response.id);
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
        <ChatWindow selectedConversationId={selectedConversationId} />
      </div>
    </section>
  );
};
export default MessagesPage;
