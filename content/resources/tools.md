---
title: Tools
path: "/resources/tools"
name: "Tools"
date: "2019-08-28"
published: true
---

Tools play a strong role in making us efficient developers. They can help us in all sorts of subtle ways. Almost every developer I've ever met had **VIEWS** about the tools that they (and others use). There is no one size fits all solution. Some like the handle/hide all of the details approach taken by IDEs like Eclipse, while others swear that vim and a shell is the One True Way.

In this class, we can do pretty much everything with a good text editor, a terminal emulator, some command line tools and a web browser. However, some editors are better than others, and there are features lurking in the better ones. There are also some other tools that can ease the burden of some tasks. This goal of this page is to accumulate some useful tools that may make development easier. If you find an interesting tool or extension, post it to Piazza, and if we agree that it seems generally useful, we'll add it in here.

## Working with Git

It takes a while before you really start to _understand_ git (there are still knotty side corners I never venture into). It is worth learning how to use the command line interface, because then you can use it anywhere, even over SSH to remote servers, however, that doesn't mean that there aren't other options.

### GitKraken

[GitKraken](https://www.gitkraken.com/git-client) is a GUI git client. Folks who are struggling to remember the add, commit, push dance might want to use GitKraken as a facilitator All the tools you need for a basic commit are down the right side and the center is dominated by a nice visualization showing you all of your commits and where the local machine is relative to the remote. When you start using branches, it shows those as well.

![GitKraken](../images/resources/gitkraken_overview.png)

These features are nice, but once you master the command line interface, these aren't essential (though the visualization still looks better than the graphical representation offered on the command line). There are some advanced features however, that are why I return to it.

For instance, it has a rather nice interface for sorting out merge errors (something you will dread when you start encountering them).

Another feature I love is that you can click on a changed file and it will show you what exactly in the file has been changed. Notice that each changed hunk is treated separately and we have the option to discard it (i.e., out of order undo!) or stage it.

![GitKraken](../images/resources/gitkraken_hunks.png)

Being able to stage individual hunks can be useful when you start thinking more carefully about your git usage. Right now, it is probably just a clunky save button for you. With some thought however, you can use the commits to tell the story of the project (rather than having commit messages like "stopped for dinner"). It is useful to be able to separate out the changes and make separate commits for different features that you added to the code. While you could certainly just _write_ your code that way, often things don't work out like that. Maybe you found a little bug while adding a feature. The feature doesn't work (and it won't pass any tests), so you don't want to commit it, but the bug fix should be fine and shared. You can selective just the hunks of code related to that fix and commit those.

GitKraken now requires you to have a license to access private repositories (which all of ours are). However, you can get it for free through the [GitHub Student Developer Pack](https://education.github.com/pack) (with a collection of other licenses and services).

### Text editor git packages

You shouldn't neglect your text editor either. Wandering around the classroom it seems like [Atom](https://atom.io) is the dominate editor of choice. It is a good choice, and one I pushed strongly when everyone was using Sublime in "trial mode". I've since moved to [VSCode](https://code.visualstudio.com) for some small reasons like startup time and some of the interface choices. In both cases, however, they have reasonable git integration.

In both editors, I recommend opening directories instead of files. In Atom, the files will be color coded based on their git status.

![Atom main view](../images/resources/atom_main.png)

You can also toggle the git panel, which will give you some of the functionality of GitKraken (including per hunk staging and discarding). The toggle is hidden in the menu under Packages > GitHub.

![Atom git tab](../images/resources/atom_git_tab.png)

In VSCode, there is a dedicated icon on the left to look at the changed files. From there you can stage changes (by clicking the little plus sign), commit and push. Clicking on the file will show you a diff view, and individual hunk control is available here through the context menu. The controls in Atom are possibly a little better (and worlds better than the state they were in when I switched), but I still like by dedicated tab for simple commits.

![VSCode main view](../images/resources/vscode_git.png)

## Debugging React

### React DevTools

React DevTools is a great tool for helping you see how your components are interacting. It will allow you to see your component hierarchy and to see all of the state and props. There is a [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/), a [Chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) that can be installed in any chromium based browser (I use Vivaldi rather than Chrome most of the time), and a [stand-alone application](https://www.npmjs.com/package/react-devtools) if you use some other browser.
