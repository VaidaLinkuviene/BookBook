package net.vaida.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.vaida.model.Category;



@Repository
public interface CategoryRepository extends JpaRepository<Category, String>{
	
	boolean existsByCategoryName(String categoryName);
	boolean existsById(Long id);
	Category findByCategoryName(String categoryName);
	Category findById(Long id);
	Category deleteById(Long id);
	

}