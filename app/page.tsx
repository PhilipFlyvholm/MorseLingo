import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-row items-center justify-center gap-4 py-8 md:py-10">
      <div>
        <Image
          alt="MorseLingo Logo"
          className="-scale-x-100"
          height={100 * 1.2051948052}
          src={"/Mascot_transparent.webp"}
          width={100}
        />
      </div>

      <Card className="p-5">
        <CardBody className="flex flex-col gap-4 justify-center">
          <h2 className="text-4xl font-semibold text-center">
            Learn Morse code the fun way
          </h2>
          <Button
            as={Link}
            className="text-white uppercase font-bold"
            color="success"
            href="/lessons"
            size="lg"
          >
            Start Learning
          </Button>
        </CardBody>
      </Card>
    </section>
  );
}
