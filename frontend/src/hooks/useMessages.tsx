import messageService from "../services/messageService";

export const useMessages = (conversationId: number) => {
  // TODO: refactor to React Query (useQuery) when returning to chat feature
  // const { data, isLoading, error } = useAsync({
  //   service: () => messageService.getMessages(conversationId),
  //   dependencies: [conversationId],
  // });

  // return { messages: data ?? [], isLoading, error };

  return null;
};
