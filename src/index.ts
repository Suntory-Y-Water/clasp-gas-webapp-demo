import { HelloService } from "@features/hello/hello.service";

// @ts-expect-error
function main(): void {
  const hiMessage = HelloService.sayHi("CLASP");

  console.log({ hiMessage });
}
