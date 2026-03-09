import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./ContextDefinitions";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getInitialUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (isMounted) setUser(data.user ?? null);
    };
    getInitialUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      if (authListener?.subscription) authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}