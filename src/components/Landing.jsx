import React from "react";
import Card from "./card";

const Landing = ({ data }) => {
  console.log(data);

  return data.map((e) => {
    return <Card key={e.questionFrontendId} data={e} />;
  });
};

export default Landing;
