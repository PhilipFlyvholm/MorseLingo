import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1>MorseLingo</h1>
      <Button as={Link} color="success" href="/lessons">
        Start Learning
      </Button>
    </section>
  );
}
