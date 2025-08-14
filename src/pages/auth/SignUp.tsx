import { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";

const SignupPage = () => {
  const { signup, error, loading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await signup(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAuthError(err.message);
      }
    }
  };

  return (
      <div className="bg-primary-900 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6">
          Sign Up for HarmonySketch
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white mb-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-800 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white mb-2">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-primary-800 text-white"
              placeholder="Create a password"
              required
            />
          </div>
          {authError && <p className="text-red-500 text-sm">{authError}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-white text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
  );
};

export default SignupPage;
