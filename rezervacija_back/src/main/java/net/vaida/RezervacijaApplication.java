package net.vaida;


import java.util.Collections;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.vaida.model.ERole;
import net.vaida.model.Role;
import net.vaida.model.User;

import net.vaida.repository.RoleRepository;
import net.vaida.repository.UserRepository;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@EnableSwagger2
public class RezervacijaApplication implements CommandLineRunner 
{

	public static void main(String[] args) {
		SpringApplication.run(RezervacijaApplication.class, args);
	}

	
	@Bean
    public CommandLineRunner initialData(RoleRepository roleRepo, UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
       
            if(roleRepo.findByName(ERole.ROLE_USER).isEmpty()){
                roleRepo.save(new Role(ERole.ROLE_USER));
            }
            if(roleRepo.findByName(ERole.ROLE_ADMIN).isEmpty()){
                roleRepo.save(new Role(ERole.ROLE_ADMIN));
            }
            if(!userRepo.existsByEmail("admin@aa.aa")&&!userRepo.existsByUsername("admin")) {
                User user = new User();
                user.setEmail("admin@mail.lt");
                user.setPassword(encoder.encode("password"));
                user.setUsername("admin");
                user.setRoles(Set.of(roleRepo.findByName(ERole.ROLE_ADMIN).get()));
                userRepo.save(user);
            }
            if(!userRepo.existsByEmail("user@aa.aa")&&!userRepo.existsByUsername("user")) {
                User user = new User();
                user.setEmail("user@mail.lt");
                user.setPassword(encoder.encode("vartotojas"));
                user.setUsername("user");
                user.setRoles(Set.of(roleRepo.findByName(ERole.ROLE_USER).get()));
                userRepo.save(user);
            }
        };
        
	}
        
        @Bean
        public Docket swaggerConfiguration() {
            return new Docket(DocumentationType.SWAGGER_2)
            		.select()
                    .apis(RequestHandlerSelectors
                            .basePackage(""))
                    .build()
                    .apiInfo(apiDetails());
        }
        
        private ApiInfo apiDetails() {
    		return new ApiInfo(
    				"Books",
    				"Sample API for BookReservation",
    				"1.0",
    				"Free to use",
    				new springfox.documentation.service.Contact("Reservation creators", "http://budgetPlanner.com", "a@b.com"),
    				"API License",
    				"http://booksbooksbooks.com",
    				Collections.emptyList());
    	}
//	
//
//	@Bean
//    public CommandLineRunner initialData(FoodCategoryRepository categoryRepository, MealRepository mealRepository) {
//        return args -> {
//	
//	FoodCategory c1 = new FoodCategory();
//	c1.setCategoryName("main");
//
//	FoodCategory c2 = new FoodCategory();
//	c2.setCategoryName("salad");
//
//	categoryRepository.save(c1);
//	categoryRepository.save(c2);
//     
//        
//       Meal m1 = new Meal();
//       m1.setAmount(1);
//   	m1.setDescription("");
//   	m1.setName("Aaaaa");
//   	m1.setPrice(4);
//   	m1.setCategory(c2);
//   	
//   	
//   	Meal m2 = new Meal();
//    m2.setAmount(1);
//	m2.setDescription("");
//	m2.setName("Aaaaa");
//	m2.setPrice(4);
//	m2.setCategory(c1);
//	
//	mealRepository.save(m1);
//	mealRepository.save(m2);
//	
//        };
//        
//	}


	@Override
	public void run(String... args) {
		// TODO Auto-generated method stub
		
	}




}

