import { Grid2x2 } from "lucide-react";
import { Link } from "react-router-dom";
import NameInitials from "./NameInitials";

type ConversationItemProps = {
  conversationId: number;
  initials: string;
  name: string;
  listingTitle: string;
  lastMessage: string;
  timeAgo: string;
};

const ConversationItem = ({
  conversationId,
  initials,
  name,
  listingTitle,
  lastMessage,
  timeAgo,
}: ConversationItemProps) => {
  return (
    <li>
      <Link
        to={`/messages/${conversationId}`}
        className="flex items-center gap-3"
      >
        <NameInitials initials={initials} />
        <div className="flex flex-col gap-[0.1]">
          <p>{name}</p>
          <div className="flex items-center gap-1">
            <Grid2x2 className="w-3" />
            <small>{listingTitle}</small>
          </div>
          <small>{lastMessage}</small>
        </div>
        <small className="self-start ml-auto text-gray-500">{timeAgo}</small>
      </Link>
    </li>
  );
};
export default ConversationItem;
