import { GetServerSidePropsContext } from "next";
import { api } from "../../../../services/api";
import { useForm } from "react-hook-form";
import OwnPresentation from "@/components/OwnPresentation";
import { PresentationProps } from "@/components/Presentation";

interface MyApresentationProps {
  data: PresentationProps;
  idprofile: string;
}

export default function MyPresentation(props: MyApresentationProps) {
  const { register, handleSubmit, setValue } = useForm();

  async function handleAddNewParticipant(data: any) {
    if (!data.remove) {
      const resp = await api
        .post(`/profile/presentation/${props.data.id}`, data)
        .catch((erro) => {
          alert(erro.response.data);
        });
      location.reload();
    } else {
      const resp = await api
        .put(`/profile/presentation/${props.data.id}`, data)
        .catch((erro) => {
          alert(erro.response.data);
        });
      location.reload();
    }
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold">Apresentação</h1>
      <div className="text-center flex justify-center flex-wrap mt-4 ">
        <div>
          <OwnPresentation key={props.data.id} {...props.data} />
          <form
            className="bg-white flex flex-col gap-2 items-center justify-center shadow-2xl m-4 p-6"
            onSubmit={handleSubmit(handleAddNewParticipant)}
          >
            <div className="text-black text-xl">Partipantes</div>
            <input
              className="bg-slate-200 rounded-lg border border-blue-300 py-1 px-2"
              placeholder="Nome do participante"
              type="text"
              required
              {...register("name")}
            />
            <input
              className="bg-slate-200 rounded-lg border border-blue-300 py-1 px-2"
              placeholder="ra do participante"
              type="text"
              required
              {...register("ra")}
            />
            <div>
              <input
                className="border py-1 px-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
                type="submit"
                value="remover"
                onClick={() => setValue("remove", true)}
              />

              <input
                className="border py-1 px-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
                type="submit"
                value="Adicionar"
                onClick={() => setValue("remove", false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{
    idprofile: string;
    idpresentation: string;
  }>
) {
  const idprofile = context.params?.idprofile;
  const idpresentation = context.params?.idpresentation;

  const data = (await api.get(`/profile/presentation/${idpresentation}`)).data;
  return {
    props: {
      data,
      idprofile,
    },
  };
}
