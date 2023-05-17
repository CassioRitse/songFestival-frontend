import OwnPresentation from "@/components/OwnPresentation";
import { api } from "../../services/api";
import Link from "next/link";

interface AdminProps {
  data: Array<{ ra: string; name: string }>;
}

export default function AdminParticipants({ data }: AdminProps) {
  console.log(data);
  async function handleDeleteParticipants() {
    const resp = (await api.delete(`/all/participants`)).data;
    console.log(resp);
    location.reload();
  }
  return (
    <div className="flex flex-col items-center">
      <Link href={"/admin"}>Ver Apresentações</Link>
      <h1 className="bg-white text-3xl font-lg w-full md:w-1/2 text-center rounded overflow-hidden shadow-2xl m-4 py-6 my-4">
        Festival da Canção
        <span className="block font-thin text-sm mt-2">
          Todos as Participants
        </span>
      </h1>
      <div className="flex flex-row flex-wrap  justify-center">
        {data.map((user) => (
          <div key={user.ra} className="flex justify-center">
            <div className="bg-white w-[330px] rounded overflow-hidden shadow-2xl m-4 p-6 hover:scale-[1.05] ease-in duration-300">
              <div className="font-bold text-xl mb-2">{user.name}</div>
              <div className="text-gray-700 text-base">RA: {user.ra}</div>
            </div>
          </div>
        ))}
      </div>

      <input
        className="border py-1 px-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
        type="submit"
        value="Deletar todos"
        onClick={() => handleDeleteParticipants()}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const data = (await api.get("/all/participants")).data;
  console.log(data);
  return {
    props: {
      data,
    },
  };
}
