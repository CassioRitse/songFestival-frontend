import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { singIn } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    await singIn(data);
  }

  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex flex-col items-start justify-center mx-auto h-screen p-5">
      <div className="text-1xl font-bold mb-6">
        Olá, Bem vindo ao
        <span className="block text-2xl lg:text-3xl ">
          {" "}
          Festival da Canção!
        </span>
      </div>
      <div className="w-full bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-lg font-semibold">Entre agora mesmo</h1>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div>
            <label
              htmlFor="ra"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Seu RA
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              id="ra"
              type="text"
              placeholder="a1234567"
              {...register("ra")}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Sua senha
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="password"
              id="password"
              placeholder="********"
              {...register("password")}
            />
          </div>
          <div>
            <input
              className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
              type="submit"
              value="Enviar"
            />
          </div>
        </form>
        <div className="text-center">
          <Link
            className="text-sm font-thin text-slate-600  hover:text-slate-900 hover:underline"
            href={"/register"}
          >
            Realizar Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}
