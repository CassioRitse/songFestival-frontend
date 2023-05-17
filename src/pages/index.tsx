import { api } from "../services/api";
import Link from "next/link";
import Presentation, { PresentationProps } from "@/components/Presentation";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

interface HomeProps {
  data: Array<PresentationProps>;
}

export default function Home({ data }: HomeProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="bg-white text-3xl font-lg w-full md:w-1/2 text-center rounded overflow-hidden shadow-2xl m-4 py-6 my-4">
        Votação Festival da Canção
        <span className="block font-thin text-sm mt-2">
          Todas as aprensetações
        </span>
      </h1>
      <div className="flex flex-wrap justify-center">
        {data.map((element: PresentationProps) =>
          element.openToVote ? (
            <Link href={`/poll/${element.id}`} key={element.id}>
              <Presentation key={element.id} {...element} />
            </Link>
          ) : (
            <Presentation key={element.id} {...element} />
          )
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data = (await api.get("/all/presentation")).data;
  return {
    props: {
      data,
    },
  };
}
