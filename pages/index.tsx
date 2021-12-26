import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <div className="font-bold text-red-900">Hello World</div>
      <Heading>Hello world</Heading>
      <div className="text-2xl">Welcome to fundy</div>
    </>
  );
};

export default Home;
