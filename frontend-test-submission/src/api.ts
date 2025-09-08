const API_URL = "http://localhost:8080";

export const shorten = async (url: string, minutes: number) => {
  const res = await fetch(`${API_URL}/api/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, minutes }),
  });
  return res.json();
};

export const getStats = async () => {
  const res = await fetch(`${API_URL}/api/stats`, {
    method: "GET",
  });
  return res.json();
};
