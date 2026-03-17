import { sharedAnimationCards } from "@/components/auth/animation-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import Link from "next/link";

const AuthErrorPage = () => {
  return (
    <Card className={sharedAnimationCards}>
      <CardHeader>
        <CardTitle className="text-xl">Something went wrong.</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href="/auth"
          className="hover:text-primary opacity-75 transition-opacity duration-100 hover:opacity-100"
        >
          <span>Back to login</span>
        </Link>
      </CardContent>
    </Card>
  );
};

export default AuthErrorPage;
