import { GetServerSidePropsContext } from "next";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Presentation, { PresentationProps } from "@/components/Presentation";
import { parseCookies } from "nookies";

interface HomeProps {
  data: {
    myPresentations: Array<PresentationProps>;
    participantAt: Array<PresentationProps>;
  };
  idprofile: string;
}

export default function Profile(props: HomeProps) {
  const { register, handleSubmit } = useForm();

  async function handleAddNewPresentation(data: any) {
    try {
      await api.post(`/profile/${props.idprofile}/presentations`, data);
      location.reload();
    } catch {
      alert("Erro");
    }
  }

  return (
    <div className="flex flex-col items-center text-center ">
      <div>
        <form
          className="bg-white flex flex-col gap-2 items-center justify-center shadow-2xl m-4 p-6"
          onSubmit={handleSubmit(handleAddNewPresentation)}
        >
          <div className="text-black text-xl">Cadastrar nova Apresentação</div>
          <input
            className="bg-slate-200 rounded-lg border border-blue-300 py-1 px-2"
            placeholder="Nome da musica"
            type="text"
            required
            {...register("musicName")}
          />
          <input
            className="border py-1 px-2 bg-green-400 hover:bg-green-700 text-white rounded-md"
            type="submit"
            value="Enviar"
          />
        </form>
      </div>
      <div>
        <div className="text-black text-xl ">
          Suas Apresentações
          <div className="flex justify-center flex-wrap">
            {props.data.myPresentations.map((element) => (
              <Link
                key={element.id}
                href={`/profile/${props.idprofile}/presentation/${element.id}`}
              >
                <Presentation key={element.id} {...element} />
              </Link>
            ))}
          </div>
        </div>
        <div className="text-black text-xl ">
          Participando em
          <div className="flex justify-center flex-wrap">
            {props.data.participantAt.map((element) => (
              <Presentation key={element.id} {...element} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ idprofile: string }>
) {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const idprofile = context.params?.idprofile;
  const data = (await api.get(`/profile/${idprofile}/presentations`)).data;
  return {
    props: {
      data,
      idprofile,
    },
  };
}
