import { api } from "@/services/api";
import { useForm } from "react-hook-form";

export default function FormsAddNewParticipant(idpresentation: string) {}

/*  const { register, handleSubmit } = useForm();

  async function handleAddNewParticipant(data) {
    const resp = await api
      .post(`/profile/presentation/${idpresentation}`, data)
      .catch((erro) => {
        alert(erro.response.data);
      });
    location.reload();
  }

  return (
    <form
      className="bg-white flex flex-col gap-2 items-center justify-center shadow-2xl m-4 p-6"
      onSubmit={handleSubmit(handleAddNewParticipant)}
    >
      <div className="text-black text-xl">Cadastrar novo Participante</div>
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
      <input
        className="border py-1 px-2 bg-green-400 hover:bg-green-700 text-white rounded-md"
        type="submit"
        value="Enviar"
      />
    </form> */
