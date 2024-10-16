FROM openjdk:24-slim
LABEL AUTHOR="srikantvs26@gmail.com"
WORKDIR /app
COPY . .
CMD [ "Triple H" ]
ENTRYPOINT ["java","HelloWorld.java"]
# ENTRYPOINT [ "sh","-c","java HelloWorld.java ${@}"]
