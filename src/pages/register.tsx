import { api } from "@/services/api";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit } = useForm();

  async function handleRegister(data: any) {
    try {
      const resp = await api.post("/register", data);
      // console.log(resp);

      if (resp.data) {
        alert("Cadastro realizado com Sucesso");
        location.href = "/login";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex flex-col items-start justify-center mx-auto h-screen p-5">
      <div className="text-1xl font-bold mb-6">
        Faça parte do,
        <span className="block text-2xl lg:text-3xl ">
          {" "}
          Festival da Canção!
        </span>
      </div>
      <div className="w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-lg font-semibold mb-5">Registre-se agora</h1>
        <div>
          <form
            className="w-full space-y-3 "
            method="post"
            onSubmit={handleSubmit(handleRegister)}
          >
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
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Seu nome
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                id="name"
                type="text"
                placeholder="João Pedro"
                {...register("name")}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Sua Senha
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                id="password"
                type="text"
                placeholder="*******"
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
        </div>
      </div>
    </div>
  );
}
