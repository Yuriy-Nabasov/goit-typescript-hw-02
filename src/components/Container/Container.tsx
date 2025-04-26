import React from "react";
import styled from "./Container.module.css";

interface ContainerProps extends React.PropsWithChildren<{}> {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={styled.container}>{children}</div>;
};

export default Container;
