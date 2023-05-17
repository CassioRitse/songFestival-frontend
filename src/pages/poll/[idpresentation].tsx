import Presentation, { PresentationProps } from "@/components/Presentation";
import { api } from "@/services/api";
import { GetServerSidePropsContext } from "next";
import { useForm } from "react-hook-form";

export default function VotePresentation({
  data,
}: {
  data: PresentationProps;
}) {
  const { register, handleSubmit } = useForm();

  async function handleVotePresentation(dataForm: any) {
    const resp = (await api.post(`/grade/${data.id}`, dataForm)).data;
    location.href = resp;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="bg-white text-3xl font-lg w-full md:w-1/2 text-center rounded overflow-hidden shadow-2xl m-4 py-6 my-4">
        Festival da Canção
        <span className="block font-thin text-sm mt-2">
          Apresentação: {data.musicName}
        </span>
      </h1>
      <div className="flex flex-wrap justify-center">
        <Presentation {...data} />
      </div>
      <div>
        <form
          className="bg-white flex flex-col gap-2 items-center justify-center shadow-2xl m-4 p-6"
          onSubmit={handleSubmit(handleVotePresentation)}
        >
          <label htmlFor="grade">Nota para apresentação</label>
          <input
            className="w-full bg-slate-200 rounded-lg border border-blue-300 py-1 px-2"
            placeholder="(0 - 10)"
            type="number"
            id="grade"
            required
            max={10}
            min={0}
            {...register("value")}
          />

          <input
            className="border py-1 px-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
            type="submit"
            value="Enviar nota"
          />
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{
    idpresentation: string;
  }>
) {
  const idpresentation = context.params?.idpresentation;

  const data = (await api.get(`/profile/presentation/${idpresentation}`)).data;
  return {
    props: {
      data,
    },
  };
}
