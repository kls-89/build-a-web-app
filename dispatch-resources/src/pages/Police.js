import React from "react";
import Guide from "../components/Guide";
import Layout from "../components/Layout";
const Police = props => {
  return (
    <Layout>
      <Guide>
        <h1>{props.title} Reference</h1>
        <p>
          This is a fire reference. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Laboriosam accusantium odit cum, doloribus beatae
          facere at tempore doloremque repellendus numquam quisquam labore,
          optio amet dicta fuga ab tenetur nesciunt officiis!
        </p>
      </Guide>
    </Layout>
  );
};

export default Police;
