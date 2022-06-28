package net.vaida.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CategoryExistsExceptionHandler {
	@ExceptionHandler(value=CategoryExistsException.class)
	public ResponseEntity<Object> existsException(CategoryExistsException exception){
		return new ResponseEntity<>("Food category already exists", HttpStatus.BAD_REQUEST);
	}

}
