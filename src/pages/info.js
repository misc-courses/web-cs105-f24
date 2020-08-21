import Head from "next/head";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Info() {
  return (
    <Layout
      currentPage={{ path: "/info", title: "Course info" }}
      modified={"2020-08-19"}
    >
      <Head>
        <title>CS312 Course Information</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>CS312 - Course Information</h1>

      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <th>Professor</th>
            <td>Christopher Andrews</td>
          </tr>
          <tr>
            <th>Office</th>
            <td>215 75 Shannon Street </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>candrews@middlebury.edu</td>
          </tr>
          <tr>
            <th>Office hours</th>
            <td>TBD</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <a href="http://go.middlebury.edu/cs312">/go/cs312</a>
            </td>
          </tr>
          <tr>
            <th>Class meetings</th>
            <td>
              TTh 9:35a-10:50a (X), 11:10a-12:25p (Y), 1:40p-2:55p (Z), 224
              75SHS
            </td>
          </tr>
          <tr>
            <th>Discussion forum</th>
            <td>
              <a href="http://piazza.com/middlebury/fall2020/cs312/home">
                Piazza
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3>Course Objectives</h3>
        <p>At the completion of the course you should be able to:</p>
        <ol>
          <li>
            Describe and employ modern methodologies for managing SW
            development, specifically Agile and Scrum
          </li>

          <li>
            Use tools and services that support those processes, such as version
            control, GitHub, continuous integration, etc.
          </li>

          <li>
            Describe and employ SW development principles, patterns and
            best-practices, such as design patterns, SOLID, test-driven
            development (TDD), etc.
          </li>

          <li>
            Describe, evaluate and employ technologies for full stack web
            development and single page web applications (SPAs)
          </li>

          <li>
            Complete a large software development project as part of a team
          </li>
        </ol>
      </div>

      <div>
        <h3>Class deliverables</h3>

        <p>There will be four different kinds of deliverables in this class:</p>
        <p>
          <strong>Practical exercises</strong>: Throughout the semester, there
          will be a collection of in-class exercises where you will work through
          examples yourselves. These are very much in the form of tutorials, and
          are very prescriptive. Our "in-class" time will largely be devoted to
          working on these. You will turn these in, and they will be scored as
          "Meets Expectations" (M), "Revision Needed" (R) or "Not Assessable"
          (N). Practicals earning an R or an N may be revised and resubmitted.
        </p>

        <p>
          <strong>Assignments</strong>: In the first half the semester you will
          complete (approximately) weekly programming assignments. These will be
          scored as "Exceeds Expectations" (E), "Meets Expectations" (M),
          "Revision Needed" (R) or "Not Assessable" (N). Assignments earning an
          R or an N may be revised and resubmitted. As the assignments build
          upon one another, starting an assignment that contains the solution to
          the previous one ends the revision period.
        </p>

        <p>
          <strong>Weekly assessments</strong>: Every week, we will do a short
          assessment exercise. These will primarily consist of short answer
          questions about the material covered up to that point in the class.
          Each will be marked as belonging to one of the three major topic areas
          of the class: "skills" (technical implementation, e.g., writing a
          short function or debugging an implementation), "concepts" (more
          theoretical questions, e.g., demonstrating knowledge of different
          patterns, describe pros and cons of different kinds of databases), and
          "process" (questions about the software development process, e.g.,
          writing user stories, describing the pros and cons of different kinds
          of testing). These will be scored with a binary "credit"/"no credit".
        </p>

        <p>
          <strong>Project</strong>: The focus of this class is the final
          project. In the second half the semester you will undertake a large
          software development project as part of team of approximately 8
          students (we will probably use the lab sections as divisions). You
          will need to be in frequent contact with your group and actively
          contributing as a software developer each week. Your grade for the
          final project will be determined in part by the overall success of
          your project, but will mostly be determined by your participation and
          contributions to the project in both coding and non-coding activities.
          You will submit regular status reports summarizing your contributions
          and may also be evaluated by your peers. The details of the scoring
          will be released separately, but for the purposes of assessment, it
          will be distilled down to a number between 0 and 4.
        </p>
      </div>

      <div>
        <h3>Assessment Tiers</h3>

        <p>
          In this class, we will be using an approach called{" "}
          <em>specification grading</em>. Rather than translating all of the
          above into percentages which are then used to assign you some number
          between 0-100 which is then translated to a letter, we will have a
          series of "assessment tiers". You are welcome to set your sights on
          any tier. Since I still need to report a grade, the tier you achieved
          will determine your grade. If you exceed the expectations of your
          tier, but don't quite reach the next one, +/- modifiers will be added.
        </p>

        <p>
          At the <strong>Mastery</strong> tier (A equivalent), you will
          demonstrate a firm understanding of all of the aspects of the class
          and a commitment to the project and the process. To achieve this
          level, you will fulfill the following requirements:
        </p>

        <ul>
          <li>
            Complete all assignments at or above M, with at least two at the E
            level
          </li>
          <li>Have no more than 1 practical below the M level</li>
          <li>
            Earn 15+ assessment points, with at least 5 points in each topic
            area
          </li>
          <li>Achieve a project score at or above 2.25</li>
        </ul>

        <p>
          At the <strong>Proficiency</strong> tier (B equivalent), you will
          demonstrate a good understanding of most of the aspects of the class
          and a commitment to the project and the process. To achieve this
          level, you will fulfill the following requirements:
        </p>

        <ul>
          <li>Complete all assignments at or above M</li>
          <li>Have no more than 2 practicals below the M level</li>
          <li>
            Earn 12+ assessment points, with at least 2 points in each topic
            area
          </li>
          <li>Achieve a project score at or above 1.75</li>
        </ul>

        <p>
          At the <strong>Competency</strong> tier (C equivalent), you will
          demonstrate a fair understanding of most of the aspects of the class
          and show some commitment to the project and the process. To achieve
          this level, you will fulfill the following requirements:
        </p>

        <ul>
          <li>
            Complete all assignments at or above R, with at least 3 above M
          </li>
          <li>Have no more than 3 practicals below the M level</li>
          <li>
            Earn 9+ assessment points, with at least 1 points in each topic area
          </li>
          <li>Achieve a project score at or above 1.25</li>
        </ul>

        <p>
          At the <strong>Familiarity</strong> tier (D equivalent), you will
          demonstrate a fair understanding of some of the aspects of the class
          and participated to some extent on the project. To achieve this level,
          you will fulfill the following requirements:
        </p>

        <ul>
          <li>Complete at least 3 assignments at or above R</li>
          <li>Have no more than 5 practicals below the M level</li>
          <li>
            Earn 4+ assessment points, with points in at least two topic areas
          </li>
          <li>Achieve a project score at or above 1</li>
        </ul>
      </div>

      <div>
        <h3>Getting help</h3>
        <p>
          We are going to be using Piazza for our class discussions outside of
          class. Rather than emailing questions to me, <strong>please</strong>{" "}
          post the questions on Piazza. This will allow other students to answer
          questions and to benefit from the answers you receive. This system
          will only work if you use it, so please do so.
        </p>
      </div>

      <div>
        <h3>Honor code and collaboration</h3>
        <p>
          <strong>Short version</strong> Help each other, but do not share
          solutions.
        </p>
        <p>
          <strong>Long version</strong> In computer science, we build on the
          work of developers before us. Most of us learned to code by copying
          code and finding ways to tweak it to do what we want. Almost no
          computer programs are built without building on the work of others,
          either in the form of algorithms, libraries, or even just short
          snippets of code. In the computer science department, we recognize the
          value of forming study groups, helping each other debug code, and
          working together.{" "}
        </p>

        <p>
          On the other hand, there are questions of intellectual property and
          academic integrity. These are considerably murkier waters than you may
          face, for example, writing a history paper, or doing a problem set in
          math. With code, you can "accomplish" spectacular things by copying
          the right chunks of code without ever knowing how it works.
        </p>

        <p>
          For the most part, navigating these waters is on your head. I
          encourage you to help classmates to debug misbehaving code. I
          encourage you to post questions (and answers!) on Piazza. **But** you
          need to do so in a way that respects other people's work and in a way
          that contributes to your intellectual development rather than
          hindering it (or trying to mask your lack of it). This is not a race
          to get a good grade. The grade is at best a carrot to "trick" you into
          doing the work required to become better educated. As such, don't just
          go looking for code that you can turn in to satisfy an assignment. You
          can probably find some, but it won't help you much, and I'll probably
          be able to tell.
        </p>

        <p>
          <strong>Policies</strong>: Do not work collaboratively unless
          indicated by the assignment. You can help one another, and work
          together, but you cannot work jointly on the same assignment. I do not
          want to see identical assignments that differ only in the name at the
          top. If someone does show you code (as an explanation or asking for
          debugging help), do not copy it. Retain ideas, and go away and write
          your own version later. Attribute any ideas, etc, that you pick up
          (this goes for classmates, books, online resources, etc). Be explicit.
          Tell me where you got the idea, approach, technique, etc. Explain what
          your contribution was. Make sure that your contribution demonstrates
          that you understand what was not your work alone. Finally, if you have
          any doubts, ask me first.
        </p>
      </div>

      <div>
        <h3>Honor code and collaboration</h3>
        <p>
          Students who need test or classroom accommodations due to a disability
          must have a Letter of Accommodation from the{" "}
          <a href="http://www.middlebury.edu/student-life/community-living/diversity-inclusivity/american-disability-act">
            Disability Resource Center
          </a>
          . Please contact one Jodi Litchfield (litchfie@middlebury.edu or
          802.443.5936) for more information. Students with Letters of
          Accommodation are encouraged to make an appointment with me as soon as
          possible. All discussions will remain confidential.
        </p>
      </div>

      <div>
        <h3>Loaner Laptops</h3>
        <p>
          If you ever find yourself temporarily in need of a laptop, the
          Computer Science department has 10 rotating Dell laptops available to
          our students. These come pre-installed with software for most of the
          courses in the major. They are available to be loaned out short-term
          or long-term based on your need (as determined by you). Feel free to
          ask me ahead of time if you think you need one for just a class
          period, or you can send an e-mail to rlichenstein@middlebury.edu
          directly.
        </p>
        <p>
          The college also provides laptops to those who need them where “need”
          is based on Student Financial Services calculations. If you anticipate
          needing a laptop for the whole term, we encourage you to inquire with
          Student Financial Services and the library first due to our smaller
          pool of equipment. However, our department commits to meeting the
          needs of every student, so do not be afraid to reach out if you
          believe you need one of our laptops for any length of time.
        </p>
      </div>
    </Layout>
  );
}
