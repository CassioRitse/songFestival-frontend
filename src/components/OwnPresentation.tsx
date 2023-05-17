import { api } from "@/services/api";
import { PresentationProps, ParticipantProps } from "./MyPresentation";

export default function OwnPresentation(props: PresentationProps) {
  async function handleDelete() {
    await api.delete(`/profile/presentation/${props.id}`).then((response) => {
      console.log(response);
      window.history.back();
    });
  }

  return (
    <div className="bg-white w-[330px] rounded overflow-hidden shadow-2xl m-4 p-6">
      <div className="font-bold text-xl mb-2">{props.musicName}</div>
      <div className="text-gray-700 text-base">
        {props.Participants?.map(({ participant }: ParticipantProps) => (
          <p key={participant.ra}>{"- " + participant.name}</p>
        ))}
      </div>
      <div className="flex justify-around mt-8">
        <button
          onClick={() => handleDelete()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 border border-red-700 rounded"
        >
          Excluir Apresentção
        </button>
      </div>
    </div>
  );
}
