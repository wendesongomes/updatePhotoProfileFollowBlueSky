import { BskyAgent } from "@atproto/api";
import { readFileSync } from "fs";
import sharp from "sharp";
import axios from "axios";

async function VerifyAndChangeImage() {
  const username = process.env.username;
  const password = process.env.password;
  const agent = new BskyAgent({
    service: "https://bsky.social",
  });

  if (username && password) {
    try {
      await agent.login({
        identifier: username,
        password: password,
      });

      let verificarQuantidadeDeFollowrs = 0;

      while (true) {
        const { data } = await agent.getProfile({ actor: username });

        if (data.followersCount === undefined) {
          console.log("Erro: Não foi possível obter o número de seguidores.");
          return;
        }

        if (verificarQuantidadeDeFollowrs !== data.followersCount) {
          const QuantosSeguidoresQueQuerChegar = 100;
          const QuantosSeguidoresTemNoMomento = data.followersCount;
          const QuantoOLoadingVaiCarregando =
            (3018 / QuantosSeguidoresQueQuerChegar) *
              QuantosSeguidoresTemNoMomento -
            3018;

          verificarQuantidadeDeFollowrs = QuantosSeguidoresTemNoMomento;

          const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
              <circle cx="500" cy="500" r="480" fill="none" stroke="#e11d48" stroke-width="40" stroke-dasharray="3018" stroke-dashoffset="${QuantoOLoadingVaiCarregando}" transform="rotate(-90 500 500)" /> 
            </svg>
          `;

          const input = (
            await axios({ url: data.avatar, responseType: "arraybuffer" })
          ).data as Buffer;

          sharp(input)
            .composite([{ input: Buffer.from(svg) }])
            .toFile("imagem_combinada.jpg", async (err) => {
              if (err) {
                console.error("Erro ao combinar a imagem e o SVG:", err);
                return;
              }
              const { data } = await agent.uploadBlob(
                readFileSync("imagem_combinada.jpg"),
                { encoding: "image/png" }
              );

              await agent.upsertProfile(async (existingProfile) => {
                const existing = existingProfile ?? {};
                existing.avatar = data.blob;
                return existing;
              });
            });
        }

        await new Promise((resolve) => setTimeout(resolve, 15000));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

VerifyAndChangeImage();
