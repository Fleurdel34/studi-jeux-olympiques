# Backend-jeuxolympiques

This project was generated with JAVA version 21.

This project was used the framework Spring Boot with dependencies and plugins next:
-org.springframework.boot: web, jpa, devtools, jdbc, mail, security, test, spring-boot-docker-compose and tomcat.
-org.projectlombok : lombok
-com.stripe: stripe-java version 26.7.0.
-javax-mail:mail
-io.jsonwebtoken:jjwt-api, jjwt-jackson and jjwt-impl version:0.12.6
-junit: junit(for tests)

-org.springframework.boot:spring-boot-maven-plugin
-org.projectlombok:lombok

# Spring Boot version 3.3.1 and Maven version 4.0.0

Create new project with Spring Initializr https://start.spring.io/:
Select: maven Project, Java Language, Spring Boot version.
Write Project Metadata (Group, Artifact and Name)
Add dependencies
Generate
    
## Development server

Port:8080

## DataBase

MariaDb
localhost + port 3000

## Lifecycle with Maven
-clean
-validate
-compile
-test
-package
-verify
-install
-site
-deploy

It was réalized automatically with devtools

## Run and build

to click on button `Run`

## Running unit tests

Select tests files and click on button `Run`

## services (test send mail to generate activation code):
smtp4dev:
port:
- '25:25'


