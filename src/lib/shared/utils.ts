export const getUniqueId = () => Math.floor(Math.random() * Date.now());
export const pause = (limit: number) => new Promise((resolve) => setTimeout(resolve, limit));
