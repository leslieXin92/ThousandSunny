# 第一阶段:完整的构建环境
FROM python:latest

# 第二阶段:将代码放到指定的目录
WORKDIR /dome
ADD . /dome
# 第三阶段:执行脚本
CMD ["python", "/dome/dome.py"]