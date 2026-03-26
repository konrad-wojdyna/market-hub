import { Search } from "lucide-react";
import ConversationItem from "./ConversationItem";
import { useConversations } from "../../hooks/useConversations";
import { Loading, ErrorComponent } from "../../components";

type ConversationListProps = {
  selectedConversationId: number | null;
};

const ConversationList = ({
  selectedConversationId,
}: ConversationListProps) => {
  const { conversations, isLoading, error } = useConversations();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <div>
      <nav className="flex flex-col gap-2 m-4">
        <p>Messages</p>
        <form>
          <div className="flex gap-2 border border-gray-200 p-2 rounded-md">
            <Search />
            <input type="text" placeholder="Search conversations..." />
          </div>
        </form>
      </nav>
      <ul className="flex flex-col gap-4 m-4">
        {conversations?.map((conversation) => {
          const {
            id,
            lastMessageAt,
            otherUserFirstName,
            otherUserLastName,
            listingTitle,
          } = conversation;
          return (
            <ConversationItem
              key={id}
              conversationId={id}
              initials={`${otherUserFirstName[0]}${otherUserLastName[0]}`.toUpperCase()}
              name={otherUserFirstName}
              listingTitle={listingTitle}
              lastMessage=""
              timeAgo={lastMessageAt}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default ConversationList;
