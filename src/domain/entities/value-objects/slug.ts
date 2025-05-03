export class Slug {

  public value: string;

  constructor(text: string)
  {
    this.value = text;
  }

  static process(text: string) {
    const textSlug = text
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/^-/, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '-')
      .replace(/_+/g, '-')
      .replace(/-+/g, '-')
      .replace(/-$/, '')

    return new Slug(textSlug);
  }

}