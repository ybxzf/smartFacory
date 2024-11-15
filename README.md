```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 统一命名规范
- 文件名首字母大写，采用大驼峰式命名
- 文件夹首字母小写，采用小驼峰式命名
- 文件中如果存在`index.vue`，不做任何修改,就采用`index.vue`的命名方式
- 公共工具方法抽取到`utils`文件夹下的`tools.js`文件中