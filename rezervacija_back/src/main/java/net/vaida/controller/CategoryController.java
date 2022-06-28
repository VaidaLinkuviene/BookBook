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

	import net.vaida.exception.CategoryExistsException;
	import net.vaida.exception.CategoryNotFoundException;
	import net.vaida.model.Category;
	import net.vaida.model.CategoryDTO;
	import net.vaida.repository.CategoryRepository;

	@CrossOrigin("*")
	@RestController
	@RequestMapping("/api")
	public class CategoryController {

		@Autowired
		CategoryRepository repo;

		public CategoryController(CategoryRepository repo) {
			super();
			this.repo = repo;
		}

		@GetMapping("/category")
		public List<Category> getAllCategories() {
			return repo.findAll();
		}

		@GetMapping("/category/{category}")
		public Category getFoodCategoryByCategoryName(@PathVariable("category") String categoryName) {
			if (!repo.existsByCategoryName(categoryName)) {
				throw new CategoryNotFoundException();
			} 
			Category category = repo.findByCategoryName(categoryName);
				return category;
			}
		

//		@GetMapping("/category/{id}")
//		public FoodCategory getFoodCategoryById(@PathVariable("id") Long id) {
//			if(!repo.existsById(id)) {
//				throw new FoodCategoryNotFoundException();
//			}else {
//			return repo.findById(id);	
//			}
//		}


		@PostMapping("/category")
		@ResponseStatus(HttpStatus.CREATED)
		public Category createCategory(@RequestBody CategoryDTO categoryDTO) {
			Category category = new Category();
//			category.setId(categoryDTO.getId());
			category.setCategoryName(categoryDTO.getCategoryName());
			if (repo.existsByCategoryName(category.getCategoryName())) {
				throw new CategoryExistsException();
			}
			return repo.save(category);
		}

		@PutMapping("/category/{category}")
		public Category updateFoodCategory(@PathVariable("category") String categoryName,
				@RequestBody CategoryDTO categoryDTO) {
			Category cat = repo.findByCategoryName(categoryName);
			if (!repo.existsByCategoryName(categoryName)) {
				throw new CategoryNotFoundException();
			}
			cat.setCategoryName(categoryDTO.getCategoryName());
			return repo.save(cat);
		}

		@DeleteMapping("/category/{category}")
		@ResponseStatus(HttpStatus.NO_CONTENT)
		public void deleteFoodCategoryByCategoryName(@PathVariable("category") String categoryName) {
			Category cat = repo.findByCategoryName(categoryName);
			if (!repo.existsByCategoryName(categoryName)) {
				throw new CategoryNotFoundException();
			}
			repo.delete(cat);

		}

	}