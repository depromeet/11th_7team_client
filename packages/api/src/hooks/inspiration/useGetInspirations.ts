import { useQuery } from "@tanstack/react-query";
import { get } from "@ygtang/http";

import { InspirationInterface } from "../../types/inspiration";

interface InspirationListResponseInterface {
  message: string;
  data: { content: InspirationInterface[] };
}

export function useGetInspirations({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["inspirations", isLoggedIn],
    queryFn: async () => {
      console.log("??");
      const { data } = await get<InspirationListResponseInterface>(
        "/v1/inspiration/list?size=4&page=1&sort=createdDateTime,desc",
      );

      return data.content;
    },
    placeholderData: [],
    enabled: isLoggedIn,
  });

  return { data, isLoading };
}
