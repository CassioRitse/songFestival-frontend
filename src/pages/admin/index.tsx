import OwnPresentation from "@/components/OwnPresentation";
import { api } from "../../services/api";
import Presentation, { PresentationProps } from "@/components/Presentation";
import Link from "next/link";
import { useState } from "react";

interface AdminProps {
  data: Array<PresentationProps>;
}

export default function Admin({ data }: AdminProps) {
  const [btn, setBtn] = useState();

  async function handleOpenVote() {
    const resp = await api.put("/all/presentation");
    alert(data[0].openToVote ? "Fechado a votação" : "Aberto a votação");
    location.reload();
  }

  return (
    <div className="flex flex-col items-center">
      <Link href={"/admin/participants"}>Ver candidatos</Link>
      <h1 className="bg-white text-3xl font-lg w-full md:w-1/2 text-center rounded overflow-hidden shadow-2xl m-4 py-6 my-4">
        Festival da Canção
        <span className="block font-thin text-sm mt-2">
          Todas as aprensetações
        </span>
      </h1>
      <input
        className="border py-1 px-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
        type="submit"
        value={data[0].openToVote ? "Fechar votação" : "Abrir votação"}
        onClick={() => {
          handleOpenVote();
        }}
      />
      <div className="flex flex-wrap justify-center">
        {data.map((element: PresentationProps) => (
          <div key={element.id}>
            <OwnPresentation key={element.id} {...element} />
            <span>
              Nota:
              {element.Grade?.length > 0
                ? element.Grade.reduce((acc, num) => acc + num.value, 0) /
                  element.Grade.length
                : 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = (await api.get("/all/presentation")).data;
  return {
    props: {
      data,
    },
  };
}
