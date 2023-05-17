export interface PresentationProps {
  id: string;
  musicName: string;
  participantRa: string;
  openToVote?: boolean;
  Grade?: Array<{ value: number }>;
  _count: {
    Participants: number;
  };
  Participants?: Array<ParticipantProps>;
}

export interface ParticipantProps {
  participant: {
    ra: string;
    name: string;
  };
}

export default function Presentation(props: PresentationProps) {
  return (
    <div className="bg-white w-[330px] rounded overflow-hidden shadow-2xl m-4 p-6 hover:scale-[1.05] ease-in duration-300">
      <div className="font-bold text-xl mb-2">{props.musicName}</div>
      <div className="text-gray-700 text-base">
        Participantes: {props._count?.Participants}
      </div>
      <div className="text-gray-700 text-base">
        Votação:{" "}
        {props.openToVote ? (
          <span className="px-2 text-white bg-blue-500 ">Aberta</span>
        ) : (
          <span className="px-2 text-white bg-red-500 ">Fechada</span>
        )}
      </div>
    </div>
  );
}
