import { useQuery } from "@tanstack/react-query";
import { get } from "@ygtang/http";

import { InspirationInterface } from "../../types/inspiration";

interface InspirationListResponseInterface {
  message: string;
  data: { content: InspirationInterface[] };
}

export function useGetInspirations() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["inspirations"],
    queryFn: async () => {
      const query = await get<InspirationListResponseInterface>(
        "v1/inspiration/list?size=4&page=0&sort=createdDateTime,desc",
      );
      return query;
    },
  });
  return { data: data?.data.content, isLoading, refetch };
}
