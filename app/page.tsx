import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import Image from "next/image";

import Button from "@/components/buttons/Button";

export default function Home() {
  return (
    <section className="flex flex-col sm:flex-row items-center justify-center gap-4 py-0 md:py-10">
      <Image
        alt="MorseLingo Logo"
        className="max-w-[300px] w-[50%]"
        height={910}
        src={"/Front_page_graphic.png"}
        width={512}
      />

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
