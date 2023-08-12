import express from "express";
import multer from "multer";
import mediaConfig from "../../config/media";
import path from "path";
import {
  getAllMedia,
  getMediaByAuthor,
  uploadMedia,
  deleteMedia,
} from "./media.services";

const router = express.Router();

const upload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/assets/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// GET /media
router.get("/", async (req, res) => {
  const media = await getAllMedia();

  if (media.length === 0) {
    return res.status(404).send({
      message: "Media not found",
    });
  }

  res.send({
    message: "success",
    data: media,
  });
});

// GET /media/:author
router.get("/:author", async (req, res) => {
  const media = await getMediaByAuthor(req.params.author);

  if (media.length === 0) {
    return res.status(404).send({
      message: "Media not found",
    });
  }

  res.send({
    message: "success",
    data: media,
  });
});

// POST /media
router.post(
  "/",
  multer({ storage: upload }).single("media"),
  async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send({
        message: "No file uploaded",
      });
    }

    // change url to example http://localhost:5000/images/1619796160000.png
    const url = `${mediaConfig.host}/assets/images/${file.filename}`;

    const media = await uploadMedia({
      author: req.body.author,
      type: file.mimetype,
      url: url,
      name: file.filename,
      size: file.size,
    });

    if (!media) {
      return res.status(400).send({
        message: "Failed to upload media",
      });
    }

    res.send({
      message: "success",
      data: media,
    });
  }
);

// DELETE /media/:id
router.delete("/:id", async (req, res) => {
  const media = await deleteMedia(String(req.params.id));

  if (!media) {
    return res.status(400).send({
      message: "Failed to delete media",
    });
  }

  res.send({
    message: "success",
    data: media,
  });
});

export default router;
