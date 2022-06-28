package net.vaida.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.vaida.model.Category;
import net.vaida.model.Book;
@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
	
	boolean existsByName(String name);
	boolean existsByCategory(String category);
	List<Book> findByCategoryId(Long id);
	List<Book> findByCategory(Category category);
	Book findByName(String name);
	List<Book> deleteByCategory(String category);
	
	@Transactional
	void deleteById(long id);
	

}
