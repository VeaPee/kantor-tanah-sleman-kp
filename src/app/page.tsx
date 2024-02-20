// Import necessary modules
import Image from "next/image";
import Link from "next/link";

// Import your data
import data from "./data/data.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Your existing code for logo */}
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial">
        <Image
          src="/Logo_BPN-KemenATR_(2017).png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      {/* Map through the data array to generate links dynamically */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-center">
        {data.Menu.map((link) => (
          <a href={link.path} key={link.path} className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" rel="noopener noreferrer">
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {link.label}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
          </a>
        ))}
      </div>
    </main>
  );
}
