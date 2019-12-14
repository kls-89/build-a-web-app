import React from "react";

const Overview = () => {
  return (
    <>
      <section>
        <header>
          <h2>Introduction</h2>
        </header>
        <article>
          <p>
            Being successful in a Public Safety Communications Center means
            knowing how to quickly and accurately access a wide array of
            information and resources.
          </p>
          <p>
            Dispatchers are not expected to know everything; however, they
            should be masters at knowing how to locate every piece of
            information they may need for their jobs.
          </p>
          <p>
            The purpose of this Dispatch Resource is to provide a guide for some
            of the most important aspects of the job. By consolidating this
            information into a single document, I hope to help others succeed at
            their jobs, and in doing so, provide a better quality of service to
            their coworkers and their community as a whole.
          </p>
        </article>
      </section>
      <section>
        <header>
          <h2>Specifics of this Guide</h2>
        </header>
        <article>
          <p>
            It should be known that this particular guide was written based on
            how our specific agency operates and is for informational
            purposes-only. It should <strong>not</strong> be blindly applied to
            any other agency, which likely has different protocols and
            organization.
          </p>
          <p>
            If you would like me to create a similar web reference for a
            specific agency, please feel free to{" "}
            <a
              href="https://www.github.com/kls-89"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact me
            </a>
            .
          </p>
        </article>
      </section>
    </>
  );
};

export default Overview;
