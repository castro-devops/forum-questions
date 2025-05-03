import { Slug } from "./slug";

it("should be able to create a new slug from text", () => {
  const slug = Slug.process("An example text to slug");

  expect(slug.value).toEqual("an-example-text-to-slug");
});