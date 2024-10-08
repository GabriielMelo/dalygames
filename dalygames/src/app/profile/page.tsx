import Container from "@/components/container";
import { Metadata } from "next";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import userImg from "../../../public/user.png";
import FavoriteCard from "./components/favorite";

export const metadata: Metadata = {
  title: "Meu Perfil - DalyGames sua plataforma de Jogos",
  description: "Perfil de user | DalyGames sua plataforma de Jogos",
};

export default function Profile() {
  return (
    <main className="w-full text-black">
      <Container>
        <section className="flex mt-8 mb-6 flex-col items-center justify-between relative gap-3 sm:flex-row">
          <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
            <Image
              className="rounded-full w-56 h-56 object-cover"
              src={userImg}
              alt="Profile image"
            />
            <h1 className="font-bold text-2x1">User</h1>
          </div>
          <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
            <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
              Configurações
            </button>
            <button className="bg-gray-700 px-4 py-3 rounded-lg">
              <FaShareAlt size={24} color="#fff" />
            </button>
          </div>
        </section>
        <section className="flex flex-wrap gap-5 flex-col md:flex-row">
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
          <div className="flex-grow flex-wrap ">
            <FavoriteCard />
          </div>
        </section>
      </Container>
    </main>
  );
}
