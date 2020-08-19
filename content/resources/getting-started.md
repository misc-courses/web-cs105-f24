---
title: "Getting Started"
name: "Getting Started"
date: "2020-08-28"
published: true
---

In CS312 you will use a variety of software tools and online services. Please
get ready for the semester by making sure you have installed the following
tools and created the following free accounts. Read the instructions completely
before starting, paying close attention to the version numbers when specified.
You may have some of these tools already installed, or if you are working on
basin (basin.cs.midldebury.edu), some tools may already
have been installed for you. The latter is noted in the instructions. Don't
just copy-and-paste, some commands require modifications (e.g. with your e-mail
address).

_A note to Windows users_, most of the core tools we are using should be
available for Windows. Some of the ancillary tools, e.g. NVM, may not. Our
various workflows and exercises will have been developed and tested on OSX and
Linux, but not on windows. If you would like to work in a more tested environment, you could make use of [VirtualBox](http://www.cs.middlebury.edu/~pjohnson/guides/linux/) or the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to get a Linux distribution up and running on your machine.

A note to OSX users, many of these tools can be installed via
[Homebrew](https://brew.sh). If you are a current Homebrew user, keep an eye
out for that install option. If you are not yet a Homebrew user, I recommend
it. Homebrew is "package manager" for OSX that makes it easy to install (and
remove) software (especially open-source CLI SW).

### Browser

All of the modern browsers should work fine, however to ensure a common,
multi-platform, environment we will standardize on [Firefox](https://www.mozilla.org/en-US/firefox/). You are welcome to use any browser you are comfortable with, but this is the one that I will use to check your work.

I also encourage you to install the [Rect Development Tools extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) in Firefox, which will allow you to inspect your React component hierarchies (including state and props).

### Git and GitHub

1. Make sure you have [git](https://git-scm.com/downloads) installed. You likely already have Git installed (e.g. as part of OSX developer tools). If you are working on basin.cs.middlebury.edu, `git` is also already installed.

   _As an aside, OSX users should install XCode Command Line tools (which
   includes compilers and other relevant tools like Git) if you don't already
   have XCode installed. You will likely need those tools in another class.
   This [guide](http://railsapps.github.io/xcode-command-line-tools.html)
   includes step-by-step instructions._

1. If you haven't already, configure git with your name and e-mail

   ```
   git config --global user.name "your name"
   git config --global user.email "your email address"
   git config --global color.ui auto
   ```

   For example:

   ```
   git config --global user.name "Christopher Andrews"
   git config --global user.email "candrews@middlebury.edu"
   ```

1. Create a free [GitHub](https://github.com) account if you don't have on
   already. We will be using GitHub extensively, including for assignment
   submission. **Make sure that whatever e-mail address you used above is
   associated with your GitHub account so that project contributions are
   associated with your account.** Note that you can have multiple e-mail
   addresses associated with your account, e.g. you can add and should add your
   Middlebury e-mail address to an existing GitHub account. Once you have your
   account, [submit your GitHub username to the instructor(s) via this online form](https://docs.google.com/forms/d/e/1FAIpQLScW6H8wXlQ8oKrzEXSZ7OBZqf1kvsBl3M6Vu0A8EzT1WeLLPQ/viewform?usp=sf_link).
1. GitHub offers both SSH and HTTPS-based interfaces to your repository. GitHub recommends the HTTPS-based interface, but you can use either. SSH requires you to set up a public-key. See GitHub's [help page](https://help.github.com/en/articles/which-remote-url-should-i-use) for more information on these two options.

1. Request an [education discount](https://education.github.com) for your
   individual GitHub account (not as an organization). Doing so gives you free
   private repositories and will unlock free accounts at other services that
   integrate with GitHub!

### Node.js

Node.js is a stand-alone JavaScript engine that can be used to execute
JavaScript outside the browser, either locally on your computer or on a
"backend" server (i.e. "full-stack" JavaScript). We will be using the "long term support" (LTS) version which is 10.16.3. It will be important that you get this version and not use an older version you may happen to have (which may be missing features) or the latest, cutting edge version (which may have changed some features, and has certainly added some).

Windows users should install Node.js directly from <https://nodejs.org>. If you do not have Administrator privileges on the computer (e.g. it is a library laptop) you can still install Node by following the updated instructions in this StackOverflow [post](https://stackoverflow.com/a/37029090). In short, download the [Zip file](https://nodejs.org/en/download/) containing the Windows binaries and unpack those programs for use on your computer.

While OSX and Linux users can similarly install Node.js directly from <https://nodejs.org> we don't recommend that approach. Node.js moves quickly and so it is helpful to have a
tool to manage different versions. I use [Node Version
Manager](https://github.com/creationix/nvm) on OSX/Linux and encourage you to
as well. `nvm` is a tool for downloading and installing different versions of
Node.js (and associated tools) and a shell script for setting up your path to
use a specific version. Note that you will need to install NVM and Node.js,
even if you are using basin. Because Node.js moves so quickly it is
better for you to install it yourself so you have control over the version.

1. [Install `nvm`](https://github.com/creationix/nvm#installation).
1. Install the current Node.js long term support release, `lts/dubnium`. We will
   standardize on this version this semester.

   ```
   nvm install lts/dubnium
   ```

   If you get a `nvm: command not found` error, try opening a new terminal
   then running the install command. If that doesn't fix that error, there are
   additional debugging instructions for both Linux and OSX on the NVM
   installation [site](https://github.com/creationix/nvm#installation).

   If you get an error like the following on the College's Linux machines:

   ```
   Version '' (with LTS filter 'dubnium') not found - try `nvm ls-remote --lts=dubnium` to browse available versions.
   ```

   set an unencrypted mirror before trying to install Node.js:

   ```
   export NVM_NODEJS_ORG_MIRROR="http://nodejs.org/dist"
   ```

1. _Every time_ you start a new shell, you will use `nvm` to select a specific version of Node.js, e.g.

   ```
   nvm use lts/dubnium
   ```

   to set the version once, you can create a [`.nvmrc`
   file](https://github.com/creationix/nvm#nvmrc) in the top-level directory
   where you are working on your class assignments that specifies the Node.js
   version. Then you only need to run `nvm use`.

The default setup for NVM is to invoke the `nvm.sh` setup script whenever a new
shell starts. Doing so takes a few seconds, and depending on how often you
create a new shell that delay might be annoying. If you find yourself bothered
by the delay, and are comfortable at the command line, you can modify your
`.bashrc` (or `.bash_profile`) with the following:

<div markdown="1" id="nvm-startup" class="collapse">

Replace the following lines in your `.bashrc` (and any others, e.g. bash completion, added by NVM installation):

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

with:

```bash
# lazy loading nvm
setup_nvm() {
  unset -f node
  unset -f npm
  unset -f nvm
  unset -f npx
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
}

node() {
  setup_nvm
  node "$@"
}

npm() {
  setup_nvm
  npm "$@"
}

npx() {
  setup_nvm
  npx "$@"
}

nvm() {
  setup_nvm
  nvm "$@"
}
```

This lazily loads NVM whenever you use `nvm`, or the Node.js tools (`node`,
`npm` and `npx`). Note that you may need to modify the above if you install NVM
via Homebrew or another package manager. Specifically if you use Homebrew, you will likely need to replace `[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"` with `source "$(brew --prefix nvm)/nvm.sh"`.

</div>

Users on all platform should configure `npm`, the Node.js package manager, distributed as part of the Node.js installation (replacing `email address` with your e-mail address, etc.) with their information:

```
npm set init.author.email "email address"
npm set init.author.name "name"
npm set init.license "Apache-2.0"
```

### SQLite

1. Install the [sqlite-tools](https://www.sqlite.org/download.html) for your
   platform to obtain the `sqlite3` CLI for SQLite. Note that this tool is
   typically already installed as part of OSX and is already on basin. This tool is not needed until the second half of the class, the absence of SQLite will not prevent you from completing the programming assignments in the first half of the course.

### MongoDB

1. Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/). MongoDB is already installed on basin. This tool is not needed until the second half of the class, the absence of MongoDB will not prevent you from completing the programming assignments in the first half of the course.

### Heroku

Throughout the semester we will deploy our applications to
[Heroku](https://heroku.com), a "platform-as-a-service" (PaaS).

1. Create a free [Heroku account](https://id.heroku.com/signup/login)
1. Install the [Heroku CLI
   tools](https://devcenter.heroku.com/articles/heroku-cli). The Heroku tools
   (`heroku`) are already installed on basin.

### Travis CI

We will use Travis CI for continuous integration (CI). <https://travis-ci.com>
(the commercial side for private repositories) offers [free
accounts](https://education.travis-ci.com) to students enrolled in GitHub's
education program.

1. _After you have successfully enrolled in GitHub's education program_,
   sign-up for a free account at [Travis CI](https://education.travis-ci.com).
