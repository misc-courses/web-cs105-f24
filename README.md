This is my template for course websites. New course sites can be created with `npx create-next-app -e https://github.com/ChristopherPAndrews/next-course-starter`

## Configuration

The file `site.config.js` is used to personalize the website. It should be obvious what values belong in there.

Also remember to set the deployment location for the deploy script.

## Content

The site is designed to require minimal interaction with the `pages` directory. The actual interesting content is markdown files in the `content` directory. The only essential file in there is the `info-body.mdx` file, which provide the course logistics.

It is also important to update the `content` field in the configuration. This determines the content and the ordering of the items in the sidebar menu. note that only the top level directory needs to be specified -- inner files will be auto-discovered.

## Future

The site is currently configured to allow `.mdx` files in the `pages` directory. I thought about putting all of my content in there as `.mdx` files, but decided I liked the flexibility of my custom pipeline (and the ability to add metadata that other tools could read). it is possible that this should be reexamined in the future. Also, it is possible that the MDX runtime function will someday be as useful as my current custom setup. This is something to look at again.


I would like the calendar to be more useful. The major issue is that it is difficult to see which day is which

Possibilities:
- I could just write more descriptive labels for the dates (i.e, include the name)
- I could integrate a little more date sense and add the names in after the fact. This would require either including the year in all dates or adding a date property to the calendar config.
- I could change the formatting entirely so that I just create a list of dated events

Open questions:
- Do I always include class meeting times?
- Do I automatically include due dates?
- What do I do about undated announcements?


## Warnings

I tried to update all packages and it broke everything. The transition to ESM is not a smooth one with Next.js. The unified/remark libraries are making the transition to ESM (and unified has some breaking changes with the way it is imported). The technique of using the next transpiler that converts them back to old school requires is not working. It worked for the fragments, but something in the full parser chokes and send the transpiler a null file path, which it dies on. For now, I've dropped back to pre-ESM versions of the libraries.