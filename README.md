## 依赖下载

```bash
	npm install
	or
	yarn install
	or
	pnpm install
```

## 启动

启动后端程序：

```bash
node index.js
```

## 使用 PM2 启动（启动二选一即可）

```bash
npm install -g pm2
pm2 start index.js --watch
```

## 目录结构

```bash
├── index.js # 后端主程序
├── public/ # 静态资源
├── uploads/ # 文件上传目录（自动创建）
└── index.html # 前端页面
```

## PM2 常用命令

```bash
pm2 start index.js --watch # 监控程序变化，自动重启
pm2 start index.js --name myapp # 给程序起个名字
pm2 start index.js --watch --name myapp # 监控程序变化，自动重启，给程序起个名字

pm2 start index.js # 启动程序
pm2 stop index.js # 停止程序
pm2 stop all  # 停止所有程序
pm2 restart index.js # 重启程序
pm2 delete index.js # 删除程序
pm2 list # 查看所有程序
pm2 monit # 查看程序运行状态
pm2 logs # 查看程序日志
```
