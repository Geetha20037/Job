import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage("jobora-user", null));
  const [savedJobs, setSavedJobs] = useState(() =>
    readStorage("jobora-saved-jobs", []),
  );
  const [appliedJobs, setAppliedJobs] = useState(() =>
    readStorage("jobora-applied-jobs", []),
  );

  useEffect(() => {
    localStorage.setItem("jobora-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("jobora-saved-jobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem("jobora-applied-jobs", JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const login = useCallback((email, password) => {
    if (!email.trim() || !password) {
      return { success: false, message: "Enter your email and password." };
    }

    const accounts = readStorage("jobora-accounts", []);
    const account = accounts.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (account && account.password !== password) {
      return { success: false, message: "Incorrect password." };
    }

    const nextUser = account
      ? { name: account.name, email: account.email }
      : {
          name: email.split("@")[0].replace(/[._-]/g, " "),
          email: email.trim(),
        };

    setUser(nextUser);
    return { success: true, message: "Welcome back!" };
  }, []);

  const signup = useCallback((name, email, password) => {
    if (!name.trim() || !email.trim() || !password) {
      return { success: false, message: "Please complete all fields." };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must contain at least 6 characters.",
      };
    }

    const accounts = readStorage("jobora-accounts", []);
    const exists = accounts.some(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (exists) {
      return {
        success: false,
        message: "An account with this email already exists. Please log in.",
      };
    }

    const account = {
      name: name.trim(),
      email: email.trim(),
      password,
    };

    localStorage.setItem(
      "jobora-accounts",
      JSON.stringify([...accounts, account]),
    );

    setUser({ name: account.name, email: account.email });

    return { success: true, message: "Your account has been created!" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const toggleSaveJob = useCallback((jobId) => {
    let saved = false;

    setSavedJobs((current) => {
      saved = !current.includes(jobId);
      return saved
        ? [...current, jobId]
        : current.filter((id) => id !== jobId);
    });

    return saved;
  }, []);

  const applyToJob = useCallback((jobId) => {
    let alreadyApplied = false;

    setAppliedJobs((current) => {
      alreadyApplied = current.some((item) => item.jobId === jobId);

      if (alreadyApplied) return current;

      return [
        {
          jobId,
          appliedAt: new Date().toISOString(),
          status: "Application submitted",
        },
        ...current,
      ];
    });

    return !alreadyApplied;
  }, []);

  const value = {
    user,
    savedJobs,
    appliedJobs,
    login,
    signup,
    logout,
    toggleSaveJob,
    applyToJob,
    isSaved: (id) => savedJobs.includes(id),
    isApplied: (id) => appliedJobs.some((item) => item.jobId === id),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}