import React from "react";
import { Link } from "react-router-dom";
import Overview from "../components/Overview";
import Layout from "../components/Layout";

const Homepage = () => {
  return (
    <Layout>
      <main>
        <Overview />

        <Link to="/references">View Available Guides</Link>
      </main>
    </Layout>
  );
};

export default Homepage;
