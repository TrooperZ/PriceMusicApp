import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Spotify from "react-spotify-embed";
import { motion } from "framer-motion";
import VerticalCarousel from "../components/VerticalCarousel";
import data from "./data.json";
import { createClient } from "next-sanity";
import React, { createRef, useState } from 'react'
import natural from 'natural';

const natural = require('natural');

// Load a sentiment analyzer
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

// Define a mapping from the sentiment score to emotions
const scoreToEmotion = {
  '-5': 'Angry',
  '-4': 'Angry',
  '-3': 'Depressed',
  '-2': 'Angry',
  '-1': 'Angry',
  '0': 'Neutral',
  '1': 'Neutral',
  '2': 'Excited',
  '3': 'Excited',
  '4': 'Motivated',
  '5': 'Motivated'
};

function detectEmotion(text) {
  // Get the sentiment score for the text
  const score = analyzer.getSentiment(text);
  
  // Map the sentiment score to an emotion
  const emotion = scoreToEmotion[score.toString()] || null;
  
  return emotion;
}


const client = createClient({
  projectId: "86f1a0qf",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});

export async function getStaticProps() {
  const site = await client.fetch(`*[_type == "site"]`);

  return {
    props: {
      site
    },
    revalidate: 100,
  };
}

export default function Home({site}) {
  const item = site[0];
/*   const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot();

  const getImage = () => takeScreenShot(ref.current);
  getImage(); 
  
*/
  
  return (
    <div className="bg-gradient-to-b from-[#e2b88e] to-[#f8ede0] min-h-screen z-0 flex flex-col justify-evenly">
      
      <Head>
        <title>{item?.title}</title>
        <meta name="description" content={item?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="https://api.apiflash.com/v1/urltoimage?access_key=a3759d55fd00404bbbd00a6d5cb83d1f&wait_until=page_loaded&url=https://pricemusic.vercel.app/" />
        <link
          href="https://fonts.googleapis.com/css?family=Gothic+A1:300,600|Playfair+Display"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.cdnfonts.com/css/bodoniflf"
          rel="stylesheet"
        ></link>
      </Head>
      
      <div className="flex pb-4 flex-col items-center justify-center text-center overflow-hidden z-50 ">
        <div className="">
          
            <h1 className="text-6xl pt-3 md:text-8xl lg:pt-6 bodoni">{item?.title}</h1>
          
        </div>
        <h3 className="text-xl mt-6 mx-1 -pb-8">{item?.description}</h3> 
      </div>
      <div className="flex bg-[#ad8b6c]/0 rounded-lg mx-4 px-2 md:px-4 py-10 flex-col items-center lg:mx-28"> 
        <form>
          <input type="text" name="rant" className="w-[300px] h-[200px]"/>
        </form>
      </div>
      <div className="flex bg-[#ad8b6c]/0 rounded-lg mx-4 px-2 md:px-4 py-10 flex-col items-center lg:mx-28">
      
        <VerticalCarousel data={item.moods} leadingText={data.leadingText} />
      </div>
      
    </div>
  );
}
