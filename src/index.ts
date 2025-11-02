import { HelloService } from '@features/hello/hello.service';

// @ts-ignore
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function main(): void {
  const hiMessage = HelloService.sayHi('CLASP');

  console.log({ hiMessage });
}
