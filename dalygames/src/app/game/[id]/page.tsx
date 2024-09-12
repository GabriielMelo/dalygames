//página de detalhes do game

import Container from "@/components/container";
import Gamecard from "@/components/gamecard";
import { GameProps } from "@/utils/types/game";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import Label from "./components/label";

interface ParamsProps {
  params: {
    id: string;
  };
}
// Gerando metadata dinamica para cada titulo de jogo: 
export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> { // função retorna uma promise que irá servir para preencher o metadata
  try {
    const response: GameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title: "DalyGames - Descubra jogos incríveis",
        };
      });
    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (err) {
    return {
      title: "DalyGames - Descubra jogos incríveis",
    };
  }
}

async function getGameDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}
async function getGameSorted() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}
export default async function Game({
  params: { id },
}: {
  params: { id: string };
}) {
  const gameDetails: GameProps = await getGameDetails(id);
  const sortedGame: GameProps = await getGameSorted();

  if (!gameDetails) {
    redirect("/");
  }
  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 w-full relative sm:h-96">
        <Image
          className="object-cover w-full h-80 sm:h86 opacity-80"
          src={gameDetails.image_url}
          alt="detalhe do jogo"
          priority={true}
          fill={true}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width:1200px) 44vw"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{gameDetails.title}</h1>
        <p>{gameDetails.description}</p>
        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas:</h2>
        <div className="flex gap-2 flex-wrap">
          {gameDetails.platforms.map((platform) => {
            return <Label key={platform} categories={platform} />;
          })}
        </div>
        <h2 className="font-bold text-lg mt-7 mb-2">Categorias:</h2>
        <div className="flex gap-2 flex-wrap">
          {gameDetails.categories.map((categorie) => {
            return <Label key={categorie} categories={categorie} />;
          })}
        </div>
        <p className="mt-7 mb-2">
          <strong>Data de lançamento: </strong> {gameDetails.release}
        </p>
        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado</h2>
        <div className="flex">
          <div className="flex-grow">
            <Gamecard game={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}
