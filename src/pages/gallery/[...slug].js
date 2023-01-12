import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function GalleryPage() {
  const router = useRouter();
  const frameRef = useRef();
  let project;
  let page;

  useEffect(() => {
    // Set the size of the iframe to fill the current window
    const resizeFrame = () => {
      frameRef.current.style.height = `${
        window.innerHeight - frameRef.current.getBoundingClientRect().top - 20
      }px`;
    };

    resizeFrame();
    window.addEventListener("resize", resizeFrame);

    return () => {
      window.removeEventListener("resize", resizeFrame);
    };
  }, []);

  if (Array.isArray(router.query.slug) && router.query.slug.length === 2) {
    const [project, page] = router.query.slug;

    /* annoyingly, when this component is accessed in "live" mode, this three directories deep (which makes a bit of sense since this is gallery/project/page), but in static export mode, this is only two. This is currently in the two deep mode.*/

    return (
      <div>
        <p>
          <Link href="../../projects/project-showcase">
            <a>Return to Project directory</a>
          </Link>
        </p>
        <iframe
          ref={frameRef}
          src={`../../showcase/project${project}/${page}/index.html`}
          style={{ width: "100%" }}
        ></iframe>
      </div>
    );
  } else {
    return (
      <div>
        <p>Nothing to see here</p>
      </div>
    );
  }
}

/**
 * Specifies which dynamic routes should be pre-rendered
 */
export async function getStaticPaths() {
  const paths = [];

  for (let project = 4; project <= 5; project++) {
    for (let page = 1; page <= 14; page++) {
      paths.push({
        params: {
          slug: [project.toString(), page.toString().padStart(2, "0")],
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
}

/**
 * Fetch the data for the page to be rendered.
 *
 * @param {*} param0
 */
export async function getStaticProps({ params }) {
  return {
    props: { project: params.slug[0], page: params.slug[1] },
  };
}
