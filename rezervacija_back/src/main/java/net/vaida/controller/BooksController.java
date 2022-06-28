package net.vaida.controller;
	import java.util.List;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.HttpStatus;
	import org.springframework.web.bind.annotation.CrossOrigin;
	import org.springframework.web.bind.annotation.DeleteMapping;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PathVariable;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.PutMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.ResponseStatus;
	import org.springframework.web.bind.annotation.RestController;

	import net.vaida.exception.CategoryNotFoundException;
	import net.vaida.exception.BooksNotFoundException;
	import net.vaida.model.Category;
	import net.vaida.model.Book;
	import net.vaida.model.BookDTO;
	import net.vaida.repository.CategoryRepository;
	import net.vaida.repository.BookRepository;

	@CrossOrigin("*")
	@RestController
	@RequestMapping("/api")
	public class BooksController {

		@Autowired
		BookRepository bookRepo;

		@Autowired
		CategoryRepository categoryRepo;

		@GetMapping("/category/{categoryName}/book")
		public List<Book> getAllMealsByCategoryName(@PathVariable("categoryName") String categoryName) {
			if (!categoryRepo.existsByCategoryName(categoryName)){
			throw new CategoryNotFoundException();
		}
			Category category = categoryRepo.findByCategoryName(categoryName);
	        return bookRepo.findByCategory(category);   
		
		}

		@GetMapping("/category/{category}/book/{id}")
		public Book getBooksById(@PathVariable("id") Long id) {
			return bookRepo.findById(id).orElseThrow(() -> new BooksNotFoundException());
		}
		
		@GetMapping("/book")
		public List<Book> getAllMeals() {
			return bookRepo.findAll();
		}

		@PostMapping("/category/{categoryName}/meal")
		@ResponseStatus(HttpStatus.CREATED)
		public Book createBook(@PathVariable(value = "categoryName") String categoryName, @RequestBody Book book) {
			if(!categoryRepo.existsByCategoryName(categoryName)) {
				throw new CategoryNotFoundException();
			}
			Category cat = categoryRepo.findByCategoryName(categoryName);
			Book b = new Book();
			b.setName(book.getName());
			b.setDescription(book.getDescription());
			b.setISBN(book.getISBN());
			b.setImage(book.getImage());
			b.setPages(book.getPages());
			b.setCategory(cat);
			return bookRepo.save(b);
		}

		@PutMapping("/category/{category}/mbook/{id}")
		public Book updateMeal(@PathVariable("id") long id, @RequestBody BookDTO mealDTO) {
			Book meal = bookRepo.findById(id).orElseThrow(()-> new BooksNotFoundException());
				meal.setName(mealDTO.getName());
				meal.setDescription(mealDTO.getDescription());
				meal.setISBN(mealDTO.getISBN());
				meal.setImage(mealDTO.getImage());
				meal.setPages(mealDTO.getPages());
				return bookRepo.save(meal);
		}

		@DeleteMapping("/category/{category}/meal/{id}")
		@ResponseStatus(HttpStatus.NO_CONTENT)
		public void deleteMeal(@PathVariable("id") Long id) {
			if (!bookRepo.existsById(id)) {
				throw new BooksNotFoundException();
			}
			bookRepo.deleteById(id);
		}

//		@DeleteMapping("/category/{category}/meal")
//		@ResponseStatus(HttpStatus.NO_CONTENT)
//		public List<Meal> deletAllMealsOfCategory(@PathVariable("category") String category) {
//			if (!categoryRepo.existsByCategory(category)) {
//				throw new FoodCategoryNotFoundException();
//			}
//			return mealRepo.deleteByCategory(category);
//		}

	}