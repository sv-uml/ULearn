package ulearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"ulearn"})
public class ULearnApplication {

	public static void main(String[] args) {
		SpringApplication.run(ULearnApplication.class, args);
	}
}
