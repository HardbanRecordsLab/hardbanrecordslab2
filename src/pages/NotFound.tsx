import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Strona nie została znaleziona</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Wróć na stronę główną</Link>
      </Button>
    </div>
  )
}

