import { Grid2x2 } from "lucide-react";
import { Link } from "react-router-dom";
import NameInitials from "./NameInitials";
import ChatMessage from "./ChatMessage";
import { useMessages } from "../../hooks/useMessages";
import { ErrorComponent, Loading } from "..";

type ChatWindowProps = {
  selectedConversationId: number | null;
};

const ChatWindow = ({ selectedConversationId }: ChatWindowProps) => {
  const conversationId = selectedConversationId || 0;

  const { messages, error, isLoading } = useMessages(conversationId);

  if (conversationId === 0) {
    return <h1>Wybierz konwersację</h1>;
  }
  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 m-4 bg-gray-100">
      <nav className="flex items-center justify-between gap-2 bg-gray-300">
        <div className="flex gap-2 items-center">
          <NameInitials initials="MK" />
          <p>Marek Kowalski</p>
        </div>
        <Link
          to={"/listings"}
          className="flex items-center gap-1 border p-1 rounded-md
          border-gray-400"
        >
          <Grid2x2 size={15} />
          <small>iPhone 13 Pro 3200zł</small>
        </Link>
      </nav>
      <div className="flex flex-col gap-2">
        <p className="m-auto">Today</p>
        <ul className="flex flex-col gap-4">
          <ChatMessage
            messages={[
              "Cześć! Widziałem Twoje ogłoszenie. Czy iPhone jest nadal dostepny?",
              "Interesuje mnie też stan baterii - ile % ma?",
            ]}
          />
          <li>
            <NameInitials initials="JA" size="sm" showOnlineDot={false} />
            <p>
              Tak, jest dostępny! Stan baterii 91%, telefon w bardzo dobrym
              stanie.
            </p>
            <p>Mam też oryginalne pudełko i ładowarkę</p>
          </li>
          <li>
            <NameInitials initials="MK" size="sm" showOnlineDot={false} />
            <p>Brzmi świetnie! Czy jest możliwość negocjacji ceny?</p>
          </li>
          <li>
            <NameInitials initials="JA" size="sm" showOnlineDot={false} />
            <p>Mogę zejść do 3 000zł, ale to ostateczna cena.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ChatWindow;
