export const getToken = () => {
  if (typeof window === "undefined") return null;

  const auth = localStorage.getItem("auth");

  if (!auth) return null;

  try {
    const data = JSON.parse(auth);

    if (Date.now() > data.expiry) {
      localStorage.removeItem("auth");
      redirect("/login");
      return null;
    }

    return data.token;
  } catch (error) {
    
    // 🔥 corrupted data fix
    localStorage.removeItem("auth");
    return null;
  }
};

function redirect(url: string) {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}
