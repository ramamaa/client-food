import { velocityPerSecond } from "framer-motion";
import { AutoMarquee } from "./AutoMarquee";

export const Footer = () => {
  return (
    <div>
      <AutoMarquee
        speed={100}
        gap={48}
        className="h-12 bg-red-500 mt-15 text-primary-foreground py-7 flex items-center">
        <span className="text-3xl font-semibold leading-9">
          Fresh fast delivered
        </span>
        <span className="text-3xl font-semibold leading-9">
          Fresh fast delivered
        </span>
        <span className="text-3xl font-semibold leading-9">
          Fresh fast delivered
        </span>
        <span className="text-3xl font-semibold leading-9">
          Fresh fast delivered
        </span>
      </AutoMarquee>
    </div>
  );
};
