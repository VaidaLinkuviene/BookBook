package net.vaida.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CategoryNotFoundExceptionHandler {
	@ExceptionHandler(value=CategoryNotFoundException.class)
	public ResponseEntity<Object> exception(CategoryNotFoundException exception){
		return new ResponseEntity<>("Food category not found", HttpStatus.NOT_FOUND);
	}

}
