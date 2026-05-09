# 贡献指南

感谢你对回忆录 Web 应用的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 1. 报告问题

如果你发现了 bug 或有功能建议，请：

1. 查看 [Issues](https://github.com/yourusername/memories/issues) 确认问题是否已存在
2. 创建新的 Issue，详细描述问题或建议
3. 包含复现步骤、错误信息和截图（如果适用）

### 2. 提交代码

#### 准备工作

1. Fork 本仓库
2. 克隆你的 Fork：
   ```bash
   git clone https://github.com/yourusername/memories.git
   ```
3. 创建新分支：
   ```bash
   git checkout -b feature/your-feature
   ```

#### 开发流程

1. **安装依赖**
   ```bash
   # 后端
   cd backend
   npm install

   # 前端
   cd frontend
   npm install
   ```

2. **初始化数据库**
   ```bash
   cd backend
   npm run init-db
   ```

3. **启动开发服务器**
   ```bash
   # 后端
   cd backend
   npm run dev

   # 前端
   cd frontend
   npm run dev
   ```

4. **进行修改**
   - 遵循现有的代码风格
   - 添加必要的注释
   - 确保代码通过测试

5. **测试修改**
   ```bash
   # 运行 API 测试
   ./test-api.sh

   # 运行监控检查
   ./monitor.sh
   ```

#### 提交代码

1. 提交你的修改：
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   ```

2. 推送到你的 Fork：
   ```bash
   git push origin feature/your-feature
   ```

3. 创建 Pull Request

### 3. 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具相关

示例：
```
feat: 添加回忆导出功能
fix: 修复日期显示错误
docs: 更新 API 文档
```

## 开发规范

### 代码风格

#### JavaScript/React

- 使用 ES6+ 语法
- 使用函数式组件和 Hooks
- 使用 const/let，避免 var
- 使用箭头函数
- 使用模板字符串
- 使用解构赋值

#### CSS

- 使用 CSS 变量
- 使用 Flexbox/Grid 布局
- 遵循 BEM 命名规范（可选）

### 文件组织

```
frontend/src/
├── components/     # 可复用组件
│   ├── Layout/     # 布局组件
│   ├── Scene3D/    # 3D 场景组件
│   └── UI/         # UI 组件
├── hooks/          # 自定义 Hooks
├── pages/          # 页面组件
├── store/          # 状态管理
├── utils/          # 工具函数
└── styles/         # 样式文件

backend/src/
├── controllers/    # 控制器
├── models/         # 数据模型
├── routes/         # 路由定义
├── middleware/     # 中间件
└── utils/          # 工具函数
```

### 测试

- 为新功能添加测试
- 确保现有测试通过
- 测试覆盖率应保持在 80% 以上

### 文档

- 更新 README.md（如果需要）
- 更新 API 文档（如果需要）
- 添加代码注释（如果需要）

## 行为准则

### 我们的承诺

为了营造一个开放和友好的环境，我们承诺：

1. 使用友好和包容的语言
2. 尊重不同的观点和经验
3. 优雅地接受建设性批评
4. 关注对社区最有利的事情
5. 对其他社区成员表示同情

### 我们的标准

积极的行为包括：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同情

不可接受的行为包括：

- 使用性暗示的语言或图像
- 恶意评论或人身攻击
- 公开或私下骚扰
- 未经许可发布他人的私人信息
- 其他不道德或不专业的行为

## 许可证

通过贡献代码，你同意你的贡献将在 [MIT 许可证](LICENSE) 下许可。

## 联系方式

如果你有任何问题，可以通过以下方式联系我们：

- 创建 Issue
- 发送邮件到 your-email@example.com

感谢你的贡献！