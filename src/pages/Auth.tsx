// src/pages/Auth.tsx - Zaktualizowany do pracy z AuthContext
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isLogin) {
        await login(email, password);
        // Po udanym logowaniu, nawigujemy do głównego panelu
        navigate("/admin"); 
      } else {
        await register(email, password);
        setMessage("Rejestracja pomyślna! Możesz się teraz zalogować.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isLogin ? "Witaj w HardbanRecords Lab" : "Stwórz Nowe Konto"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {message && <p className="text-green-500 text-sm text-center">{message}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Przetwarzanie..." : isLogin ? "Zaloguj się" : "Zarejestruj"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            {isLogin ? "Nie masz konta? " : "Masz już konto? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setMessage("");
              }}
              className="underline"
            >
              {isLogin ? "Zarejestruj się" : "Zaloguj się"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
