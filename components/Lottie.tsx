"use client";
import { Player } from "@lottiefiles/react-lottie-player";

type LottieProps = {
  src: string;
};

const Lottie = ({ src }: LottieProps) => {
  return <Player autoplay loop src={src} />;
};

export default Lottie;
