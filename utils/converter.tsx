import { RecentlyPageData, SearchPageData } from "@/types/type";

export function convertSearchToJourney(resp: SearchPageData) {
  return {
    data: [
      {
        id: "search",
        name: "Search",
        progress: 0,
        paths: {
          total: resp.total,
          data: resp.data
        }
      }
    ],
    relationships: resp.relationships
  };
}

export function convertRecentlyToJourney(resp: RecentlyPageData) {
  return {
    data: [
      {
        id: "recent",
        name: "Recent",
        progress: 0,
        paths: {
          total: resp.total,
          data: resp.data
        }
      }
    ],
    relationships: resp.relationships
  };
}
