FROM openjdk:17-alpine

WORKDIR /app

# Paso 1: Compilar la aplicacion para obtener el jar actualizado.
FROM maven:3.8.6-amazoncorretto-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Paso 2: Crear la imagen final con el jar actualizado.
FROM openjdk:17-alpine
WORKDIR /app

COPY --from=builder /app/target/api-*.jar /app/api.jar

EXPOSE 8181

CMD ["java", "-jar", "api.jar"]