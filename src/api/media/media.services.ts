import { db } from "../../utils/db";
import { Media } from "@prisma/client";

const getAllMedia = async () => {
  const media = await db.media.findMany();
  return media;
};

const getMediaByAuthor = async (author: string) => {
  const media = await db.media.findMany({
    where: {
      author,
    },
  });
  return media;
};

const uploadMedia = async (media: any) => {
  const newMedia = await db.media.create({
    data: {
      author: media.author,
      type: media.type,
      url: media.url,
      name: media.name,
      size: media.size,
    },
  });
  return newMedia;
};

const deleteMedia = async (id: string) => {
  const media = await db.media.delete({
    where: {
      id,
    },
  });
  return media;
};

export { getAllMedia, getMediaByAuthor, uploadMedia, deleteMedia };
