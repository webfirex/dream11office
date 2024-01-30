import NodeCache from "node-cache";

// 60 seconds
export const LocalCache = new NodeCache({ stdTTL: 60 });
