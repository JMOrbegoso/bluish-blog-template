# BluishBlog template for Nextjs: A statically generated blog using Next.js, Markdown, and TypeScript

This project is based on the existing [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) plus TypeScript.

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using Markdown files as the data source.

The blog posts are stored in `/_posts/{lang}` folder, where {lang} is the locale of the post, for example, currently the english posts are in `/_posts/en` and the spanish posts in `/_posts/es`, the posts are writed as Markdown files with front matter support. Adding a new Markdown file in there will create a new blog post.

To create the blog posts we use [`remark`](https://github.com/remarkjs/remark) and [`remark-html`](https://github.com/remarkjs/remark-html) to convert the Markdown files into an HTML string, and then send it down as a prop to the page. The metadata of every post is handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and also sent in props to the page.

## Features

- TypeScript. 💙
- Prettier code formatting.
- ESLint.
- Multi-language support.
- Posts with tags.
- Tags with SVG image files.
- Pagination.
- React Bootstrap.
- Post comments with Disqus.
- Share post menu (Twitter, Facebook, Telegram, LikedIn).
- RSS Feeds.
- SEO.
- Sitemap.xml.
- Favicons generation.
- Table of Content on posts.
- Post searcher.

## How to use

### Local

After create the project, install the dependencies with:

```bash
# Using npm:
npm install

# Using Yarn:
yarn
```

Run in development mode:

```bash
# Using npm:
npm run dev

# Using Yarn:
yarn dev
```

Run in production mode:

```bash
# Using npm:
npm run build && npm run start

# Using Yarn:
yarn build && yarn start
```

### Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/JMOrbegoso/bluish-blog-template&project-name=bluish-blog-template&repository-name=bluish-blog-template)

Execute [`create-next-app`](https://vercel.com/new/git/external?repository-url=https://github.com/JMOrbegoso/bluish-blog-template) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
# Using npx:
npx create-next-app --example https://github.com/JMOrbegoso/bluish-blog-template bluish-blog

# Using Yarn:
yarn create next-app --example https://github.com/JMOrbegoso/bluish-blog-template bluish-blog
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)!

If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Add a Tag

- Add the tag as enum in src/enums/tag.ts
- Add the svg image of the tag in public/assets/tags/
- Add the tag title in the the file src/lib/tag-helpers.ts.
- That's all, now the tag can be used on any post.

### Favicons

The favicons are auto generated by a script, you just move your blog logo to the path: `public/assets/blog/`, and the file must have the name: `logo.png`, and that's all, the favicons will be generated on each production build.

### Sitemap.xml

Sitemap.xml file is generated by a script, do not forget upload it to Google Search Console to improve the SEO of your page.

### Table of contents

Remember to update the value of TABLE_OF_CONTENT_KEYWORDS of the Constants file adding all your keywords to find in the post's markdown and insert the table of content.

## Notes

- This blog-starter-typescript uses [Tailwind CSS](https://tailwindcss.com). To control the generated stylesheet's filesize, this example uses Tailwind CSS' v2.0 [`purge` option](https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css) to remove unused CSS.

- [Tailwind CSS v2.0 no longer supports Node.js 8 or 10](https://tailwindcss.com/docs/upgrading-to-v2#upgrade-to-node-js-12-13-or-higher). To build your CSS you'll need to ensure you are running Node.js 12.13.0 or higher in both your local and CI environments.

- Github found potential security vulnerabilities in the dependencies, that's because `favicons` package use `url-regex ` and `jpeg-js`, packages with potential security vulnerabilities, but there aren't problem with that because `favicons` just run in a script in the build process.
