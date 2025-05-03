export class Slug {
  public value: string

  private constructor(text: string) {
    this.value = text
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  static process(text: string) {
    const textSlug = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/^-/, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '-')
      .replace(/_+/g, '-')
      .replace(/-+/g, '-')
      .replace(/-$/, '')

    return new Slug(textSlug)
  }
}
