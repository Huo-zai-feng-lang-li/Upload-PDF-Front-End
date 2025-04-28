const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

// 跨域配置
app.use(cors());

// 静态文件服务
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Multer 配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${decodeURIComponent(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 限制10MB
  },
});

// 路由
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "未接收到文件" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      message: "文件上传成功",
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("上传处理错误:", error);
    res.status(500).json({ error: "文件处理失败" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 统一错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: `文件上传错误: ${err.message}`,
    });
  }

  res.status(500).json({
    error: "服务器内部错误",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log(`上传目录: ${path.resolve(__dirname, "uploads")}`);
});
