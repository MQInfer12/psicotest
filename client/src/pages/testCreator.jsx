import React from "react";
import { useParams } from "react-router-dom";

const TestCreator = () => {
  const { testId } = useParams();
  
  return (
    <>{testId}</>
  )
}

export default TestCreator;