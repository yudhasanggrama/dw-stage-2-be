import multer from "multer";
import path from "path"
import { Request } from "express";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req:Request, file:Express.Multer.File, cb:multer.FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null,true)
  } else {
    cb(new Error("Type File not valid, Must be jpg or png"))
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2048 * 2048 } // Batas ukuran 1MB (1024 * 1024 bytes)
});

export default upload