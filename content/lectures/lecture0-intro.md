---
title: 'Lecture 0 - Introduction'
name: 'Lecture 0 - Intro'
date: '2020-09-08'
published: true
---

# Introduction

Some content goes here

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

<ul>
<li>one</li>
<li>two</li>
</ul>

<hidden-block message="Click to see">

_Boo_

</hidden-block>

```javascript
import Link from 'next/link';

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```
