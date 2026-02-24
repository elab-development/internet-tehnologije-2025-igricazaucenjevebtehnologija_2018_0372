const API_URL = "http://localhost:5000/api";


export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Login failed");
  return data;
};

export const fetchChallenges = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/challenges`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const fetchChallangeById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/challenges/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

export const submit = async (id, code) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/challenges/${id}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ code })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

export const fetchSolvedChallengeIds = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/challenges/solved`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};