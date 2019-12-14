import React from "react";

import Guide from "../components/Guide";
import Layout from "../components/Layout";
import "./ReferenceList.css";

const guideIndex = [
  { title: "police" },
  { title: "fire" },
  { title: "station" },
  { title: "radio" },
  { title: "cad" },
  { title: "animals" }
];

const ReferenceList = () => {
  return (
    <Layout>
      <section>
        <header>
          <h2>Available Guides</h2>
        </header>
        {guideIndex.map(guide => {
          return <Guide title={guide.title} />;
        })}
      </section>
    </Layout>
  );
};
export default ReferenceList;
